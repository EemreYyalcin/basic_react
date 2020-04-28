export const signState = (auth) => {
    return {
        type: 'SIGN_STATE',
        payload: auth
    };
};


export const videoSelect = (selectedVideo) => {
    return {
        type: 'VIDEO_SELECT',
        payload: selectedVideo
    };
};

