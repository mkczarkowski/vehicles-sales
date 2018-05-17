import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Brush,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import randomMC from 'random-material-color';
import union from 'lodash.union';
import isEqual from 'lodash.isequal';

const MyResponsiveContainer = styled.div`
  width: 1450px;
  height: 300px;

  @media screen and (max-width: 1600px) {
    width: 1100px;
  }

  @media screen and (max-width: 1400px) {
    width: 900px;
  }

  @media screen and (max-width: 1200px) {
    width: 700px;
  }

  @media screen and (max-width: 1000px) {
    width: 500px;
  }

  @media screen and (max-width: 800px) {
    width: 300px;
  }
`;

class SalesChart extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if (nextProps.data.length > 0) {
      const getYearKeys = (acc, key) => {
        const numericalKey = Number(key);
        if (Number.isFinite(numericalKey)) {
          return [...acc, numericalKey];
        }

        return acc;
      };

      let visibleYears = [];
      nextProps.data.forEach(countrySales => {
        visibleYears = union(
          visibleYears,
          Object.keys(countrySales).reduce(getYearKeys, []),
        );
      });

      return { barKeys: visibleYears };
    }

    return null;
  }

  state = {
    barKeys: [],
  };

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props.data, nextProps.data);
  }

  render() {
    const bars = this.state.barKeys.map(key => (
      <Bar dataKey={key} fill={randomMC.getColor()} key={key} />
    ));
    return (
      <MyResponsiveContainer>
        <ResponsiveContainer>
          <BarChart
            height={300}
            width={2000}
            barSize={100}
            data={this.props.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <Brush dataKey="country" height={30} stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" />
            {bars}
          </BarChart>
        </ResponsiveContainer>
      </MyResponsiveContainer>
    );
  }
}

SalesChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

SalesChart.defaultProps = {
  data: [],
};

export default SalesChart;
