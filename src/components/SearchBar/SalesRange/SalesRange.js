import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import 'antd/dist/antd.css';
import { InputNumber } from 'antd';
import { INPUT_WIDTH } from "../../../shared/constants";

const Heading = styled.h3`
  margin-top: 18px;
  margin-bottom: 18px;
`;


class SalesRange extends React.Component {
  render() {
    const {
      selectedValue: [min, max],
      handleChange,
    } = this.props;

    return (
      <div>
        <Heading>Ilość sprzedanych sztuk</Heading>
        <div>Min</div>
        <InputNumber
          onChange={valueAsNumber => {
            handleChange([valueAsNumber, max]);
          }}
          step={1000}
          min={0}
          max={100000000}
          value={min}
          ref={input => (this.minInput = input)}
          style={{ width: INPUT_WIDTH }}
        />
        <div>Max</div>
        <InputNumber
          onChange={valueAsNumber => {
            handleChange([min, valueAsNumber]);
          }}
          step={1000}
          min={min}
          max={100000000}
          value={max}
          ref={input => (this.maxInput = input)}
          style={{ width: INPUT_WIDTH }}
        />
      </div>
    );
  }
}

SalesRange.propTypes = {
  selectedValue: PropTypes.arrayOf(PropTypes.number, PropTypes.number)
    .isRequired,
  handleChange: PropTypes.func.isRequired,
};

SalesRange.propsTypes = {
  searchValue: [0, 0],
};

export default SalesRange;
