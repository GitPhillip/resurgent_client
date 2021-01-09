import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user:{},
    loggedIn: false
}
export const userSlice = createSlice({
    name: 'user', //The name of our state
    initialState,
    reducers:{
         //Reducer to set the user
         setUserSession: (state,action) => {

            const {user_id, user_email, user_type, user_firstname, user_surname, user_company_id } = action.payload;

            console.log('Payload Arrived maboi: '+ user_id);
            console.log('State <<<<<<<<<<<<<<<. '+state.user.user_id)
            //if(state.user.user_id !== user_id){
                //Update the state
                state.user.user_id = user_id;
                state.user.user_email = user_email;
                state.user.user_type = user_type;
                state.user.user_firstname = user_firstname;
                state.user.user_surname = user_surname;
                state.user.user_company_id = user_company_id;
                state.loggedIn = true;

            //}
        },
        //reducer to clear the state and all it's details
        deleteUserSession: (state,action) => {
            const { user_id } = action.payload;
            //check if the user exists
            if(state.user.user_id === user_id){
                state = initialState
            }
        },
        updateUserSession: (state,action) =>{
            const {user_id, user_firstname, user_surname, user_email, user_role } = action.payload;
            if(state.user.user_id === user_id){
                state.user.user_firstname = user_firstname;
                state.user.user_surname = user_surname;
                state.user.user_email = user_email;
                state.user_role = user_role;
            }
        }
    }
});

//Export the slice
export default userSlice.reducer;

//Export the reducers
export const {setUserSession, deleteUserSession, updateUserSession} = userSlice.actions

