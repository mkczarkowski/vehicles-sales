import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { inputSize } from '../../../shared/constants';

const SelectWrapper = ({ name, options, handleChange, selectValue }) => (
  <div>
    <Select
      style={{ width: inputSize }}
      name={name}
      placeholder="Wybierz..."
      options={options}
      onChange={handleChange}
      value={selectValue}
    />
  </div>
);

export default SelectWrapper;
