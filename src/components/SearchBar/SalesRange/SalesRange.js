import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const { Range } = Slider;

class SalesRange extends Component {
  state = {
    lowerBound: 20,
    upperBound: 40,
    value: [20, 40],
  };

  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  };

  render() {
    const style = {
      width: 228,
    };
    return (
      <div>
        <Range
          style={style}
          allowCross={false}
          value={this.props.selectValue}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default SalesRange;
