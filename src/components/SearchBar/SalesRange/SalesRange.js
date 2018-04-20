import React, { Component } from 'react';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import { inputSize } from '../../../shared/constants';

const { Range } = Slider;

const SalesRange = ({ selectValue, handleChange }) => (
  <div>
    <Range
      style={{ width: inputSize }}
      allowCross={false}
      value={selectValue}
      onChange={handleChange}
    />
  </div>
);

export default SalesRange;
