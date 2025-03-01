import { useState } from "react";
import { axios_instance } from "../lib/axios/axios";
import { errorToast } from "../lib/toast";

const useUser = () => {
  const [userLoading, setUserLoading] = useState(false);

  const getUserById = async (callback) => {
    setUserLoading(true);
    try {
      const response = await axios_instance.get("/users");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast("Error getting user");
        setUserLoading(false);
        return;
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error?.response?.data);
    } finally {
      setUserLoading(false);
    }
  };

  const register = async (payload, callback) => {
    setUserLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", payload.username);
      formData.append("fullName", payload.fullName);
      formData.append("email", payload.email);
      formData.append("password", payload.password);
      formData.append("avatar", payload.avatar);
      formData.append("coverImage", payload.coverImage);

      const response = await axios_instance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(response?.data?.message || "Failed to register");
        setUserLoading(false);
        return;
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error?.response?.data);
    } finally {
      setUserLoading(false);
    }
  };

  const login = async (
    payload,
    callback,
  ) => {
    setUserLoading(true);
    try {
      const response = await axios_instance.post("/users/login", payload);

      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast(response?.data?.message || "Failed to login.");
        setUserLoading(false);
        return;
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error);
    } finally {
      setUserLoading(false);
    }
  };

  return {
    getUserById,
    userLoading,
    register,
    login
  };
};

export default useUser;