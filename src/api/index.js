import axios from 'axios';
import R from 'ramda';

const base_url = 'https://graph.facebook.com';
const page_events = 'events';
const eventFields = ['id','name','cover','owner','description','start_time'];

/**
 * Fetches upcoming Facebook events by pages names
 * @param access_token
 * @param facebookPages
 * @returns {AxiosPromise}
 */
export function fetchBatchPagesEvents(access_token, facebookPages) {
  let batch = [];
  R.map((page) =>
    batch.push(
      {
        method:"GET",
        relative_url:`${page}/${page_events}?time_filter=upcoming%26fields=id%26`
      }
    ),
    facebookPages
  );
  batch = JSON.stringify(batch);
  const url = `${base_url}?access_token=${access_token}&batch=${batch}`;
  return axios.post(url);
}


/**
 * Fetches events details
 * @param access_token
 * @param eventsIds
 * @returns {AxiosPromise}
 */
export function fetchBatchEventsDetailsByIds(access_token, eventsIds) {
  const url = `${base_url}?access_token=${access_token}&ids=${eventsIds.join(',')}&fields=${eventFields.join(',')}`;
  return axios.get(url);
}