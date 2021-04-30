const initialState = {
    darkTheme : false , 
    user: {
        displayName : 'tonyy' , 
        email: null ,
        photoURL : null
    }
} ;


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_THEME' : 
            return {
                ...state , 
                darkTheme: !state.darkTheme
            }
        case 'SIGN_IN' : 
            return {
                ...state , 
                user : {
                    displayName: action.payload.displayName ,
                    email: action.payload.email ,
                    photoURL: action.payload.photoURL ,
                }
            }
        default:
            return state;
        }
}
