import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Spinner from 'react-spinkit';

import SearchBar from '../components/SearchBar/SearchBar';
import SalesTable from '../components/SalesTable/SalesTable';
import DisplayButton from '../components/DisplayButton/DisplayButton';
import { COLUMN_DEFS, AVAILABLE_YEARS, INPUT_TYPE } from '../shared/constants';
import Header from '../components/Header/Header';
import SalesChart from '../components/SalesChart/SalesChart';
import { mapKeysAsSelectOptions } from '../shared/libs/mapKeysAsSelectOptions';

axios.defaults.baseURL = 'http://localhost:9090';

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

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

class App extends Component {
  state = {
    searchValue: null,
    activeType: null,
    rowData: [],
    visibleColumns: COLUMN_DEFS,
    visibleRows: [],
    availableCountries: [],
    isLoading: true,
  };

  componentDidMount() {
    axios.get('/vehicles-sales-getAll').then(({ data: countries }) => {
      const salesPerYearForEachCountry = calculateSalesPerYearForEachCountry(
        countries,
      );

      this.setState({
        isLoading: false,
        rowData: salesPerYearForEachCountry,
        visibleRows: salesPerYearForEachCountry,
        availableCountries: mapKeysAsSelectOptions(countries),
      });

      function calculateSalesPerYearForEachCountry(countries) {
        return Object.keys(countries).map(country => {
          const row = { country };
          const countryRef = countries[country];
          const salesPerYear = Object.keys(countryRef).reduce(
            (acc, year) => ({ ...acc, [year]: countryRef[year] }),
            {},
          );

          return { ...row, ...salesPerYear };
        });
      }
    });
  }

  handleInputChange = (selectType, newValue) => {
    this.setState({
      activeType: newValue && selectType, // Determine if newValue is not null, if so, set new activeType
      searchValue: newValue,
    });
  };

  handleDisplay = () => {
    switch (this.state.activeType) {
      case INPUT_TYPE.INPUT_TYPE_COUNTRY: {
        const visibleRows = this.state.rowData.filter(
          row =>
            row.country.toLowerCase() ===
            this.state.searchValue.value.toLowerCase(),
        );

        this.setState({
          visibleRows,
        });
        break;
      }
      case INPUT_TYPE.INPUT_TYPE_YEAR: {
        const matchColumns = col => {
          const isCountryField = col.field === 'country'; // Country column should always stay visible
          const isMatchingYear =
            col.field === this.state.searchValue.value.toString();

          return isCountryField || isMatchingYear;
        };

        const visibleColumns = COLUMN_DEFS.filter(matchColumns);

        const visibleRows = this.state.rowData.map((countrySales, idx) => {
          return Object.keys(countrySales).reduce((acc, key) => {
            const isCountryField = key === 'country'; // Country should always stay visible
            const isMatchingYear =
              key === this.state.searchValue.value.toString();

            if (isCountryField || isMatchingYear) {
              return { ...acc, [key]: this.state.rowData[idx][key] };
            }

            return acc;
          }, {});
        });

        this.setState({
          columnDefs: visibleColumns,
          visibleRows,
        });
        break;
      }
      case INPUT_TYPE.INPUT_TYPE_SALES_RANGE: {
        this.setState({ isLoading: true });
        const [min, max] = this.state.searchValue;
        axios
          .get(`/vehicles-sales-getByRange?start=${min}&stop=${max}`)
          .then(({ data: countries }) => {
            const fetchedRows = Object.keys(countries).map(country => {
              this.setState({
                availableCountries: [
                  ...this.state.availableCountries,
                  { label: country, value: country },
                ],
              });
              const row = { country };
              const countryRef = countries[country];
              const salesPerYear = Object.keys(countryRef).reduce(
                (acc, year) => ({ ...acc, [year]: countryRef[year] }),
                {},
              );

              return { ...row, ...salesPerYear };
            });

            this.setState({
              isLoading: false,
              visibleRows: fetchedRows,
              visibleColumns: COLUMN_DEFS,
            });
          });
        break;
      }
      default: {
        this.setState({
          visibleRows: this.state.rowData,
          visibleColumns: COLUMN_DEFS,
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
              handleInputChange={this.handleInputChange}
              availableCountries={this.state.availableCountries}
              availableYears={AVAILABLE_YEARS}
            />
            <DisplayButton handleClick={this.handleDisplay} />
          </SearchForm>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            {this.state.isLoading ? (
              <SpinnerContainer>
                <Spinner
                  style={{ margin: '66px auto' }}
                  name="pacman"
                  color="gray"
                />
              </SpinnerContainer>
            ) : (
              <div>
                <SalesTable
                  columnDefs={this.state.visibleColumns}
                  rowData={this.state.visibleRows}
                />
                <SalesChart data={this.state.visibleRows} />
              </div>
            )}
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
