import { usersMapped } from "../helpers";

export const fetchUsers = async () => {
  const localUsers = localStorage.getItem("users");

  if (localUsers) {
    return JSON.parse(localUsers);
  }

  const url = "https://jsonplaceholder.typicode.com/users";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Http error! Status: ${response.status}`);
    }
    const rawData = await response.json();
    const data = usersMapped(rawData);
    localStorage.setItem("users", JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error(`Error fetching users: ${error.message}`);
  }
};
