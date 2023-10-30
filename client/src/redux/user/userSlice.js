import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Videos, userSignIn } from "./userApis";

export const UserSignInApi = createAsyncThunk("user/signIn", async (obj) => {
  const res = await userSignIn(obj);
  return res.data;
});

export const FindAllVidesApi = createAsyncThunk("user/videos", async () => {
  const res = await Videos();
  return res.data;
});

const initialState = {
  userInfo: null,
  channel: null,
  Action: false,
  video: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createChannel(state, action) {
      state.channel = action.payload;
    },
    changeTrueAction(state, action) {
      state.Action = true;
    },
    changeFalseAction(state, action) {
      state.Action = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(UserSignInApi.fulfilled, (state, action) => {
      state.userInfo = action.payload.result;
      state.channel = action.payload.channel;
    });
    builder.addCase(FindAllVidesApi.fulfilled, (state, action) => {
      state.video = action.payload;
    });
  },
});

export const { createChannel, changeTrueAction, changeFalseAction } =
  UserSlice.actions;
export default UserSlice.reducer;
