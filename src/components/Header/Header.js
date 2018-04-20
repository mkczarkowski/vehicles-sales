import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Heading = styled.h1`
  text-align: center;
`;

const Header = props => (
  <Heading>
    Raport sprzedaży pojazdów w wybranych państwach na przestrzeni 2005 - 2017
    roku
  </Heading>
);

export default Header;
