import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SelectWrapper = ({ heading, name, options, handleChange, selectValue }) => (
  <div className="section">
    <h3 className="section-heading">{heading}</h3>
    <Select
      name={name}
      placeholder="Wybierz..."
      options={options}
      onChange={handleChange}
      value={selectValue}
    />
  </div>
);

export default SelectWrapper;
