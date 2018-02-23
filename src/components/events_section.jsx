/* global window */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import moment from 'moment';
import InfiniteScroller from 'react-infinite-scroller';
import ReactLoading from 'react-loading';
import ImageZoom from 'react-medium-image-zoom';
import { mtbFacebookPages } from '../data/mtb_pages';
import { mtbFacebookEvents } from '../data/mtb_events';
import { mtbExcludeFacebookEvents } from '../data/mtb_exclusions';
import {
  getEventTime,
  getMonth, getDay, getWeekDay,
} from '../helpers/date_helpers';
import Description from './description';
import SearchFilter from './search_filters';
import './events_section.css';
import ShareThis from './../shared/shareThis';

const propTypes = {
  data: PropTypes.shape({
    events: PropTypes.array.isRequired,
  }).isRequired,
  meta: PropTypes.shape({
    isFetchingEvents: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  fetchAllBatchEvents: PropTypes.func.isRequired,
  accessToken: PropTypes.string,
  isConnected: PropTypes.bool,
};

const defaultProps = {
  accessToken: null,
  isConnected: false,
};

const pageSize = 10;

class EventsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFetched: false,
      searchWord: null,
      searchDate: undefined,
      hasMoreEvents: true,
      eventsToShow: [],
    };
    this.loadMoreEvents = this.loadMoreEvents.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onCleanSearch = this.onCleanSearch.bind(this);
    this.scroll = { pageLoaded: 0 };
  }
  componentDidMount() {
    if (this.props.isConnected && this.props.accessToken) {
      this.props.fetchAllBatchEvents(
        this.props.accessToken,
        mtbFacebookPages,
        mtbFacebookEvents,
        mtbExcludeFacebookEvents,
      );
    }
  }
  componentDidUpdate() {
    if (this.props.isConnected && this.props.accessToken
    && !this.state.hasFetched) {
      this.setState({ hasFetched: true });
      this.props.fetchAllBatchEvents(
        this.props.accessToken,
        mtbFacebookPages,
        mtbFacebookEvents,
        mtbExcludeFacebookEvents,
      );
    }
    window.__sharethis__.initialize();
  }
  onSearch(searchWord, searchDate) {
    this.setState({
      searchWord,
      searchDate,
      hasMoreEvents: true,
    });
    this.scroll.pageLoaded = 0;
    this.loadMoreEvents(0);
  }
  onCleanSearch() {
    this.setState({
      searchWord: null,
      searchDate: undefined,
      hasMoreEvents: true,
    });
    this.scroll.pageLoaded = 0;
    this.loadMoreEvents(0);
  }
  getFilteredEvents() {
    const { searchWord, searchDate } = this.state;
    const { data: { events } } = this.props;
    const isSimilarWord = word => (
      word ? R.contains(R.toLower(searchWord), R.toLower(word)) : false
    );
    const isSameDay = startTime => (
      moment(startTime).isSame(searchDate, 'day')
    );
    const containsWord = event => (
      isSimilarWord(event.name) ||
      isSimilarWord(R.path(['owner', 'name'], event)) ||
      isSimilarWord(R.prop('description', event)) || isSimilarWord(R.path(['place', 'name'], event)) ||
      isSimilarWord(R.path(['place', 'location', 'city'], event)) ||
      isSimilarWord(R.path(['place', 'location', 'country'], event)) ||
      isSimilarWord(R.path(['place', 'location', 'street'], event))
    );
    if (searchWord && !searchDate) {
      return R.filter(event => (
        containsWord(event)
      ), events);
    }
    if (!searchWord && searchDate) {
      return R.filter(event => (
        isSameDay(event.start_time)
      ), events);
    }
    if (searchWord && searchDate) {
      return R.filter(event => (
        containsWord(event) && isSameDay(event.start_time)
      ), events);
    }
    return events;
  }
  loadMoreEvents(page) {
    const events = this.getFilteredEvents();
    const eventsToShow = R.slice(0, page * pageSize, events);
    this.setState({
      eventsToShow,
      hasMoreEvents: eventsToShow.length >= page * pageSize,
    });
  }
  renderPlace(place) {
    if (!place) return null;
    const { name, location = { city: '', country: '' } } = place;
    const address = R.uniq([name, location.city, location.country]);
    return (
      <div>
        <span><i className="fa fa-map-marker" aria-hidden="true" /> {R.join(',', address)}</span>
      </div>
    );
  }
  renderEvents() {
    const { eventsToShow } = this.state;
    return (
      <div>
        { eventsToShow.map((event) => {
          const facebookEventLink = `https://www.facebook.com/events/${event.id}`;
          const facebookOwnerLink = `https://www.facebook.com/${event.owner.id}`;
          return (
            <div key={event.id} className="event-container event-list">
              <div className="row">
                <div className="col-md-5 col-sm-6">
                  <figure className="event-cover-img">
                    <ImageZoom
                      image={{
                        src: event.cover.source,
                        alt: `event conver image ${event.name}`,
                      }}
                      zoomImage={{
                        src: event.cover.source,
                        alt: `event conver image ${event.name}`,
                      }}
                    />
                  </figure>
                </div>
                <div className="col-md-7 col-sm-6 event-info">
                  <div className="box">
                    <div className="top">
                      <div className="date">
                        <span className="month bg-month">{getMonth(event.start_time)}</span>
                        <div className="day bg-date">
                          <span>{getDay(event.start_time)}</span>
                          <span className="weekday">{getWeekDay(event.start_time)}</span>
                        </div>
                      </div>
                      <div className="right">
                        <h3>
                          <a href={facebookEventLink} className="event-name" target="_blank">
                            {event.name}
                          </a>
                        </h3>
                        <span>
                          <i className="fa fa-clock-o" aria-hidden="true" />
                          &nbsp;{getEventTime(event.start_time)} - {getEventTime(event.end_time)}
                        </span>
                        { this.renderPlace(event.place) }
                        <div>
                          <span>
                            Organizado por:&nbsp;
                            <a href={facebookOwnerLink} target="_blank">
                              {event.owner.name}
                            </a>
                          </span>
                        </div>
                        <ShareThis url={facebookEventLink} title={event.name} />
                      </div>
                    </div>
                    <div className="content-wrap">
                      <Description text={event.description} link={facebookEventLink} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  renderSearchFilters() {
    return (
      <SearchFilter onSearch={this.onSearch} onClean={this.onCleanSearch} />
    );
  }
  renderEventsSection() {
    const {
      data: { events },
    } = this.props;
    return (
      <div>
        { events.length > 0 &&
          <div>
            {this.renderSearchFilters()}
            <InfiniteScroller
              pageStart={0}
              loadMore={this.loadMoreEvents}
              hasMore={this.state.hasMoreEvents}
              loader={<ReactLoading type="spin" color="#444" className="loading" key={0} />}
              ref={(scroll) => { this.scroll = scroll; }}
            >
              {this.renderEvents()}
            </InfiniteScroller>
          </div>
        }
        { (events.length === 0 && this.state.hasFetched) &&
          <div>No se encontraron eventos próximos</div>
        }
      </div>
    );
  }
  render() {
    const {
      data: { events },
      meta: { isFetchingEvents },
    } = this.props;
    return (
      <div>
        { isFetchingEvents
          ? <ReactLoading type="spin" color="#444" className="loading" />
          : this.renderEventsSection(events)
        }
      </div>
    );
  }
}

EventsSection.propTypes = propTypes;
EventsSection.defaultProps = defaultProps;
export default EventsSection;
