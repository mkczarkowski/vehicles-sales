import React from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { INPUT_WIDTH } from '../../../shared/constants';

const SelectWrapper = ({ name, options, handleChange, searchValue }) => (
  <div>
    <Select
      style={{ width: INPUT_WIDTH }}
      name={name}
      placeholder="Wybierz..."
      options={options}
      onChange={handleChange}
      value={searchValue}
    />
  </div>
);

SelectWrapper.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.oneOfType([
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
};

SelectWrapper.defaultProps = {
  searchValue: null,
};

export default SelectWrapper;
