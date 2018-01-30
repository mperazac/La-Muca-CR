import R from 'ramda';
import moment from 'moment';
import * as FacebookActionTypes from '../actiontypes/events';
import * as eventsApi from '../api/index';

export function fetchEventsRequest() {
  return { type: FacebookActionTypes.FETCH_EVENTS_REQUEST };
}

export function fetchEventsFailure(error) {
  return {
    type: FacebookActionTypes.FETCH_EVENTS_FAILURE,
    payload: { error },
  };
}

export function fetchAllBatchEventsSuccess(events, total) {
  return {
    type: FacebookActionTypes.FETCH_ALL_EVENTS_SUCCESS,
    payload: { events, total },
  };
}

const getOnlyUpcomingEvents = events =>
  R.filter(event => moment(event.start_time).isSameOrAfter(moment.now()), events);

const getEvents = events =>
  R.reduce(
    R.concat,
    [],
    R.compose(
      R.pluck('data'),
      R.map(event => JSON.parse(event)),
      R.pluck('body'),
      R.filter(R.propEq('code', 200)),
    )(events),
  );

/**
 * Fetches events by facebooks pages and single events
 * @param accessToken
 * @param facebookPages
 * @param facebookEvents
 * @returns {function(*=)}
 */
export function fetchAllBatchEvents(
  accessToken,
  facebookPages,
  facebookEvents,
  excludeFacebookEvents,
) {
  return (dispatch) => {
    dispatch(fetchEventsRequest());
    return (eventsApi.fetchBatchPagesEvents(accessToken, facebookPages)
      .then(({ data }) => {
        const events = getEvents(data);
        const eventsIds = R.concat(R.pluck('id', events), facebookEvents);
        const uniqueEventsIds = R.without(excludeFacebookEvents, R.uniq(eventsIds));
        eventsApi.fetchBatchEventsDetailsByIds(accessToken, uniqueEventsIds)
          .then(({ data }) => {
            const onlyUpcomingEvents = getOnlyUpcomingEvents(Object.values(data));
            dispatch(fetchAllBatchEventsSuccess(onlyUpcomingEvents, 0));
          })
          .catch(() => {
            const error = { message: 'Failed to fetch events details' };
            dispatch(fetchEventsFailure(error));
          });
      })
      .catch(() => {
        const error = { message: 'Failed to fetch events' };
        dispatch(fetchEventsFailure(error));
      })
    );
  };
}
