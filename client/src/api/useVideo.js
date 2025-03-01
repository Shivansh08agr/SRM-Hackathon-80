import { useState } from "react";
import { axios_instance } from "../lib/axios";
import { errorToast } from "../lib/toast";

const useVideo = () => {
  const [videoLoading, setVideoLoading] = useState(false);
  const getAllVideos = async (callback) => {
    setVideoLoading(true);
    try {
      const response = await axios_instance.get("/videos");
      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast("Error getting videos");
        setVideoLoading(false);
        return;
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error?.response?.data);
    } finally {
      setVideoLoading(false);
    }
  };
  const getVideoById = async (videoId, callback) => {
    setVideoLoading(true);
    try {
      const response = await axios_instance.get(`/videos/c/${videoId}`);

      if (![200, 201].includes(response?.status || response?.data?.status)) {
        errorToast("Error getting video");
        setVideoLoading(false);
        return;
      }

      callback(response?.data, null);
    } catch (error) {
      callback(null, error?.response?.data);
    } finally {
      setVideoLoading(false);
    }
  };
  return{
    getAllVideos,
    videoLoading,
    getVideoById
  };
};

export default useVideo;
