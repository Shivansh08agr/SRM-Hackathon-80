import { useState } from "react";
import { axios_instance } from "../lib/axios";
import { errorToast } from "../lib/toast";

const useLike = () => {
    const [likeLoading, setLikeLoading] = useState(false);
    
    const toggleVideoLike = async (videoId, callback) => {
      setLikeLoading(true);
      try {
        const response = await axios_instance.post(`/likes/toggle-video-like/${videoId}`);
  
        if (![200, 201].includes(response?.status || response?.data?.status)) {
          errorToast("Error toggling like");
          setLikeLoading(false);
          return;
        }
  
        callback(response?.data, null);
      } catch (error) {
        callback(null, error?.response?.data);
      } finally {
        setLikeLoading(false);
      }
    };
    const getVideoLikedStatus = async (videoId, callback) => {
      setLikeLoading(true);
      try {
        const response = await axios_instance.get(`/likes/get-video-liked-status/${videoId}`);
  
        if (![200, 201].includes(response?.status || response?.data?.status)) {
          errorToast("Error getting like status of the video");
          setLikeLoading(false);
          return;
        }
  
        callback(response?.data, null);
      } catch (error) {
        callback(null, error?.response?.data);
      } finally {
        setLikeLoading(false);
      }
    };
    return{
      toggleVideoLike,
      likeLoading,
      getVideoLikedStatus
    };
  };
  
  export default useLike;