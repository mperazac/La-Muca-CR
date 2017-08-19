import axios from 'axios';

const base_url = 'https://graph.facebook.com';
const search = 'search'
const event_type = 'event';
const event_q = 'recreativa';

export function fetchEvents(access_token, after = '') {
  const url = `${base_url}/${search}?access_token=${access_token}&q=${event_q}&type=${event_type}&after=${after}`;
  return axios.get(url);
}