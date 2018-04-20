import React, { Component } from 'react';

import SelectWrapper from './SelectWrapper/SelectWrapper';
import SalesRange from './SalesRange/SalesRange';
import withHeading from '../../shared/hoc/withHeading';
import { INPUT_TYPE } from '../../shared/constants';

class SearchBar extends Component {
  render() {
    const CountrySelect = withHeading('Kraj/Region', SelectWrapper);
    const YearSelect = withHeading('Rok', SelectWrapper);
    const SalesRangeSlidersWithHeading = withHeading(
      'Ilość sprzedanych aut',
      SalesRange,
    );
    return (
      <div style={{ marginTop: 88 }}>
        <CountrySelect
          name="country"
          style={{ width: 228 }}
          options={[
            { value: 'polska', label: 'Polska' },
            { value: 'anglia', label: 'Anglia' },
          ]}
          handleChange={newValue =>
            this.props.handleSelectChanged(
              INPUT_TYPE.INPUT_TYPE_COUNTRY,
              newValue,
            )
          }
          selectValue={
            this.props.activeType === INPUT_TYPE.INPUT_TYPE_COUNTRY &&
            this.props.searchValue
          }
        />
        <YearSelect
          name="year"
          options={[{ value: 2005, label: 2005 }, { value: 2006, label: 2006 }]}
          handleChange={newValue =>
            this.props.handleSelectChanged(INPUT_TYPE.INPUT_TYPE_YEAR, newValue)
          }
          selectValue={
            this.props.activeType === INPUT_TYPE.INPUT_TYPE_YEAR &&
            this.props.searchValue
          }
        />
        <SalesRangeSlidersWithHeading
          handleChange={newValue =>
            this.props.handleSelectChanged(
              INPUT_TYPE.INPUT_TYPE_SALES_RANGE,
              newValue,
            )
          }
          selectValue={
            this.props.activeType === INPUT_TYPE.INPUT_TYPE_SALES_RANGE
              ? this.props.searchValue
              : [0, 0]
          }
        />
      </div>
    );
  }
}

export default SearchBar;
