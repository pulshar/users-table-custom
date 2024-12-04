import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { fetchUsers } from "../services/users";

const createUser = (user) => {
  return { id: crypto.randomUUID(), ...user };
};
const updateLocalStorage = (data) => {
  localStorage.setItem("users", JSON.stringify(data));
};

const useUsersStore = create()(
  devtools((set, get) => ({
    users: [],
    loading: false,
    error: null,
    searchTerm: "",
    userDetails: {},

    getUsers: async () => {
      set({ loading: true, error: null });
      try {
        const users = await fetchUsers();
        set({ users, loading: false });
      } catch (error) {
        set({ error: error.message, loading: false });
      }
    },
    addUser: (data) => {
      const newUser = createUser(data);
      set((state) => ({
        users: [...state.users, newUser],
      }));
      updateLocalStorage(get().users);
    },
    setUserDetails: (data) => {
      set(() => ({
        userDetails: data,
      }));
    },
    usernameExists: (username) => {
      return get().users.some((record) => record.username === username);
    },
    updateUser: (rowId, field, value) => {
      set((state) => ({
        users: state.users.map((user) =>
          user.id === rowId ? { ...user, [field]: value } : user,
        ),
      }));
      updateLocalStorage(get().users);
    },
    setSearchTerm: (value) => {
      set({ searchTerm: value });
    },
  })),
);

export default useUsersStore;
