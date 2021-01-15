import React from 'react';

import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeElementCard(props){
    return (
    <TouchableOpacity style={styles.homeElement}
    onPress={()=>{
        props.navigation.navigate(props.link);
    }}
    >
    <Image style={styles.albumImage} source={props.imagePath} />
  <Text style={styles.homeElementText}>
   {props.title}
  </Text>
  <Text style={styles.homeElementIcon}>
  <FontAwesome5 name="arrow-circle-right" size={25} color="#623235" />
  </Text>
  </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    homeElement: {
      height:150,
      display:"flex",
      width:"95%",
      alignSelf:"center",
      margin:15,
      backgroundColor:"#f7deb7",
      borderRadius:10,
      flexDirection:"row",
      justifyContent:"space-between"
    },
    homeElementIcon:{
      textAlignVertical:"center",
      paddingRight:20
    },
    homeElementText:{
      fontSize:35,
      fontWeight:"bold",
      textAlignVertical:"center",
      color:"#623235"
    },
    albumImage:{
      width:150,
      height:150,
      resizeMode:"cover",
      borderBottomLeftRadius:10,
      borderTopLeftRadius:10
    }
  });