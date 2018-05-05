import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

const AgGridContainer = styled.div`
  margin-top: 66px;
  margin-right: 75px;
  box-sizing: border-box;
  height: 100%;
  min-height: 300px !important;
  width: 100%;
  max-width: 1450px;
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
  rowData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SalesTable;
