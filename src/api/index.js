import axios from 'axios';

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