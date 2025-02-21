import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const data = [
  {
    name: 'Music',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#ffffff',
    legendFontSize: 15,
  },
  {
    name: 'Educational',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#ffffff',
    legendFontSize: 15,
  },
  {
    name: 'Comedy',
    population: 8538000,
    color: '#ffffff',
    legendFontColor: '#ffffff',
    legendFontSize: 15,
  },
  {
    name: 'Art',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#ffffff',
    legendFontSize: 15,
  },
  {
    name: 'Other',
    population: 11920000,
    color: 'yellow',
    legendFontColor: '#ffffff',
    legendFontSize: 15,
  },
];

const chartConfig = {
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

function GenreChart() {
  return (
    <PieChart
      data={data}
      width={Dimensions.get('window').width - 5 * 5}
      height={220}
      chartConfig={chartConfig}
      accessor={'population'}
      backgroundColor={'#000000'}
      paddingLeft={'15'}
      center={[10, 0]}
      style={{
        marginVertical: 8,
        borderRadius: 16,
      }}
    />
  );
}

export default GenreChart;
