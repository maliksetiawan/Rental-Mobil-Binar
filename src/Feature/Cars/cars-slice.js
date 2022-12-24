/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carsAPI from "./cars-api";

export const getAllCars = createAsyncThunk("customer/allCars", async (params, thunkAPI) => {
  try {
    const response = await carsAPI.getListCars(params);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue();
  }
});

export const getCarById = createAsyncThunk("customer/detailCar", async ({ id }, thunkAPI) => {
  try {
    const response = await carsAPI.getCarById(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue();
  }
});

const initialState = {
  listCars: [],
  detailCar: null,
};
const carsSlice = createSlice({
  name: "cars",
  initialState,
  extraReducers: {
    [getAllCars.fulfilled]: (state, action) => {
      state.listCars = action.payload;
    },
    [getAllCars.rejected]: (state, action) => {
      state.listCars = null;
    },
    [getCarById.fulfilled]: (state, action) => {
      state.detailCar = action.payload;
    },
    [getCarById.rejected]: (state, action) => {
      state.detailCar = null;
    },
  },
});

const { reducer, actions } = carsSlice;
export default reducer;
