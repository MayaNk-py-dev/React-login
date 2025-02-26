import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
const mock = new MockAdapter(axios);

mock.onPost("http://localhost:8080/api/v1/auth/login").reply(200, {
    token: "fake_token"
});

export const loginUser = createAsyncThunk(
    "users/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const params = {
                email: email,
                password: password
            };
            let link = "http://localhost:8080/api/v1/auth/authenticate";
            const response = await axios.post(link, params, {
                headers: { "Content-Type": "application/json" }
            });
            let data = await response.data;
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                return data;
            } else {
                return thunkAPI.rejectWithValue(data);
            }
        } catch (e) {
            console.log("Error", e.response?.data || e.message); // Adding a safety check for undefined error response
            return thunkAPI.rejectWithValue(e.response?.data || { message: e.message });
        }
    }
);


export const LoginSlice = createSlice({
    name: "login",
    initialState: {
        token: "",
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: ""
    },
    reducers: {
        clearState: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isFetching = false;

            return state;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.token = payload.token;
                state.isFetching = false;
                state.isSuccess = true;
                return state;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.isFetching = false;
                state.isError = true;
                state.errorMessage = payload.message
            })
            .addCase(loginUser.pending, (state) => {
                state.isFetching = true;
            })
    }
});

export const { clearState } = LoginSlice.actions;

export const loginSelector = (state) => state.login;