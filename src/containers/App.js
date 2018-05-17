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
import { mapKeysAsSelectOptions } from './libs/mapKeysAsSelectOptions';
import { isKeyMatching } from './libs/isKeyMatching';

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
    selectedValue: null,
    activeType: null,
    rowData: [],
    visibleColumns: COLUMN_DEFS,
    visibleRows: [],
    availableCountries: [],
    isLoading: true,
  };

  componentDidMount() {
    /**
     * Synchronize state with API
     */
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.activeType ===  INPUT_TYPE.INPUT_TYPE_SALES_RANGE) {
       /**
        * Refocus min/max sales range input after selectedValue has changed
        */
      if (prevState.selectedValue[0] !== this.state.selectedValue[0]) {
        this.searchBar.salesRange.minInput.focus();
      } else {
        this.searchBar.salesRange.maxInput.focus();
      }
    }
  }

  handleInputChange = (selectType, newValue) => {
    this.setState(
      {
        activeType: newValue && selectType, // Determine if newValue is not null, if so, set new activeType
        selectedValue: newValue,
      },
    );
  };

  handleDisplayClick = () => {
    this.setState({ isLoading: true });
    const selectedValue = this.state.selectedValue.value;
    switch (this.state.activeType) {
      case INPUT_TYPE.INPUT_TYPE_COUNTRY: {
        /**
         * Filter data to display only sales of selected country
         */
        const isCountryMatching = isKeyMatching('country');
        const isCountryMatchingSelectedCountry = isCountryMatching(
          selectedValue,
        );
        const visibleRows = this.state.rowData.filter(
          isCountryMatchingSelectedCountry,
        );

        this.setState({
          visibleRows,
          visibleColumns: COLUMN_DEFS,
          isLoading: false,
        });

        break;
      }
      case INPUT_TYPE.INPUT_TYPE_YEAR: {
        /**
         * Filter data to display sales of each country in selected year
         */
        const isFieldMatching = isKeyMatching('field');
        const isFieldMatchingCountry = isFieldMatching('country');
        const isFieldMatchingSelectedYear = isFieldMatching(selectedValue);

        const countryNames = COLUMN_DEFS.filter(isFieldMatchingCountry);
        const visibleColumns = [
          ...countryNames,
          ...COLUMN_DEFS.filter(isFieldMatchingSelectedYear),
        ];

        const visibleRows = this.state.rowData.map((countrySales, idx) => {
          return Object.keys(countrySales).reduce(
            reduceRowDataToSelectedYearAndCountryName.bind(this),
            {},
          );

          function reduceRowDataToSelectedYearAndCountryName(acc, key) {
            const isKeyMatchingCountry = key === 'country';
            const isKeyMatchingSelectedYear = key === selectedValue;

            if (isKeyMatchingCountry || isKeyMatchingSelectedYear) {
              return { ...acc, [key]: this.state.rowData[idx][key] };
            }

            return acc;
          }
        });

        this.setState({
          visibleColumns,
          visibleRows,
          isLoading: false,
        });
        break;
      }
      case INPUT_TYPE.INPUT_TYPE_SALES_RANGE: {
        /**
         * Filter data that match selected sales count range
         */
        const [min, max] = this.state.selectedValue;
        axios
          .get(`/vehicles-sales-getByRange?start=${min}&stop=${max}`)
          .then(({ data: countries }) => {
            const fetchedRows = Object.keys(countries).map(country => {
              const countrySales = countries[country];
              return { country, ...countrySales };
            });

            this.setState({
              visibleRows: fetchedRows,
              visibleColumns: COLUMN_DEFS,
              isLoading: false,
            });
          });
        break;
      }
      default: {
        this.setState({
          visibleRows: this.state.rowData,
          visibleColumns: COLUMN_DEFS,
          isLoading: false,
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
              selectedValue={this.state.selectedValue}
              activeType={this.state.activeType}
              handleInputChange={this.handleInputChange}
              availableCountries={this.state.availableCountries}
              availableYears={AVAILABLE_YEARS}
              ref={searchBar => (this.searchBar = searchBar)}
            />
            <DisplayButton handleClick={this.handleDisplayClick} />
          </SearchForm>
          <div
            style={{
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
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <div style={{ overflow: 'hidden', flexGrow: '1' }}>
                    <SalesTable
                      columnDefs={this.state.visibleColumns}
                      rowData={this.state.visibleRows}
                    />
                  </div>
                </div>
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
