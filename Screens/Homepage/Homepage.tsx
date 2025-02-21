import { Text, View } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import EventBanner from '../../Components/EventBanner/EventBanner';
import Footer from '../../Components/Footer/Footer';
import EventCard from '../../Components/EventCard/EventCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrendingCard from '../../Components/TrendingCard/TrendingCard';

const Homepage = ({ navigation }) => {
  return (
    <ScrollView
      style={{ backgroundColor: '#fff' }}
      showsVerticalScrollIndicator={false}
    >
      <EventBanner />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 18,
          paddingHorizontal: 10,
        }}
      >
        <Ionicons
          name='flame-outline'
          size={25}
          color='#45474D'
          style={{ paddingVertical: 4 }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            marginHorizontal: 5,
          }}
        >
          Trending Events
        </Text>
      </View>
      <TrendingCard navigation={navigation} />

      <View
        style={{
          flexDirection: 'row',
          marginTop: 30,
          marginBottom: 18,
          paddingHorizontal: 10,
        }}
      >
        <Ionicons
          name='browsers-outline'
          size={25}
          color='#45474D'
          style={{ paddingVertical: 4 }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: '700',
            marginHorizontal: 5,
          }}
        >
          Upcoming Events
        </Text>
      </View>
      <EventCard navigation={navigation} />
      <Text
        style={{
          fontSize: 21,
          fontWeight: '600',
          marginTop: 20,
          paddingHorizontal: 25,
          color: '#45474D',
        }}
      >
        CURATED & HANDPICKED EVENTS
      </Text>
      <Text
        style={{
          color: '#7a7c82',
          fontSize: 16,
          paddingHorizontal: 25,
          paddingTop: 20,
          paddingBottom: 30,
          textAlign: 'justify',
        }}
      >
        EventX aims to give you experiences in Delhi worth your time and money,
        and hopefully, encourage you to try something new. Be it curing
        post-work blues or making your weekend (more) awesome, you'll find it
        here. Explore live events (music, comedy, theatre, art); dining
        experiences; weekend getaways (treks, adventure, tours, travel, cycling,
        amusement parks); and live sport (cricket, football, kabaddi, badminton)
        matches; workshops (photography, marketing, cooking, baking, painting)
        and more.
      </Text>

      <Text
        style={{
          fontSize: 21,
          fontWeight: '600',
          marginTop: 20,
          paddingHorizontal: 25,
          color: '#45474D',
        }}
      >
        MUSIC EVENTS: GIGS & FESTIVALS
      </Text>
      <Text
        style={{
          color: '#7a7c82',
          fontSize: 16,
          paddingHorizontal: 25,
          paddingTop: 20,
          paddingBottom: 30,
          textAlign: 'justify',
        }}
      >
        Calling all music lovers! Watch your favourite artists, live - at
        festivals, club shows, gigs or concerts. EventX has the best curated
        music events, across genres: rock, metal, EDM, pop, fusion, hip-hop,
        jazz, classical, Bollywood and world, at some of the best live music
        venues in the country. EventX hosts several top properties, including
        Bacardi NH7 Weekender, Timeout, SulaFest, Mood Indigo, Gaana Crossblade
        Music Festival, Locals DISTRICT, Lager n Barrel, MPower Fest. Also look
        forward to superstars like Arijit Singh & AR Rahman hosting their tours
        here.
      </Text>

      <Text
        style={{
          fontSize: 21,
          fontWeight: '600',
          marginTop: 20,
          paddingHorizontal: 25,
          color: '#45474D',
        }}
      >
        COMEDY SHOWS: STANDUP & OPEN MIC
      </Text>
      <Text
        style={{
          color: '#7a7c82',
          fontSize: 16,
          paddingHorizontal: 25,
          paddingTop: 20,
          paddingBottom: 30,
          textAlign: 'justify',
        }}
      >
        Who doesn't enjoy a good laugh? You'll find the latest shows by the best
        Indian comedians - Zakir Khan, Kanan Gill, Biswa Kalyan Rath, Kenny
        Sebastian, Comicstaan finalists (Nishant Suri, Rahul Dua & others) and
        more, on EventX. Catch them doing tours of their specials, trying new
        material, hosting an open mic, and more. Catch the big names of comedy
        at Headliners and LOLStars; or shows to see up-and-coming comics
        enthrall audiences, and open mic events where you'll see and cheer on
        fresh talent! International legends like Russel Peters, Eddie Izzard &
        Bill Burr have ticketed here in the past.
      </Text>
      <Footer />
    </ScrollView>
  );
};

export default Homepage;
