import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View,ScrollView} from 'react-native';

import HomeElementCard from '../../Components/HomeElementCard';

export default function HomeScreen(props) {




  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
    <HomeElementCard navigation={props.navigation} title="Albums" imagePath={require("../../../assets/images/ssd1.jpg")} link="Albums"/>

    <HomeElementCard navigation={props.navigation} title="All Bhajans" imagePath={require("../../../assets/images/ssd3.jpg")} link="Lyrics" />

    <HomeElementCard navigation={props.navigation} title="Satsang" imagePath={require("../../../assets/images/ssd2.jpeg")} link="Lyrics" />

    <HomeElementCard navigation={props.navigation} title="Lyrics" imagePath={require("../../../assets/images/ssd1.jpg")} link="Lyrics" />

    <HomeElementCard navigation={props.navigation} title="Top 50" imagePath={require("../../../assets/images/ssd2.jpeg")} link="Lyrics"/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});