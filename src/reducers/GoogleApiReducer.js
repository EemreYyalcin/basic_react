let auth = null;

export const GoogleApiReducer = (state = null, action) => {
    if (action.type === 'SIGN_STATE') {
        auth = action.payload;
        return {...state, auth};
    }
    return state;
};