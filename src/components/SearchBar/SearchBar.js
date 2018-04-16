import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectWrapper from './Select/SelectWrapper';

class SearchBar extends Component {
  state = {
    selectedValue: {},
    activeType: null,
  };

  SELECT_TYPE = Object.freeze({
    SELECT_TYPE_COUNTRY: 'SELECT_COUNTRY',
    SELECT_TYPE_YEAR: 'SELECT_YEAR',
    SELECT_TYPE_SALES_RANGE: 'SELECT_SALES_RANGE',
  });

  selectChangedHandler(selectType, newValue) {
    switch (selectType) {
      case this.SELECT_TYPE.SELECT_TYPE_COUNTRY: {
        this.setState({
          activeType: this.SELECT_TYPE.SELECT_TYPE_COUNTRY,
        });
        break;
      }
      case this.SELECT_TYPE.SELECT_TYPE_YEAR:
        {
          this.setState({
            activeType: this.SELECT_TYPE.SELECT_TYPE_YEAR,
          });
        }
        break;
    }

    this.setState({
      selectedValue: newValue,
    });
  }

  render() {
    return (
      <div style={{ marginLeft: '10%', marginRight: '10%' }}>
        <SelectWrapper
          heading="Kraj/Region"
          name="country"
          options={[
            { value: 'polska', label: 'Polska' },
            { value: 'wielka-brytania', label: 'Wielka Brytania' },
          ]}
          handleChange={newValue =>
            this.selectChangedHandler(
              this.SELECT_TYPE.SELECT_TYPE_COUNTRY,
              newValue,
            )
          }
          selectValue={
            this.state.activeType === this.SELECT_TYPE.SELECT_TYPE_COUNTRY
              && this.state.selectedValue
          }
        />
        <SelectWrapper
          heading="Rok"
          name="year"
          options={[{ value: 2005, label: 2005 }, { value: 2006, label: 2006 }]}
          handleChange={newValue =>
            this.selectChangedHandler(
              this.SELECT_TYPE.SELECT_TYPE_YEAR,
              newValue,
            )
          }
          selectValue={
            this.state.activeType === this.SELECT_TYPE.SELECT_TYPE_YEAR
              && this.state.selectedValue
          }
        />
      </div>
    );
  }
}

export default SearchBar;
