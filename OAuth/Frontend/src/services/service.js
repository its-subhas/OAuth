import axios from "axios";

export const register = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/register",
      {
        name,
        email,
        password,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/auth/getMe", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Get user error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};
