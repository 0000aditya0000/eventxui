import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

function BezierChart() {
  return (
    <LineChart
      data={{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
        datasets: [
          {
            data: [1000, 500, 300, 700, 100, 452],
          },
        ],
      }}
      width={Dimensions.get('window').width - 5 * 5}
      height={240}
      yAxisInterval={1}
      withOuterLines={false}
      withInnerLines={false}
      chartConfig={{
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 10) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '5',
          strokeWidth: '3',
          stroke: '#d6001c',
        },
        propsForHorizontalLabels: {
          fontWeight: 700,
          fontStyle: 'italic',
        },
        propsForVerticalLabels: {
          fontWeight: 700,
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16,
        alignItems: 'center',
      }}
    />
  );
}

export default BezierChart;
