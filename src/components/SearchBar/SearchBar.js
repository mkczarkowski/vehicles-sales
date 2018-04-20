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
    const SalesRangeWithHeading = withHeading(
      'Ilość sprzedanych aut',
      SalesRange,
    );

    const { handleInputChange, activeType, searchValue } = this.props;

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
            handleInputChange(INPUT_TYPE.INPUT_TYPE_COUNTRY, newValue)
          }
          searchValue={
            activeType === INPUT_TYPE.INPUT_TYPE_COUNTRY && searchValue
          }
        />
        <YearSelect
          name="year"
          options={[{ value: 2005, label: 2005 }, { value: 2006, label: 2006 }]}
          handleChange={newValue =>
            handleInputChange(INPUT_TYPE.INPUT_TYPE_YEAR, newValue)
          }
          searchValue={activeType === INPUT_TYPE.INPUT_TYPE_YEAR && searchValue}
        />
        <SalesRangeWithHeading
          handleChange={newValue =>
            handleInputChange(INPUT_TYPE.INPUT_TYPE_SALES_RANGE, newValue)
          }
          searchValue={
            activeType === INPUT_TYPE.INPUT_TYPE_SALES_RANGE
              ? searchValue
              : [0, 0]
          }
        />
      </div>
    );
  }
}

SearchBar.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  activeType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  searchValue: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
    PropTypes.arrayOf([PropTypes.number, PropTypes.number]),
  ]),
};

SearchBar.defaultProps = {
  activeType: null,
};

export default SearchBar;
