import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SelectWrapper = ({ name, options, handleChange, selectValue }) => (
  <div>
    <Select
      style={{ width: 228 }}
      name={name}
      placeholder="Wybierz..."
      options={options}
      onChange={handleChange}
      value={selectValue}
    />
  </div>
);

export default SelectWrapper;
