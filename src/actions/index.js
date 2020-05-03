export const signState = (auth) => {
    return {
        type: 'SIGN_STATE',
        payload: auth
    };
};


export const loadVideo = (index, urls) => {
    return {
        type: 'LOAD_VIDEO',
        payload: {index, urls}
    };
};

