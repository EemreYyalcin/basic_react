import {combineReducers} from 'redux';
import {GoogleApiReducer} from "./GoogleApiReducer";
import {VideoReducer} from "./VideoReducer";

export default combineReducers({
    loginGoogle: GoogleApiReducer,
    videoUrls: VideoReducer
});