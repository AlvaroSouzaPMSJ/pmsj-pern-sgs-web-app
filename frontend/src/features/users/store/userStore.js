import { create } from "zustand";

export const useUserStore = create((set) => ({
  currentUser: null,
  userList: [],
  isLoading: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  setUserList: (users) => set({ userList: users }),
  clearUser: () => set({ currentUser: null }),
}));