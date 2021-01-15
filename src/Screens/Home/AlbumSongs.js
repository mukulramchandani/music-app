import React,{ useEffect,useState,useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { DB , Storage} from "../../Firebase/firebase";
import { StyleSheet, Text, View,ScrollView , LogBox, SafeAreaView,FlatList, ActivityIndicator,Image} from 'react-native';
import PlayerContext from '../../Context/Player/PlayerContext';
import { TouchableOpacity } from 'react-native';
import { ToastAndroid } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

LogBox.ignoreLogs(['Setting a timer']);




export default function AlbumSongs(props){


    const [isAlbumSongsLoded,setAlbumSongsLoaded] = useState(false);

    const [playlistObject,setPlaylistObject] = useState([]);

    const playerContext = useContext(PlayerContext);

    const {  setPlaying, playlist ,currentIndex,setPlaylist,setCurrentIndex,setPlayerVisibility} = playerContext;

    useEffect(()=>{
        if(playlistObject.length){
            setPlaylist(playlistObject);
            setPlaying(false);
        }
    },[playlistObject]);

    const getAlbumSongs = async () => {

        let playlistLocal = [];


        var albumRef = DB.collection("bhajans");

        var query = albumRef.where("Album" , "==" , props.route.params.albumName);

        await query.get().then((querySnapshot)=>{
            console.log(querySnapshot.docs.length);
            var count = 0;
            //Add a not found error message --IMPORTANT
             querySnapshot.forEach(async (doc)=>{
              //console.log(doc.data());
              let storageRef = Storage.ref();
               await storageRef.child(doc.data()["Location"]).getDownloadURL().then((url)=> {
                count++;
                 console.log(url);
                let doct = doc.data();
                doct["URL"] = url;
                let song = {"name":doct["Bhajan"],url:url}
                playlistLocal.push(song);
                //console.log(doct);
                console.log(count);
                if(count == querySnapshot.docs.length)
                {
                  setPlaylistObject(playlistLocal);
                  setAlbumSongsLoaded(true);
                }

              }).catch((e)=>{
                let song = {"name":doc.data()["Bhajan"],url:'fileMissing'}
                playlistLocal.push(song);
                //listData.push(doc.data());

                console.log(e.message);
                count++;
                if(count == querySnapshot.docs.length)
                {
                    setPlaylistObject(playlistLocal);
                    setAlbumSongsLoaded(true);



                }
              });

            });
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
        });




    }

    useEffect(()=>{
        getAlbumSongs();
    },[])


    return (
        <SafeAreaView style={styles.container}>

        <View>

        <Image style={styles.albumImage} source={props.route.params.albumImage} />

        <Text style={styles.albumTitle}>{props.route.params.albumName}</Text>
        <Divider style={{borderWidth:1,borderColor:"gray"}}/>

        </View>
        {
            isAlbumSongsLoded && playlistObject.length ?
            <FlatList
            data={playlistObject}
            renderItem={({item,index})=>(
                <TouchableOpacity
                style={{height:50,width:"100%",display:"flex",flexDirection:"row",justifyContent:"space-between",padding:10,backgroundColor:"#f7deb7",marginBottom:5}}
                onPress={()=>{
                    if(item.url !== "fileMissing"){
                    setCurrentIndex(index);
                    setPlayerVisibility(true);
                    }else{
                        ToastAndroid.show("Song Not Available Yet.",3000);
                    }
                }}
                >
                <Text style={{color:"#623235",alignSelf:"center",padding:5,fontSize:15,textAlignVertical:"center"}}>{item.name}</Text>
                <Text style={{color:"#623235",alignSelf:"center",padding:5}}>
                <FontAwesome5 name="play" size={15} color="#EA5E3D"/>
                </Text>
                </TouchableOpacity>
                )}

            initialNumToRender={3}


            keyExtractor={(item,index)=>item.name}

            ItemSeparatorComponent={()=><Divider/>}

            />
            : <ActivityIndicator size="large" color="black"/>
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
    albumImage:{
        width:200,
        height:200,
        alignSelf:"center",
        padding:10

    },
    albumTitle:{
        fontSize:25,
        color:"#623235",
        alignSelf:"center",
        textAlign:"center",
        padding:10
    }
  });
