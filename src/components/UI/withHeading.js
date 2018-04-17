import React, { Fragment } from 'react';

const withHeading = (heading, Component) => {
  return class extends React.Component {
    render() {
      return (
        <Fragment>
          <h3>{heading}</h3>
          <Component {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withHeading;
