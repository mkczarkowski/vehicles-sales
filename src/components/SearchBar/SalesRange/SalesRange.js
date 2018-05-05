import React from 'react';
import PropTypes from 'prop-types';

import NumericInput from 'react-numeric-input';

const SalesRange = ({ searchValue: [min, max], handleChange }) => (
  <div>
    <div>Min</div>
    <NumericInput
      onChange={valueAsNumber => handleChange([valueAsNumber, max])}
      step={1000}
      min={0}
      max={100000000}
      value={min}
    />
    <div>Max</div>
    <NumericInput
      onChange={valueAsNumber => handleChange([min, valueAsNumber])}
      step={1000}
      min={0}
      max={100000000}
      value={max}
    />
  </div>
);

SalesRange.propTypes = {
  searchValue: PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired,
  handleChange: PropTypes.func.isRequired,
};

SalesRange.propsTypes = {
  searchValue: [0, 0],
};

export default SalesRange;
