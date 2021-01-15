
 import { StatusBar } from 'expo-status-bar';
 import React from 'react';
 import { StyleSheet, Text, View,Button } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import HomeScreen from './src/Screens/Home/HomeScreen';
 import PlayerScreen from './src/Screens/Player/PlayerScreen';
 import LyricsScreen from './src/Screens/Lyrics/LyricsScreen';
 import MyMusicScreen from './src/Screens/Album/MyMusicScreen';
 import UserProfileScreen from './src/Screens/User/UserProfile';

import { FontAwesome5 , AntDesign,Ionicons } from '@expo/vector-icons';

import { Provider as PaperProvider } from 'react-native-paper';

import AllAlbumsScreen from "./src/Screens/Home/AllAlbumsScreen";

import { Host, Portal } from 'react-native-portalize';
import PlayerState from './src/Context/Player/PlayerState';
import AlbumSongs from './src/Screens/Home/AlbumSongs';





 const HomeStack = createStackNavigator();

 const MyMusicStack = createStackNavigator();

 const LyricsStack = createStackNavigator();


 function HomeStackScreen(){
   return(
     <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Albums" component={AllAlbumsScreen} />
        <HomeStack.Screen name="AlbumSongs" component={AlbumSongs} />
     </HomeStack.Navigator>
   )
 }

 function MyMusicScreenStackScreen(){
  return(
    <MyMusicStack.Navigator>
       <MyMusicStack.Screen name="MyMusic" component={MyMusicScreen} />
    </MyMusicStack.Navigator>
  )
}

function LyricsStackScreen(){
  return(
    <LyricsStack.Navigator>
       <LyricsStack.Screen name="Lyrics" component={LyricsScreen} />
    </LyricsStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const NullComponent = () => {
  return null;
}



 export default function App(){
   return (
    <PlayerState>
    <PaperProvider>
      <NavigationContainer>
      <Host>
          <Tab.Navigator tabBarOptions={{
            tabStyle:styles.tabBar,
            style:styles.tabContainer,
          }}>
              <Tab.Screen name="Home" component={HomeStackScreen}
              options={{
                tabBarLabel:(props)=>props.focused ?
                  (null)
                : (<Text style={styles.tabText}>Home</Text>),
                tabBarIcon:(props)=>props.focused ? (<FontAwesome5 name="home" size={40} color="#623235" />) : (<FontAwesome5 name="home" size={34} color="gray" />)
              }}
              />
              <Tab.Screen name="MyMusic" component={MyMusicScreenStackScreen}
              options={{
                tabBarLabel:(props)=>props.focused ?
                  (null)
                : (<Text style={styles.tabText}>MyMusic</Text>),
                tabBarIcon:(props)=>props.focused ? (<FontAwesome5 name="music" size={40} color="#623235" />) : (<FontAwesome5 name="music" size={34} color="gray" />)
              }}
              />
              <Tab.Screen name="Player" component={NullComponent} options={{
                tabBarButton:(props)=>( <PlayerScreen  />),
              }}/>
              <Tab.Screen name="Lyrics" component={LyricsStackScreen}
              options={{
                tabBarLabel:(props)=>props.focused ?
                  (null)
                : (<Text style={styles.tabText}>Lyrics</Text>),
                tabBarIcon:(props)=>props.focused ? (<FontAwesome5 name="pen-nib" size={40} color="#623235" />) : (<FontAwesome5 name="pen-nib" size={34} color="gray" />)
              }}
              />
              <Tab.Screen name="Settings" component={UserProfileScreen}
              options={{
                tabBarLabel:(props)=>props.focused ?
                  (null)
                : (<Text style={styles.tabText}>Settings</Text>),
                tabBarIcon:(props)=>props.focused ? (<FontAwesome5 name="user-cog" size={40} color="#623235" />) : (<FontAwesome5 name="user-cog" size={34} color="gray" />)
              }}
              />

          </Tab.Navigator>
          </Host>
      </NavigationContainer>
      </PaperProvider>
      </PlayerState>
   )
 }

 const styles = StyleSheet.create({
  tabTextFocused:{
    fontWeight:"bold",
  },
  tabText:{
    fontWeight:"100",
    color:"gray"
  },
  tabBar:{
    backgroundColor:"#fff",
  },
  tabContainer:{
    borderTopColor:"#623235",
    borderTopWidth:5,
    borderStyle:"solid",
    borderRadius:15,
    height:70
  }
});