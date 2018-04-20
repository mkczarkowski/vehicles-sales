import React from 'react';
import PropTypes from 'prop-types';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { inputSize } from '../../../shared/constants';

const { Range } = Slider;

const SalesRange = ({ selectValue: searchValue, handleChange }) => (
  <div>
    <Range
      style={{ width: inputSize }}
      allowCross={false}
      value={searchValue}
      onChange={handleChange}
    />
  </div>
);

SalesRange.propTypes = {
  searchValue: PropTypes.arrayOf(PropTypes.number, PropTypes.number),
  handleChange: PropTypes.func.isRequired,
};

SalesRange.propsTypes = {
  searchValue: [0, 0],
};

export default SalesRange;
