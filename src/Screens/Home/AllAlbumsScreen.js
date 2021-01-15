import React,{ useEffect,useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View,ScrollView , LogBox, SafeAreaView,FlatList, ActivityIndicator} from 'react-native';

import { DB , Storage} from "../../Firebase/firebase";

import AlbumView from "../../Components/AlbumVIew";

import { SearchBar } from 'react-native-elements';



LogBox.ignoreLogs(['Setting a timer']);



export default function AllAlbumsScreen(props) {


  const [allAlbumsInfo,setAllAlbumsInfo] = useState(null);

  const [searchText,setSearchText] = useState('');

  const [filteredData,setFilteredData] = useState([]);






  const getAlbums = async () => {
    try {
      const albumsRef = DB.collection("albums");
      const snapshot = await albumsRef.get();
      let albumsInfo = [];
      snapshot.forEach(async (doc) => {
      let data = doc.data();
      try {
        Storage.ref().child(doc.data()["AlbumCoverImagePath"]).getDownloadURL().then((url)=>{
          data["url"] = url
        }).catch((e)=>{
          data["url"] = "https://firebasestorage.googleapis.com/v0/b/ssdb-c571a.appspot.com/o/album%2F132%20Sala%20Jashan%20e%20Melo%20III.jpg?alt=media&token=0b5ccd59-0f69-4911-b9ce-e8874a2eaeb9";
        });
      } catch (error) {
        console.log(error);
      }
        albumsInfo.push(data);
      })

      setAllAlbumsInfo(albumsInfo);
     // console.log(JSON.stringify(albumsInfo));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAlbums();
  },[]);

  const onSearchInput = (text) => {

    let output = allAlbumsInfo ?  allAlbumsInfo.filter((item)=>item.Album.includes(text)) : '';
    if(output)
    setFilteredData(output);
    else
    setFilteredData([]);

    setSearchText(text);
  }



    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
      <View>
      <SearchBar
        lightTheme={true}
        onChangeText={(text) => onSearchInput(text)}
        searchIcon={{size:30}}
        value={searchText}
        onClear={(text) => onSearchInput('')}
        placeholder="Search All Albums.. | Try 'Sindhi Ladha'"
        containerStyle={{backgroundColor:"transparent"}}
        inputStyle={{color:"#623235"}}
        inputContainerStyle={{backgroundColor:"transparent"}}
      />
      </View>
      {
        allAlbumsInfo && searchText === '' ?
        <FlatList
        data={allAlbumsInfo}
        renderItem={({item,index})=>(

          <AlbumView
          title={item.Album}
          imagePath={{uri:item.url}}

          totalBhajans={item.TotalBhajans}
          year={item.Year}

          id={""+index}
          key={item.Album}

          link="AlbumSongs"

          navigation={props.navigation}

          />

        )}

        initialNumToRender={7}
        keyExtractor={(item,index)=>item.Album}

        />
        : !filteredData.length ?
        <ActivityIndicator size="large" color="black" />
        : null
      }

      {
        searchText != '' && searchText.length > 1 && filteredData && filteredData.length ?

        <FlatList
          data={filteredData}
          renderItem={({item,index})=>(

            <AlbumView
            title={item.Album}
            imagePath={{uri:item.url}}

            totalBhajans={item.TotalBhajans}
            year={item.Year}

            id={""+index}
            key={item.Album}

            link="AlbumSongs"

            navigation={props.navigation}

            />
          )}

          initialNumToRender={7}
          keyExtractor={(item,index)=>item.Album}
        />

        :null


      }



      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignContent:"center",
    },
  });