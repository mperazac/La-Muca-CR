import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import ReactLoading from 'react-loading';

import './pagination_show_more.css';

const propTypes = {
  currentlyShown: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  total: PropTypes.number.isRequired,
  onShowMore: PropTypes.func,
  loading: PropTypes.bool
};
const defaultProps = {
  pageSize: 20,
  showPrevNext: true,
  onShowMore: () => {},
  loading: false
};

class ShowMore extends Component {
  constructor(props) {
    super(props);
    this.state = { currentlyShown: 1 };
    this.onShowMore = this.onShowMore.bind(this);
  }
  // reset state if the seeded 'current' prop is updated
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentlyShown !== this.props.currentlyShown) {
      this.setState({ currentlyShown: nextProps.currentlyShown });
    }
  }
  onShowMore(pageSize, offset) {
    this.props.onShowMore(pageSize, offset);
  }
  render() {
    const { pageSize, total, currentlyShown, loading } = this.props;

    // If currentlyShown is equal than total then, 'load more' buttons are not needed
    if (total === currentlyShown) {
      return null;
    }
    if (loading) {
      return (
        <ReactLoading type="spin" color="#444" className="loading"/>
      );
    }
    // Keeps updated the number of items to show in the Show More button
    const showMoreNumber = (total - currentlyShown) > pageSize ?
      pageSize : total - currentlyShown;
    return (
      <div className="row show-more-pagination-container mg-t-xl">
        <div className="col-md-12">
          <Button
            className="mg-r-lg outline-primary"
            bsSize="large"
            onClick={() => this.onShowMore(pageSize, currentlyShown)}
          >
            Mostrar {showMoreNumber} más
          </Button>
          <Button
            className="outline-primary"
            bsSize="large"
            onClick={() => this.onShowMore(1000, 0)}
          >
            Mostrar todos
          </Button>

        </div>
      </div>
    );
  }
}

ShowMore.propTypes = propTypes;
ShowMore.defaultProps = defaultProps;

export default ShowMore;
