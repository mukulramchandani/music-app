import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';


export default function UserProfileScreen(props){

    return(
        <View style={styles.container}>
        <Text> Profile Screen </Text>
        <Button title="Go To Home" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });