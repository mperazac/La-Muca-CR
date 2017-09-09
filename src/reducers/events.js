import R from 'ramda';
import deepFreeze from 'deep-freeze';
import * as FacebookActionTypes from '../actiontypes/events';

const initialState = {
  data: {
    events: []
  },
  meta: {
    isFetchingEvents: false,
    total: 0,
  },
  paging: {
    cursors: {
      before: '',
      after: ''
    },
    next: ''
  }
};

const EventsListReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case FacebookActionTypes.FETCH_EVENTS_REQUEST:
      return deepFreeze(R.assocPath(['meta', 'isFetchingEvents'], true, state));
    case FacebookActionTypes.FETCH_EVENTS_FAILURE:
      return deepFreeze(R.assocPath(['meta', 'isFetchingEvents'], false, state));
    case FacebookActionTypes.FETCH_EVENTS_SUCCESS:
      return deepFreeze(
        R.compose(
          R.assocPath(['meta', 'isFetchingEvents'], false),
          R.assocPath(['meta', 'total'], 0), //TODO
          R.assocPath(
            ['data', 'events'],
            R.compose(
              R.sortBy(R.prop('start_time')),
              R.concat(state.data.events),
            )(payload.events.data)),
          R.assocPath(['paging'], payload.events.paging)
        )(state)
      );
    case FacebookActionTypes.FETCH_EVENTS_BATCH_SUCCESS:
      return deepFreeze(
        R.compose(
          R.assocPath(
            ['data', 'events'],
            R.sortBy(R.prop('start_time'))
            (R.concat(
              state.data.events,
              payload.events
            ))
          )
        )(state)
      );
    case FacebookActionTypes.FETCH_EVENTS_PICTURES_BATCH_SUCCESS:
      return deepFreeze(
        R.compose(
          R.assocPath(['meta', 'isFetchingEvents'], false),
          R.assocPath(
            ['data', 'events'],
            getEventsWithPictures(state.data.events, payload.events)
          )
        )(state)
      );
    default:
      return deepFreeze(state);
  }
};

const getEventsWithPictures = (stateEvents, payloadEvents) => {
  const respon = R.map((stateEvent) => {
    const payloadEvent = R.prop(R.prop('id', stateEvent), payloadEvents);
    const url = R.path(['cover', 'source'], payloadEvent);
    return R.assoc('profilePicture', url, stateEvent);
  }, stateEvents);
  return respon;
};

export default EventsListReducer;
