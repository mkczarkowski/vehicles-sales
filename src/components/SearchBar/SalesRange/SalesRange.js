import React, { Component } from 'react';

import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import {inputSize} from "../../../shared/constants";

const { Range } = Slider;

class SalesRange extends Component {
  state = {
    lowerBound: 20,
    upperBound: 40,
    value: [20, 40],
  };

  render() {
    return (
      <div>
        <Range
          style={{ width: inputSize }}
          allowCross={false}
          value={this.props.selectValue}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default SalesRange;
