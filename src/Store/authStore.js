import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: (tk) =>
    set((state) => ({
      token: tk,
    })),
  register: (username, email, password) => set((state) => ({})),
  setUser: (user) => set({ user }),
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    }),
}));
