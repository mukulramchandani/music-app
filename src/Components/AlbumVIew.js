import React from 'react';

import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

export default function AlbumView(props){
    return (
    <TouchableOpacity style={styles.homeElement}
    onPress={()=>{
        props.navigation.navigate(props.link,{albumName : props.title, albumImage:props.imagePath});
    }}
    key={props.id}
    >
    <Image style={styles.albumImage} source={props.imagePath} />

  <View style={styles.albumInfo}>
   <Text style={styles.homeElementText}>{props.title}</Text>

   <Text style={styles.homeElementText}>{props.totalBhajans} Bhajans | {props.year}</Text>

  </View>
  <Text style={styles.homeElementIcon}>
  <FontAwesome5 name="play-circle" size={25} color="#623235" />
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
      justifyContent:"space-between",
      borderColor:"#623235",
      borderWidth:0.7
    },
    homeElementIcon:{
      textAlignVertical:"center",
      paddingRight:20
    },
    homeElementText:{
      fontSize:20,
      fontWeight:"bold",
      textAlignVertical:"center",
      color:"#623235",
      padding:10
    },
    albumImage:{
      width:150,
      height:150,
      resizeMode:"cover",
      borderBottomLeftRadius:10,
      borderTopLeftRadius:10
    },
    albumInfo:{
        flexDirection:"column",
        width:"53%",
        //justifyContent:"center",
        alignContent:"center"

    }
  });