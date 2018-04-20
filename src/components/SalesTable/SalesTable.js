import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

class SalesTable extends Component {
  onGridReady = params => {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  };

  onModelUpdated = params => {
    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          marginTop: 106,
          marginRight: 75,
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <AgGridReact
          columnDefs={this.props.columnDefs}
          rowData={this.props.rowData}
          onGridReady={this.onGridReady}
          onModelUpdated={this.onModelUpdated}
          domLayout="autoHeight"
          enableColResize
        />
      </div>
    );
  }
}

export default SalesTable;
