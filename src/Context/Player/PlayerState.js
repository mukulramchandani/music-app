import React, { useReducer } from "react";
import PlayerReducer from "./PlayerReducer";
import PlayerContext from "./PlayerContext";


const PlayerState = ({ children })=>{
    const initialState = {
        isLoading:false,
        isPlaying : false,
        isPlayerVisible : false,
        currentIndex :0,
        songName:"",
        albumName:"",
        playlist:[
            {
              "url": "https://www.kozco.com/tech/organfinale.mp3",
              "name": "test1"
            },
            {
              "url": "https://www.kozco.com/tech/32.mp3",
              "name": "test2"
            },
            {
              "url": "https://www.kozco.com/tech/32.mp3",
              "name": "test3"
            },
            {
              "url": "https://www.kozco.com/tech/organfinale.mp3",
              "name": "test1"
            }
          ],
    };

    const [state,dispatch] = useReducer(PlayerReducer,initialState);

    const setPlaying = (status)=>{
        dispatch({
            type:"SET_PLAYING",
            payload:status
        })
    }
    const setPause = ()=>{
        dispatch({
            type:"SET_PAUSE",
        })
    }

    const setLoading = (status) => {
        dispatch({
            type:"SET_LOADING",
            payload:status,
        })
    }

    const setCurrentIndex = (index) => {
        dispatch({
            type:"SET_CURRENT_INDEX",
            payload:index,
        })
    }

    const setPlaylist = (playlist) => {
        dispatch({
            type:"SET_PLAYLIST",
            payload:playlist
        })
    }

    const setPlayerVisibility = (status) => {
        dispatch({
            type:"SET_PLAYER_VISIBILITY",
            payload:status
        })
    }



    return (
        <PlayerContext.Provider
        value={{
            isLoading : state.isLoading,
            isPlaying:state.isPlaying,
            isPlayerVisible:state.isPlayerVisible,
            currentIndex:state.currentIndex,
            songName:state.songName,
            albumName:state.albumName,
            playlist:state.playlist,
            setPlaying,
            setPause,
            setLoading,
            setCurrentIndex,
            setPlaylist,
            setPlayerVisibility
        }}
        >
        {children}
        </PlayerContext.Provider>
    )

}

export default PlayerState;