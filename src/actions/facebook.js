import R from 'ramda';

export function getLoginStatus(status) {
  return { type: 'loginResponse', payload: status };
}

export function startFetching() {
  return { type: 'fetching' };
}

export function getUserInformation(userInformation, user_access_token) {
  const userInfo = R.assoc('access_token', user_access_token, userInformation);
  return { type: 'getUserInformation', payload: userInfo };
}