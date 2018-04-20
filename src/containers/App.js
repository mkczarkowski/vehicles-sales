import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import SearchBar from '../components/SearchBar/SearchBar';
import SalesTable from '../components/SalesTable/SalesTable';
import DisplayButton from '../components/DisplayButton/DisplayButton';
import { INPUT_TYPE } from '../shared/constants';
import Header from '../components/Header/Header';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SearchForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 75px;
  margin-right: 75px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: null,
      activeType: null,
      ...this.initialState,
    };
  }

  initialState = {
    columnDefs: [
      { headerName: 'Kraj/Region', field: 'country', minWidth: 130 },
      { headerName: '2005', field: '2005', minWidth: 70 },
      { headerName: '2006', field: '2006', minWidth: 70 },
      { headerName: '2007', field: '2007', minWidth: 70 },
      { headerName: '2008', field: '2008', minWidth: 70 },
      { headerName: '2009', field: '2009', minWidth: 70 },
      { headerName: '2010', field: '2010', minWidth: 70 },
      { headerName: '2011', field: '2011', minWidth: 70 },
      { headerName: '2012', field: '2012', minWidth: 70 },
      { headerName: '2013', field: '2013', minWidth: 70 },
      { headerName: '2014', field: '2014', minWidth: 70 },
      { headerName: '2015', field: '2015', minWidth: 70 },
      { headerName: '2016', field: '2016', minWidth: 70 },
      { headerName: '2017', field: '2017', minWidth: 70 },
    ],
    rowData: [
      {
        country: 'Polska',
        2005: '307',
        2006: '307',
        2007: '307',
        2008: '307',
        2009: '307',
        2010: '307',
        2011: '307',
        2012: '307',
        2013: '307',
        2014: '307',
        2015: '307',
        2016: '307',
        2017: '307',
      },
      {
        country: 'Anglia',
        2005: '307',
        2006: '307',
        2007: '307',
        2008: '307',
        2009: '307',
        2010: '307',
        2011: '307',
        2012: '307',
        2013: '307',
        2014: '307',
        2015: '307',
        2016: '307',
        2017: '307',
      },
    ],
  };

  handleSelectChanged = (selectType, newValue) => {
    this.setState({
      activeType: newValue && selectType, // Determine if newValue is not null, if so, set new activeType
      searchValue: newValue,
    });
  };

  handleDisplay = () => {
    axios.get('/test');

    switch (this.state.activeType) {
      case INPUT_TYPE.INPUT_TYPE_COUNTRY: {
        const visibleRows = this.initialState.rowData.filter(
          row =>
            row.country.toLowerCase() ===
            this.state.searchValue.value.toLowerCase(),
        );

        this.setState({
          rowData: visibleRows,
        });
        break;
      }
      case INPUT_TYPE.INPUT_TYPE_YEAR: {
        const matchColumns = col => {
          const isCountryField = col.field === 'country'; // Country column should always stay visible
          const isMatchingYear = col.field == this.state.searchValue.value;

          return isCountryField || isMatchingYear;
        };

        const visibleColumns = this.initialState.columnDefs.filter(
          matchColumns,
        );

        this.setState({
          columnDefs: visibleColumns,
        });
        break;
      }
      default: {
        this.setState({
          ...this.initialState,
        });
      }
    }
  };

  render() {
    return (
      <div>
        <Header />
        <Container>
          <SearchForm>
            <SearchBar
              searchValue={this.state.searchValue}
              activeType={this.state.activeType}
              handleSelectChanged={this.handleSelectChanged}
            />
            <DisplayButton handleClick={this.handleDisplay} />
          </SearchForm>
          <SalesTable
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
          />
        </Container>
      </div>
    );
  }
}

export default App;
