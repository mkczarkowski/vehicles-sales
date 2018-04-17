import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';

class SalesTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: 'Kraj', field: 'make' },
        { headerName: '2001', field: 'model' },
        { headerName: '2002', field: 'price' },
      ],
      rowData: [
        { make: 'Polska', model: 'Celica', price: 35000 },
        { make: 'Anglia', model: 'Mondeo', price: 32000 },
        { make: 'Niemcy', model: 'Boxter', price: 72000 },
      ],
    };
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          marginTop: "3%",
          height: '500px',
          width: '60%',
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        />
      </div>
    );
  }
}

export default SalesTable;
