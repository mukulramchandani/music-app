import { StatusBar } from 'expo-status-bar';
import React, { useContext , useEffect,useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity,ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';

import { FontAwesome5, AntDesign, Fontisto } from '@expo/vector-icons';

import { Modalize } from 'react-native-modalize';

import { Portal } from 'react-native-portalize';
import PlayerContext from '../../Context/Player/PlayerContext';

import Slider from '@react-native-community/slider';
import { Alert } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Image } from 'react-native';


const { height, width } = Dimensions.get("screen");


export default function PlayerScreen(props) {

  const playerContext = useContext(PlayerContext);

  const { isPlaying, setPlaying, setPause, setLoading, isLoading , playlist , setCurrentIndex,currentIndex,isPlayerVisible,setPlayerVisibility} = playerContext;

  const [sound, setSound] = React.useState();

  const [finishStatus, setFinishStatus] = React.useState(false);

  const [playingStatus, setPlayingStatus] = React.useState(false);

  //const [currentIndex, setCurrentIndex] = React.useState();

  const [songsArray,setSongsArray] = useState(playlist);

  const [durationMillis,setDurationMillis] = useState(1);

  const [positionMillis,setPositionMillis] = useState(0);

  const [playableDurationMillis,setPlayableDurationMillis] = useState(0);



 // console.log("Index and playing status", currentIndex,isPlaying);

 useEffect(()=>{

  if(isPlayerVisible){
    onOpen();
  }

 },[isPlayerVisible])



  useEffect(()=>{
    setSongsArray(playlist);
    setCurrentIndex(currentIndex);
  },[playlist]);

  async function playSound() {
    if (sound) {
      try {
        await sound.playAsync();
        setPlaying(true);
      } catch (e) {
        console.log("Play Error");
      }
    }
  }

  async function pauseSound() {
    if (sound) {
      try {
        await sound.pauseAsync();
        setPlaying(false);
      } catch (e) {
        console.log("Pause Error");
      }
    }
  }

  async function playNext() {

    if(isLoading)
      return;

    console.log("play next", currentIndex);
    if (currentIndex < songsArray.length - 1) {
      setPlayingStatus(false);
      setPlaying(false);
      await unloadSound();
      setCurrentIndex(currentIndex + 1);
    }
  }

  async function playPrevious() {

    if(isLoading)
      return;

    console.log("play prev", currentIndex);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setPlayingStatus(false);
      setPlaying(false);
    }
  }

  React.useEffect(() => {
    if (currentIndex > 0) {
      unloadSound();
      onPlayerLoad(currentIndex, true);
      setPlayingStatus(true);
      setPlaying(true);
    } else if (currentIndex === 0 && !sound) {
      unloadSound();
      onPlayerLoad(currentIndex, false);
    } else if (currentIndex === 0 && sound) {
      unloadSound();
      if (finishStatus) {
        onPlayerLoad(currentIndex, false);
        setFinishStatus(false);
      } else {
        onPlayerLoad(currentIndex, true);
        setPlayingStatus(true);
        setPlaying(true);
      }
    }
    console.log("current-index-Useeffect", currentIndex, !sound);

  }, [currentIndex]);

  const _playbackStatusUpdate = (playbackObject) => {
    //console.log(playbackObject);

    if(!playbackObject.isLoaded || playbackObject.isBuffering){
      setLoading(true);
    }else{
      setLoading(false);
    }


    if(playbackObject.isLoaded){
      setDurationMillis(playbackObject.durationMillis);
      setPositionMillis(playbackObject.positionMillis);
      //setPlayableDurationMillis(playableDurationMillis);
    }

    if (playbackObject && playbackObject.didJustFinish) {
      console.log('currentIndex', currentIndex);
      setFinishStatus(true);
      setPlayingStatus(false);
      setPlaying(false);

      if (currentIndex !== songsArray.length - 1)
        setCurrentIndex(currentIndex + 1);
      else
        setCurrentIndex(0);
      console.log(playbackObject.didJustFinish, "didJustFinish");

    }

  }

  const unloadSound = async () => {
    console.log('Unloading');
    try {
      await sound.unloadAsync();
      //setPlaying(false);
    } catch (error) {
      console.log("Unloading Error!")
    }
  }


  const onPlayerLoad = async (index, shouldPlay) => {

    if(songsArray[index].url === "fileMissing"){
      ToastAndroid.show("Song Not Available Yet",3000);
      await playNext();
      return;
    }

    try {
      setLoading(true);
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      });

      const { sound } = await Audio.Sound.createAsync(
        { uri: songsArray[index].url }, { shouldPlay: shouldPlay }, _playbackStatusUpdate, false);


      sound.setOnPlaybackStatusUpdate(_playbackStatusUpdate);
      setLoading(false);

      if(shouldPlay){
        setPlaying(true);
      }

      setSound((p) => sound);
      console.log("loaded player with song");

    } catch (error) {
      console.log(error);
    }
  }

  const handlePlayPause = () => {

    if(isLoading)
      return;
    setPlayingStatus(!playingStatus);
    setPlaying(!isPlaying);
    console.log("play-pause");
    if (!sound && !isPlaying && currentIndex === 0) {
      onPlayerLoad(currentIndex, true);
    }
  }

  React.useEffect(() => {
    if (sound && isPlaying) {
      playSound();
    } else if (sound && !isPlaying) {
      pauseSound();
    } else {
      console.log("Song is not loaded yet.");
    }
  }, [isPlaying]);

  React.useEffect(() => {
    try {
      if (!sound)
        setCurrentIndex(0);
      //onPlayerLoad(currentIndex,false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  React.useEffect(() => {
    if (finishStatus && currentIndex < songsArray.length - 1) {
      //console.log("sound updated");
      //unloadSound();
      setFinishStatus(false);
    }
  }, [finishStatus]);

  const modalRef = React.useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const onClose = () => {
    modalRef.current?.close();
  };

  const onSliderChange = async (n) => {
    //setLoading(true);
    await sound.setPositionAsync(n);
    setLoading(false);
  }

  return (
    <>
      {
        !isPlaying ?
        <TouchableOpacity style={{ backgroundColor: "#fff" }}>
        <FontAwesome5 name="play-circle" size={60} color="#EA5E3D" onPress={onOpen} />
      </TouchableOpacity> :
      <TouchableOpacity style={{ backgroundColor: "#fff" }}>
        <FontAwesome5 name="pause-circle" size={60} color="#EA5E3D" onPress={onOpen} />
      </TouchableOpacity>
      }
      <Portal>
        <Modalize ref={modalRef}
          modalHeight={height / 2}
          onClosed={()=>setPlayerVisibility(false)}
        >
          <View style={styles.playerContainer}>
          <Fontisto name="applemusic" size={44} color="#623235" />
          {playlist.length && <Text style={{color:"#623235",alignSelf:"center",padding:5,fontSize:20,textAlignVertical:"center"}}>{playlist[currentIndex]["name"]}</Text>}
            { isLoading ?
            <ActivityIndicator  size="large" color="#EA5E3D" /> :
            <Slider
            style={{width: "75%", height: 50}}
            minimumValue={0}
            maximumValue={durationMillis}
            value={positionMillis}
            minimumTrackTintColor="#EA5E3D"
            maximumTrackTintColor="gray"
            thumbTintColor="#623235"
            onValueChange={onSliderChange}
            />
          }

            <View style={styles.mainButtons}>
              <AntDesign name="stepbackward" size={35} color="#623235" onPress={() => playPrevious()} />

              {
                !isPlaying ?
                  <FontAwesome5 name="play" size={50} color="#EA5E3D" onPress={() => handlePlayPause()} />
                  :
                  <FontAwesome5 name="pause" size={50} color="#EA5E3D" onPress={() => handlePlayPause()} />
              }
              <AntDesign name="stepforward" size={35} color="#623235" onPress={() => playNext()} />

            </View>
            <FontAwesome5 name="chevron-circle-down" size={45} color="gray" onPress={onClose} />
          </View>
        </Modalize>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    height: height / 2
  },
  mainButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "70%",
    margin: 20
  }
});
