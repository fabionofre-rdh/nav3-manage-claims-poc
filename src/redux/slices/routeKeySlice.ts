import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRouteKey: "",
};

const routeKeySlice = createSlice({
  name: "routeKey",
  initialState,
  reducers: {
    setCurrentRouteKey: (state, action) => {
      state.currentRouteKey = action.payload;
    },
  },
});

export const { setCurrentRouteKey } = routeKeySlice.actions;
export default routeKeySlice.reducer;
