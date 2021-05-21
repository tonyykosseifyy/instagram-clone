const initialState = {
    darkTheme : false ,
    user: {
        displayName : 'Tony kosseify' ,
        email: null ,
        photoURL : null ,
        gender : '' ,
        phoneNumber: '',
        location: ''
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
        case 'EDIT_ACCOUNT' :
          return {
            ...state ,
            user : {
              ...user ,
              email : action.playload.email ,
              phoneNumber: action.payload.phoneNumber ,
              location: action.playload.location ,
              gender: action.playload.gender
            }
          }
        default:
            return state;
        }
}
