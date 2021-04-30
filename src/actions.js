export const toggleTheme = () => ({
    type: 'TOGGLE_THEME'
}) ;

export const login = (user) => ({
    type: 'SIGN_IN' , 
    payload: user
})