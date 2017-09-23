import R from 'ramda';
import * as FacebookActionTypes from '../actiontypes/events';
import * as eventsApi from '../api/index';

export function fetchEventsRequest() {
  return { type: FacebookActionTypes.FETCH_EVENTS_REQUEST };
}

export function fetchEventsFailure(error) {
  return {
    type: FacebookActionTypes.FETCH_EVENTS_FAILURE,
    payload: { error }
  };
}

export function fetchAllBatchEventsSuccess(events, total) {
  return {
    type: FacebookActionTypes.FETCH_ALL_EVENTS_SUCCESS,
    payload: { events, total }
  };
}

/**
 * Fetches events by facebooks pages and single events
 * @param access_token
 * @param facebookPages
 * @param facebookEvents
 * @returns {function(*=)}
 */
export function fetchAllBatchEvents(access_token, facebookPages, facebookEvents) {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    return (eventsApi.fetchBatchPagesEvents(access_token, facebookPages)
        .then(({ data }) => {
          const events = getEvents(data);
          const uniqueEvents = R.uniqBy((x) => (x.id), events);
          const eventsIds = R.concat(R.pluck('id', uniqueEvents), facebookEvents);
          eventsApi.fetchBatchEventsDetailsByIds(access_token, eventsIds)
            .then(({ data }) => {
              dispatch(fetchAllBatchEventsSuccess(Object.values(data), 0));
            })
            .catch((msj) => {
              const error = { message: 'Failed to fetch events details' };
              dispatch(fetchEventsFailure(error));
            });
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
