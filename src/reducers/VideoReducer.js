let selectedVideo = null;

export const VideoReducer = (state = null, action) => {
    if (action.type === 'VIDEO_SELECT') {
        selectedVideo = action.payload;
        // return selectedVideo;
        console.log('REDUCER:', action.payload);
        return {...state, selectedVideo};
    }
    return state;
};