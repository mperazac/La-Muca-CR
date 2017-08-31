import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { mtbFacebookPages } from '../shared/events_facebook_pages';
import { getSpanishDate, getEventTime } from '../shared/variables';
import Description from './description';
import './events_section.css';

const propTypes = {
  data: PropTypes.shape({
    events: PropTypes.array.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    isFetchingEvents: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  paging: PropTypes.object.isRequired,
  fetchBatchEvents: PropTypes.func.isRequired,
  access_token: PropTypes.string,
  isConnected: PropTypes.bool
};

const defaultProps = {
  access_token: '-1',
  isConnected: false
};

class EventsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasFetched: false
    };
    this.onPagination = this.onPagination.bind(this);
  }
  componentDidMount() {
    if (this.props.isConnected && this.props.access_token) {
      this.props.fetchBatchEvents(this.props.access_token);
    }
  }
  componentDidUpdate() {
    if (this.props.isConnected && this.props.access_token
    && !this.state.hasFetched) {
      this.setState({ hasFetched: true });
      this.props.fetchBatchEvents(this.props.access_token, mtbFacebookPages);
    }
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
        <p><i className="fa fa-map-marker" aria-hidden="true"></i> {R.join(',', address)}</p>
      );
  }
  renderEvents() {
    const {
      data: { events }
    } = this.props;
    const sortedEvents = R.sortBy(R.prop('start_time'))(events);
  	return (
      sortedEvents.map((event, index) => {
        const facebookEventLink = `https://www.facebook.com/events/${event.id}`;
        return (
          <div className="event-container">
            <div key={index} className="row">
              <div className="col-md-6 col-sm-6">
                <figure className="event-cover-img">
                  <a href={facebookEventLink}>
                    <img src={event.profilePicture} alt="Event-cover"/>
                  </a>
                </figure>
              </div>
              <div className="col-md-6 col-sm-6 event-info">
                <h3><a href={facebookEventLink}>{event.name}</a></h3>
                <p><i className="fa fa-calendar" aria-hidden="true"></i> {getSpanishDate(event.start_time)}</p>
                <p><i className="fa fa-clock-o" aria-hidden="true"></i> {getEventTime(event.start_time)} - {getEventTime(event.end_time)}</p>
                { this.showPlace(event.place) }
                <Description text={event.description} link={facebookEventLink}/>
              </div>
            </div>
          </div>
        );
      })
		);
	}
  renderEventsSection() {
    const {
      data: { events }
    } = this.props;
    return (
    	<div>
        { events.length > 0
          ? <div>
              {this.renderEvents()}
            </div>
          : <div>No hay events</div>
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
						? <div>Cargando</div>
						: this.renderEventsSection(events)
				}
			</div>
		);
	}
}

EventsSection.propTypes = propTypes;
EventsSection.defaultProps = defaultProps;
export default EventsSection;
