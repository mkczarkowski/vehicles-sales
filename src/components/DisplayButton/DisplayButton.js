import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../shared/styled/Button';

const DisplayButton = ({ handleClick }) => (
  <Button onClick={handleClick}>Wyświetl</Button>
);

DisplayButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default DisplayButton;
