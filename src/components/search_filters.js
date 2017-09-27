import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import './search_filters.css';

const propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClean: PropTypes.func.isRequired
};

class SearchFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: null,
      searchDate: undefined
    };
    this.onSearch = this.onSearch.bind(this);
    this.onClean = this.onClean.bind(this);
  }
  onSearch() {
    const { searchWord, searchDate } = this.state;
    this.props.onSearch(searchWord, searchDate);
  }
  onClean() {
    this.setState({
      searchWord: '',
      searchDate: undefined
    });
    this.props.onClean();
  }
  render() {
    const now = moment().toDate();
    const dayPickerProps = {
      dateFormat: 'DD/MM/YYYY',
      locale: 'es',
      fromMonth: now,
      initialMonth: now,
      fixedWeeks: true
    };
    const value = this.state.searchDate
      ? this.state.searchDate.format('DD/MM/YYYY')
      : '';
    return (
      <div className="searchfilter-container mg-t-xl" >
        <div className="row align-items-center">
          <div className="col-md-3"></div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control mb-2 mb-md-0"
              id="inlineFormInputName"
              placeholder="Buscar por palabras"
              onChange={(evt) => {this.setState({ searchWord: evt.target.value })}}
              value={this.state.searchWord}
            />
          </div>
          <div className="col-md-2">
            <DayPickerInput
              name="fecha"
              value={value}
              format="DD/MM/YYYY"
              placeholder="Buscar por fecha"
              onDayChange={(searchDate) => {
                this.setState({ searchDate })
              }}
              dayPickerProps={dayPickerProps}
              className="form-control mb-2 mb-md-0"
            />
          </div>
          <div className="col-auto mb-2 mb-md-0">
            <button type="submit" className="btn btn-primary mg-r-sm" onClick={this.onSearch}>
              <i className="fa fa-search"></i> Buscar
            </button>
            <button className="btn btn-secondary" onClick={this.onClean}>
              Limpiar
            </button>
          </div>
          <div className="col-sm-1"></div>
        </div>
      </div>
    );
  }
}

SearchFilter.propTypes = propTypes;

export default SearchFilter;