import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SelectWrapper from './SelectWrapper/SelectWrapper';
import SalesRange from './SalesRange/SalesRange';
import withHeading from '../../shared/hoc/withHeading';
import { INPUT_TYPE } from '../../shared/constants';

class SearchBar extends Component {
  render() {
    const CountrySelect = withHeading('Kraj/Region', SelectWrapper);
    const YearSelect = withHeading('Rok', SelectWrapper);

    const {
      availableCountries,
      handleInputChange,
      activeType,
      selectedValue,
      availableYears,
    } = this.props;

    return (
      <div style={{ marginTop: 48 }}>
        <CountrySelect
          name="country"
          style={{ width: 228 }}
          options={availableCountries}
          handleChange={newValue =>
            handleInputChange(INPUT_TYPE.INPUT_TYPE_COUNTRY, newValue)
          }
          selectedValue={
            activeType === INPUT_TYPE.INPUT_TYPE_COUNTRY && selectedValue
          }
        />
        <YearSelect
          name="year"
          options={availableYears}
          handleChange={newValue =>
            handleInputChange(INPUT_TYPE.INPUT_TYPE_YEAR, newValue)
          }
          selectedValue={activeType === INPUT_TYPE.INPUT_TYPE_YEAR && selectedValue}
        />
        <SalesRange
            handleChange={newValue =>
            handleInputChange(INPUT_TYPE.INPUT_TYPE_SALES_RANGE, newValue)
          }
            selectedValue={
            activeType === INPUT_TYPE.INPUT_TYPE_SALES_RANGE
              ? selectedValue
              : [0, 0]
          }
            ref={salesRange => (this.salesRange = salesRange)}
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  availableCountries: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
  handleInputChange: PropTypes.func.isRequired,
  activeType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  selectedValue: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
    PropTypes.arrayOf([PropTypes.number, PropTypes.number]),
  ]),
  availableYears: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
  ),
};

SearchBar.defaultProps = {
  activeType: null,
  availableCountries: [],
  availableYears: [],
};

export default SearchBar;
