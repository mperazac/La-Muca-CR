import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import ReactLoading from 'react-loading';
import { mtbFacebookPages } from '../data/events_facebook_pages';
import { mtbFacebookEvents } from '../data/events_facebook_events';
import { getEventTime,
  getMonth, getDay, getWeekDay
} from '../shared/variables';
import Description from './description';
import './events_section.css';
import ShowMore from './../shared/pagination_show_more/pagination_show_more';

const propTypes = {
  data: PropTypes.shape({
    events: PropTypes.array.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    isFetchingEvents: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  paging: PropTypes.object.isRequired,
  fetchAllBatchEvents: PropTypes.func.isRequired,
  access_token: PropTypes.string,
  isConnected: PropTypes.bool
};

const defaultProps = {
  access_token: '-1',
  isConnected: false
};

const pageSize = 10;

class EventsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      hasFetched: false
    };
    this.onPagination = this.onPagination.bind(this);
    this.onShowMore = this.onShowMore.bind(this);
  }
  componentDidMount() {
    if (this.props.isConnected && this.props.access_token) {
      this.props.fetchAllBatchEvents(this.props.access_token, mtbFacebookPages, mtbFacebookEvents);
    }
  }
  componentDidUpdate() {
    if (this.props.isConnected && this.props.access_token
    && !this.state.hasFetched) {
      this.setState({ hasFetched: true });
      this.props.fetchAllBatchEvents(this.props.access_token, mtbFacebookPages, mtbFacebookEvents);
    }
  }
  onShowMore(sizeOfNextPage) {
    this.setState({
      currentPage: this.state.currentPage + (sizeOfNextPage / pageSize)
    });
  }
  onPagination() {
    const {
      fetchEvents,
      access_token,
      paging: { cursors: { after } }
    } = this.props;
    fetchEvents(access_token, after);
  }
  showPlace(place) {
    if (!place) return;
    const { name, location = { city: '', country: ''} } = place;
    const address = R.uniq([name, location.city, location.country]);
    return (
      <div>
        <span><i className="fa fa-map-marker" aria-hidden="true"></i> {R.join(',', address)}</span>
      </div>
      );
  }
  renderEvents() {
    const {
      data: { events }
    } = this.props;
    const { currentPage } = this.state;
    const eventsShown = R.slice(0, currentPage * pageSize, events);
  	return (
      eventsShown.map((event, index) => {
        const facebookEventLink = `https://www.facebook.com/events/${event.id}`;
        const facebookOwnerLink = `https://www.facebook.com/${event.owner.id}`;
        const whatsAppLink = `https://web.whatsapp.com/send?text=${facebookEventLink}`;
        return (
          <div key={index} className="event-container event-list">
            <div className="row">
              <div className="col-md-5 col-sm-6">
                <figure className="event-cover-img">
                  <a href={facebookEventLink}>
                    <img src={event.cover.source} alt="Event-cover"/>
                  </a>
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
                      <h3><a href={facebookEventLink} className="event-name">{event.name}</a></h3>
                      <span><i className="fa fa-clock-o" aria-hidden="true"></i> {getEventTime(event.start_time)} - {getEventTime(event.end_time)}</span>
                      { this.showPlace(event.place) }
                      <div><span>Organizado por: <a href={facebookOwnerLink}>{event.owner.name}</a></span></div>
                    </div>
                  </div>
                  <div className="content-wrap">
                    <Description text={event.description} link={facebookEventLink}/>
                  </div>
                  <a href={whatsAppLink} data-action="share/whatsapp/share" target="_blank">
                    Compartir via Whatsapp web
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })
		);
	}
	renderShowMore() {
    const {
      data: { events }
    } = this.props;
    const { currentPage } = this.state;
    const eventsShown = R.slice(0, currentPage * pageSize, events);
    return (
      <ShowMore
        currentlyShown={eventsShown.length}
        pageSize={pageSize}
        total={events.length}
        onShowMore={this.onShowMore}
      />
    );
  }
  renderEventsSection() {
    const {
      data: { events }
    } = this.props;
    return (
    	<div>
        { events.length > 0 &&
          <div>
            {this.renderEvents()}
            {this.renderShowMore()}
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
			meta: { isFetchingEvents }
  	} = this.props;
		return (
			<div>
				{ isFetchingEvents
						? <ReactLoading type="spin" color="#444" className="loading"/>
						: this.renderEventsSection(events)
				}
			</div>
		);
	}
}

EventsSection.propTypes = propTypes;
EventsSection.defaultProps = defaultProps;
export default EventsSection;
