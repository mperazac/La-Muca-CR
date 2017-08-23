import R from 'ramda';
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

export function fetchBatchEventsSuccess(events, total) {
  return {
    type: FacebookActionTypes.FETCH_EVENTS_BATCH_SUCCESS,
    payload: { events, total }
  };
}

export function fetchBatchEventsPicturesSuccess(events, total) {
  return {
    type: FacebookActionTypes.FETCH_EVENTS_PICTURES_BATCH_SUCCESS,
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
        })
    );
  };
}

export function fetchBatchEvents(access_token, facebookPages) {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    return (eventsApi.fetchBatchPagesEvents(access_token, facebookPages)
        .then(({ data }) => {
          const events = getEvents(data);
          const eventsIds = R.pluck('id', events);
          dispatch(fetchBatchEventsSuccess(events, 0));
          eventsApi.fetchBatchEventsPicturesByIds(access_token, eventsIds)
            .then(({ data }) => {
              console.log(data);
              dispatch(fetchBatchEventsPicturesSuccess(data, 0));
            })
            .catch((msj) => {
              const error = { message: 'Failed to fetch events' };
              dispatch(fetchEventsFailure(error));
            })
        })
        .catch((msj) => {
          const error = { message: 'Failed to fetch events' };
          dispatch(fetchEventsFailure(error));
        })
    );
  };
}

const getEvents = (events) => {
  return R.reduce(
    R.concat,
    [],
    R.compose(
      R.pluck('data'),
      R.map((event) => JSON.parse(event)),
      R.pluck('body'),
      R.filter(R.propEq('code', 200))
    )(events)
  );
};