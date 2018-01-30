import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './search_filters.css';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClean: PropTypes.func.isRequired,
};

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      searchDate: undefined,
    };
    this.onSearch = this.onSearch.bind(this);
    this.onClean = this.onClean.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  onSearch() {
    const { searchWord, searchDate } = this.state;
    this.props.onSearch(searchWord, searchDate);
  }
  onClean() {
    this.setState({
      searchWord: '',
      searchDate: undefined,
    });
    this.props.onClean();
  }
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
  render() {
    const now = moment().toDate();
    const dayPickerProps = {
      dateFormat: 'DD/MM/YYYY',
      locale: 'es',
      fromMonth: now,
      initialMonth: now,
      fixedWeeks: true,
    };
    const value = this.state.searchDate
      ? this.state.searchDate.format('DD/MM/YYYY')
      : '';
    return (
      <div className="searchfilter-container mg-t-xl" >
        <div className="row align-items-center">
          <div className="col-md-3" />
          <div className="col-md-3">
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              id="inlineFormInputName"
              placeholder="Por palabras"
              onChange={evt => this.setState({ searchWord: evt.target.value })}
              value={this.state.searchWord}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <div className="col-md-2">
            <DayPickerInput
              name="fecha"
              value={value}
              format="DD/MM/YYYY"
              placeholder="Por fecha"
              onDayChange={searchDate => this.setState({ searchDate })}
              dayPickerProps={dayPickerProps}
              className="form-control mb-2 mb-md-0"
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <div className="col-auto mb-2 mb-md-0">
            <Button
              type="submit"
              color="primary"
              className="mg-r-sm"
              onClick={this.onSearch}
            >
              <i className="fa fa-search" /> Buscar
            </Button>
            <Button color="secondary" onClick={this.onClean}>
              Limpiar
            </Button>
          </div>
          <div className="col-sm-1" />
        </div>
      </div>
    );
  }
}

SearchFilter.propTypes = propTypes;

export default SearchFilter;
