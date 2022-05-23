import { createSlice } from "@reduxjs/toolkit";

export const accountsSlice = createSlice({
  name: "accounts",
  initialState: [],
  reducers: {
    setAccounts: (state, action) => {
      return action.payload;
    },
  },
});

export const { setAccounts } = accountsSlice.actions;

export default accountsSlice.reducer;
