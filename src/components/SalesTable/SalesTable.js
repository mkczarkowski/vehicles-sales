import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import Spinner from 'react-spinkit';

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AgGridContainer = styled.div`
  margin-top: 106px;
  margin-right: 75px;
  box-sizing: border-box;
  height: 100%;
  min-height: 300px !important;
  width: 100%;
  overflow: hidden;
`;

class SalesTable extends Component {
  onGridReady = params => {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
  };

  onModelUpdated = params => {
    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <AgGridContainer className="ag-theme-balham">
        {this.props.isLoading ? (
          <SpinnerContainer>
            <Spinner style={{ margin: '0 auto' }} name="pacman" color="gray" />
          </SpinnerContainer>
        ) : (
          <AgGridReact
            columnDefs={this.props.columnDefs}
            rowData={this.props.rowData}
            onGridReady={this.onGridReady}
            onModelUpdated={this.onModelUpdated}
            domLayout="autoHeight"
            enableColResize
            pagination
            paginationPageSize={10}
          />
        )}
      </AgGridContainer>
    );
  }
}

SalesTable.propTypes = {
  columnDefs: PropTypes.arrayOf(
    PropTypes.shape({
      headerName: PropTypes.string,
      field: PropTypes.string,
      minWidth: PropTypes.number,
    }),
  ).isRequired,
  rowData: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string, PropTypes.number),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SalesTable;
