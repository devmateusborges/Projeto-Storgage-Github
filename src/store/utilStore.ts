import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AppUser {
  id: string;
  name: string;
}

const arrUser: AppUser[] = [];

const util = createSlice({
  name: "util",
  initialState: {
    perfil: arrUser,
    userSelect: "devmateusborges",
    loading: true,
  },

  reducers: {
    addProfileUsers(state, action: PayloadAction<AppUser>) {
      const result = localStorage.getItem("profile");
      const data = result ? JSON.parse(result) : [];

      const newData = [...data, action.payload];

      localStorage.setItem("profile", JSON.stringify(newData));

      state.perfil.push(action.payload);
    },
    removeProfileUseres(state, action: PayloadAction<string>) {
      const result = localStorage.getItem("profile");
      const data: AppUser[] = result ? JSON.parse(result) : [];

      const filter = data.filter((item) => item.id != action.payload);
      localStorage.setItem("profile", JSON.stringify(filter));
      state.perfil = filter;
    },
    addUserSelect(state, action: PayloadAction<string>) {
      state.userSelect = action.payload;
      localStorage.setItem("selectUser", action.payload);
    },
    Loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { addProfileUsers, removeProfileUseres, addUserSelect, Loading } =
  util.actions;

export default util.reducer;
