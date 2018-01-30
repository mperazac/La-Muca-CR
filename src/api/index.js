import axios from 'axios';
import R from 'ramda';

const baseUrl = 'https://graph.facebook.com';
const pageEvents = 'events';
const eventFields = ['id', 'name', 'cover', 'owner', 'description', 'start_time', 'end_time', 'place'];

/**
 * Fetches upcoming Facebook events by pages names
 * @param accessToken
 * @param facebookPages
 * @returns {AxiosPromise}
 */
export function fetchBatchPagesEvents(accessToken, facebookPages) {
  let batch = [];
  R.map(
    page => batch.push({
      method: 'GET',
      relative_url: `${page}/${pageEvents}?time_filter=upcoming%26fields=id%26`,
    }),
    facebookPages,
  );
  batch = JSON.stringify(batch);
  const url = `${baseUrl}?access_token=${accessToken}&batch=${batch}`;
  return axios.post(url);
}


/**
 * Fetches events details
 * @param access_token
 * @param eventsIds
 * @returns {AxiosPromise}
 */
export function fetchBatchEventsDetailsByIds(accessToken, eventsIds) {
  const url = `${baseUrl}?access_token=${accessToken}&ids=${eventsIds.join(', ')}&fields=${eventFields.join(',')}`;
  return axios.get(url);
}


export function sendEmail(email, message, facebook) {
  const url = `sendemail.php?email=${email}&message=${message}&facebook=${facebook}`;
  return axios.post(url, { email, message });
}
