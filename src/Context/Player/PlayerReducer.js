export default (state,action) => {

    switch (action.type) {
        case "SET_PLAYING":
            //console.log(state.isPlaying,"Will Set Playing to "+action.payload);
            return {
                ...state,
                isPlaying:action.payload,
                isLoading:false,
            }
        case "SET_PAUSE":
            //console.log(state.isPlaying,"Will Set Playing to false");
            return {
                ...state,
                isPlaying:false,
                isLoading:false,
            }
        case "SET_LOADING":
            //console.log(state.isLoading,"setting loading "+action.payload);
            return {
                ...state,
                isLoading:action.payload,
            }
        case "SET_CURRENT_INDEX":
            //console.log(state.currentIndex,`Setting index to ${action.payload}`);
            return {
                ...state,
                currentIndex:action.payload,
            }
        case "SET_PLAYLIST":
            return {
                ...state,
                playlist:action.payload
            }
        case "SET_PLAYER_VISIBILITY":
            return {
                ...state,
                isPlayerVisible : action.payload
                }
        default:
            break;
    }
}