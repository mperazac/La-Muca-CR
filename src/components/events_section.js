import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.shape({
    events: PropTypes.array.isRequired
  }).isRequired,
  meta: PropTypes.shape({
    isFetchingEvents: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired,
  paging: PropTypes.object.isRequired,
  fetchEvents: PropTypes.func.isRequired,
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
      this.props.fetchEvents(this.props.access_token);
    }
  }
  componentDidUpdate() {
    if (this.props.isConnected && this.props.access_token
    && !this.state.hasFetched) {
      this.props.fetchEvents(this.props.access_token);
      this.setState({ hasFetched: true });
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
  	return (
      events.map((event, index) => (
				<div key={index}>{event.name}</div>
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
