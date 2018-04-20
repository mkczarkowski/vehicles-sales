import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../shared/styled/Button';

const DisplayButton = ({ handleClick }) => (
  <Button onClick={handleClick}>Wyświetl</Button>
);

export default DisplayButton;
