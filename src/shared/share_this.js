import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

const defaultProps = {
  url: "http://lamucacr.webondigital.com",
  title: "Directorio de recreativas de MTB en Costa Rica"
};

class ShareThis extends Component {
  componentDidMount() {
    window.__sharethis__.initialize();
  }

  render() {
    const { url, title} = this.props;
    return (
      <div
        className="sharethis-inline-share-buttons"
        data-url={url}
        data-title={title}
      >
      </div>
    );
  }
}

ShareThis.propTypes = propTypes;
ShareThis.defaultProps = defaultProps;

export default ShareThis;