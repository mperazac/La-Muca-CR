import axios from 'axios';
import R from 'ramda';

const base_url = 'https://graph.facebook.com';
const search = 'search'
const event_type = 'event';
const event_q = 'recreativa';
const page_events = 'events';

export function fetchEvents(access_token, after = '') {
  const url = `${base_url}/${search}?access_token=${access_token}&q=${event_q}&type=${event_type}&after=${after}`;
  return axios.get(url);
}

export function fetchPageEvents(access_token, facebookPage) {
  const url = `${base_url}/${facebookPage}/${page_events}?access_token=${access_token}&time_filter=upcoming`;
  return axios.get(url);
}

export function fetchBatchPagesEvents(access_token, facebookPages) {
  let batch = [];
  R.map((page) =>
    batch.push(
      {
        method:"GET",
        relative_url:`${page}/${page_events}?time_filter=upcoming%26`
      }
    ),
    facebookPages
  );
  batch = JSON.stringify(batch);
  const url = `${base_url}?access_token=${access_token}&batch=${batch}`;
  return axios.post(url);
}

export function fetchBatchEventsPicturesByIds(access_token, eventsIds) {
  const url = `${base_url}?access_token=${access_token}&ids=${eventsIds.join(',')}&fields=cover`;
  return axios.get(url);
}