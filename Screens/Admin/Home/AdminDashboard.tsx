import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  ScrollView,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import Footer from '../../../Components/Footer/Footer';
import GenreChart from '../../../Components/Charts/PieChart/GenreChart';
import BezierChart from '../../../Components/Charts/LineChart/BezierChart';
import EventsCount from '../../../Components/EventCount/EventsCount';

function AdminDashboard() {
  return (
    <GestureHandlerRootView>
      <ScrollView
        style={{ backgroundColor: '#fff' }}
        showsVerticalScrollIndicator={false}
      >
        <EventsCount />
        <Text style={styles.sectionHeading}>Registration Overview</Text>
        <BezierChart />
        <Text style={styles.sectionHeading}>Events Genre</Text>
        <View style={styles.genreChartContainer}>
          <GenreChart />
        </View>
        <Footer />
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#f0f1f2',
    borderRadius: 12,
    height: 100,
    width: (Dimensions.get('window').width - 16 * 3) / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 330,
  },
  imageBgContainer: {
    borderWidth: 1,
    borderColor: '#f0f1f2',
    borderRadius: 12,
    backgroundColor: '#ff1a1a',
    marginTop: 16,
    height: 100,
    width: (Dimensions.get('window').width - 16 * 3) / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: '700',
    paddingTop: 10,
  },
  titleText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '700',
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  genreChartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
});

export default AdminDashboard;
