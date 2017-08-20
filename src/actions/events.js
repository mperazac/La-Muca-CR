import * as FacebookActionTypes from '../actiontypes/events';
import * as eventsApi from '../api/index';

export function fetchEventsRequest() {
  return { type: FacebookActionTypes.FETCH_EVENTS_REQUEST };
}

export function fetchEventsSuccess(events, total) {
  return {
    type: FacebookActionTypes.FETCH_EVENTS_SUCCESS,
    payload: { events, total }
  };
}

export function fetchEventsFailure(error) {
  return {
    type: FacebookActionTypes.FETCH_EVENTS_FAILURE,
    payload: { error }
  };
}

export function fetchEvents(access_token, after) {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    return (eventsApi.fetchEvents(access_token, after)
        .then(({ data }) => (
          dispatch(fetchEventsSuccess(data, 0)) //TODO
        ))
        .catch((msj) => {
          const error = { message: 'Failed to fetch events' };
          dispatch(fetchEventsFailure(error));
          // dispatch(
          //   createNotification({
          //     type: 'danger',
          //     title: error.message,
          //     message: 'Please, reload the page to try again.'
          //   })
          // );
        })
    );
  };
}

export function fetchPageEvents(access_token, facebookPage) {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    return (eventsApi.fetchPageEvents(access_token, facebookPage)
        .then(({ data }) => (
          dispatch(fetchEventsSuccess(data, 0)) //TODO
        ))
        .catch((msj) => {
          const error = { message: 'Failed to fetch events' };
          dispatch(fetchEventsFailure(error));
          // dispatch(
          //   createNotification({
          //     type: 'danger',
          //     title: error.message,
          //     message: 'Please, reload the page to try again.'
          //   })
          // );
        })
    );
  };
}