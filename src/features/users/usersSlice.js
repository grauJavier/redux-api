import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const URL = 'https://randomuser.me/api/?results=5';
const getUsers = createAsyncThunk('users/getUsers', async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  users: [],
  isLoading: true,
  error: undefined,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: () => {
      return getUsers;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export { getUsers };
export default usersSlice.reducer;
