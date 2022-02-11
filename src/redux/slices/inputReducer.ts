import { createSlice } from '@reduxjs/toolkit';

interface initStateInputs {
  email: string,
  password: string
}

const initState : initStateInputs = {
  email: '',
  password: ''
}  
const inputSlice = createSlice({
  name: 'inputSlice',
  initialState : initState,
  reducers: {
     setEmail (state, action) {
       state = {...state, ...state.email = action.payload}
     },
     setPassword (state, action) {
      state = {...state, ...state.password = action.payload}
    },
  }
})

export const {setEmail, setPassword} = inputSlice.actions;

export default inputSlice.reducer;