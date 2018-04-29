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
  accessToken = 'EAACEdEose0cBAKZBZBS1rjEmQsKB5d565T035UUaSfxkUNMGagDCilG9d8JdB4qsewh3v6XLlbBK89BJlnou5Lk0d85YeddIxH1ccP8zfuC40fa31ndr27cCKu82ohTHfWo8Lmy631ZBW4zzrvz8tTuTuQZCxOQ1B4lbExSnAqoGN1Eg3Dusi1l6dtei5DUuMzIBxkYeJuVRyA3ZC3ToZB2qTY7ZAeFQwzcRZBjG0vEEwAZDZD';
  let batch = [];
  R.map(
    page => batch.push({
      method: 'GET',
      relative_url: `${page}/${pageEvents}?time_filter=upcoming%26fields=id,description,cover,place,start_time,end_time`,
    }),
    facebookPages,
  );
  batch = JSON.stringify(batch);
  const url = `${baseUrl}?access_token=${accessToken}&batch=${batch}&include_headers=false`;
  return axios.post(url);
}


/**
 * Fetches events details
 * @param access_token
 * @param eventsIds
 * @returns {AxiosPromise}
 */
export function fetchBatchEventsDetailsByIds(accessToken, eventsIds) {
  const url = `${baseUrl}?access_token=${accessToken}&ids=${eventsIds.join(',')}&fields=${eventFields.join(',')}`;
  return axios.get(url);
}


export function sendEmail(email, message, facebook) {
  const url = `sendemail.php?email=${email}&message=${message}&facebook=${facebook}`;
  return axios.post(url, { email, message });
}
