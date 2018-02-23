/* global window */
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

const defaultProps = {
  url: 'http://lamucacr.webondigital.com',
  title: 'Directorio de recreativas de MTB en Costa Rica',
};

const ShareThis = ({ url, title }) => (
  <div
    className="sharethis-inline-share-buttons"
    data-url={url}
    data-title={title}
  />
);

ShareThis.propTypes = propTypes;
ShareThis.defaultProps = defaultProps;

export default ShareThis;