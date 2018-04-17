import React, { Component } from 'react';

import SelectWrapper from './SelectWrapper/SelectWrapper';
import SalesRange from './SalesRange/SalesRange';
import withHeading from '../UI/withHeading';

class SearchBar extends Component {
  state = {
    selectedValue: {},
    activeType: null,
  };

  INPUT_TYPE = Object.freeze({
    INPUT_TYPE_COUNTRY: 'SELECT_COUNTRY',
    INPUT_TYPE_YEAR: 'SELECT_YEAR',
    INPUT_TYPE_SALES_RANGE: 'SELECT_SALES_RANGE',
  });

  selectChangedHandler(selectType, newValue) {
    switch (selectType) {
      case this.INPUT_TYPE.INPUT_TYPE_COUNTRY: {
        this.setState({
          activeType: this.INPUT_TYPE.INPUT_TYPE_COUNTRY,
        });
        break;
      }
      case this.INPUT_TYPE.INPUT_TYPE_YEAR: {
        this.setState({
          activeType: this.INPUT_TYPE.INPUT_TYPE_YEAR,
        });
        break;
      }
      case this.INPUT_TYPE.INPUT_TYPE_SALES_RANGE: {
        this.setState({
          activeType: this.INPUT_TYPE.INPUT_TYPE_SALES_RANGE,
        });
        break;
      }
      default: {
        this.setState({
          activeType: null,
        });
      }
    }

    this.setState({
      selectedValue: newValue,
    });
  }

  render() {
    const CountrySelect = withHeading('Kraj/Region', SelectWrapper);
    const YearSelect = withHeading('Rok', SelectWrapper);
    const SalesRangeSlidersWithHeading = withHeading(
      'Ilość sprzedanych aut',
      SalesRange,
    );
    return (
      <div style={{ marginTop: '6%', marginLeft: '10%', marginRight: '10%' }}>
        <CountrySelect
          name="country"
          style={{ width: 228 }}
          options={[
            { value: 'polska', label: 'Polska' },
            { value: 'wielka-brytania', label: 'Wielka Brytania' },
          ]}
          handleChange={newValue =>
            this.selectChangedHandler(
              this.INPUT_TYPE.INPUT_TYPE_COUNTRY,
              newValue,
            )
          }
          selectValue={
            this.state.activeType === this.INPUT_TYPE.INPUT_TYPE_COUNTRY &&
            this.state.selectedValue
          }
        />
        <YearSelect
          name="year"
          options={[{ value: 2005, label: 2005 }, { value: 2006, label: 2006 }]}
          handleChange={newValue =>
            this.selectChangedHandler(this.INPUT_TYPE.INPUT_TYPE_YEAR, newValue)
          }
          selectValue={
            this.state.activeType === this.INPUT_TYPE.INPUT_TYPE_YEAR &&
            this.state.selectedValue
          }
        />
        <SalesRangeSlidersWithHeading
          handleChange={newValue =>
            this.selectChangedHandler(
              this.INPUT_TYPE.INPUT_TYPE_SALES_RANGE,
              newValue,
            )
          }
          selectValue={
            this.state.activeType === this.INPUT_TYPE.INPUT_TYPE_SALES_RANGE
              ? this.state.selectedValue
              : [0, 0]
          }
        />
      </div>
    );
  }
}

export default SearchBar;
