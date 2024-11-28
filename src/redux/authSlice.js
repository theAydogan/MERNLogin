import { createSlice } from '@reduxjs/toolkit';

// Get user from localStorage if it exists
const userFromStorage = JSON.parse(localStorage.getItem('user'));
let initialUser = null;

if (userFromStorage) {
    initialUser = userFromStorage;
}

const initialState = {
    user: initialUser,
    isLoading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

export const { loginSuccess, logout, setError } = authSlice.actions;
export default authSlice.reducer; 