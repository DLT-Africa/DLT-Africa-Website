import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authService from "./authService";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  sendingEmail: false,
  emailSent: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sendAutomatedEmail = createAsyncThunk(
  "auth/sendAutomatedEmail",
  async (userData, thunkAPI) => {
    try {
      return await authService.sendAutomatedEmail(userData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    RESET(state) {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
      state.sendingEmail = false;
      state.emailSent = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.success("Registration Successful");
        console.log(action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        toast.error(action.payload);
      })

      .addCase(sendAutomatedEmail.pending, (state) => {
        state.sendingEmail = true;
      })
      .addCase(sendAutomatedEmail.fulfilled, (state, action) => {
        state.sendingEmail = true;
        state.emailSent = true;
        state.message = action.payload;
        toast.success(action.payload);
      })
      .addCase(sendAutomatedEmail.rejected, (state, action) => {
        state.sendingEmail = false;
        state.emailSent = false;
        state.message = action.payload;
        toast.success(action.payload);
      });
  },
});

export const { RESET } = authSlice.actions;

export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
