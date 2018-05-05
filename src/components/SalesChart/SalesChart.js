import React from 'react';
import PropTypes from 'prop-types';
import {
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

class SalesChart extends React.Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data.length > 0 && nextProps.data !== prevState.data) {
      const getYearKeys = (acc, key) => {
        const numericalKey = Number(key);
        if (Number.isFinite(numericalKey)) {
          return [...acc, key];
        }

        return acc;
      };
      const barKeys = Object.keys(nextProps.data[0]).reduce(getYearKeys, []);

      return { barKeys };
    }

    return null;
  }

  state = {
    barKeys: [],
  };

  render() {
    const bars = this.state.barKeys.map(key => (
      <Bar dataKey={key} fill={randomMC.getColor()} key={key} />
    ));
    return (
      <BarChart
        width={1450}
        height={300}
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
