import React, { Component } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { mtbFacebookPages } from '../shared/events_facebook_pages';
import { showSpanishDate } from '../shared/variables';

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
  renderEvents() {
    const {
      data: { events }
    } = this.props;
    const sortedEvents = R.sortBy(R.prop('start_time'))(events);
  	return (
      sortedEvents.map((event, index) => (
				<div key={index}>
          {event.name} - {showSpanishDate(event.start_time)}
          <img src={event.profilePicture} alt=""/>
				</div>
      ))
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
              <button className="btn-success" onClick={this.onPagination}>
                Cargar más
              </button>
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
