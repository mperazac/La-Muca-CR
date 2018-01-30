import R from 'ramda';

export function getLoginStatus(status) {
  return { type: 'loginResponse', payload: status };
}

export function startFetching() {
  return { type: 'fetching' };
}

export function getUserInformation(userInformation, userAccessToken) {
  const userInfo = R.assoc('accessToken', userAccessToken, userInformation);
  return { type: 'getUserInformation', payload: userInfo };
}
