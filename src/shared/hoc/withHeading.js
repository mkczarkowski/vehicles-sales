import React, { Fragment } from 'react';
import styled from 'styled-components';

const Heading = styled.h3`
  margin-top: 18px;
  margin-bottom: 18px;
`;

const withHeading = (heading, Component) => {
  return class extends React.Component {
    render() {
      return (
        <Fragment>
          <Heading>{heading}</Heading>
          <Component {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withHeading;
