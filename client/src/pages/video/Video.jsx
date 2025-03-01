import "video-react/dist/video-react.css";
import styles from "./Video.module.scss";
import useLike from "../../api/useLike";
import useVideo from "../../api/useVideo";
import { useEffect, useState } from "react";
import { errorToast } from "../../lib/toast";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import LoadingScreen from "../../components/loadingScreen/LoadingScreen";

const Video = () => {
  const { videoLoading, getVideoById } = useVideo();
  const { toggleVideoLike, getVideoLikedStatus, likeLoading } = useLike();
  const [video, setVideo] = useState(null);
  const [like, setLike] = useState(false);
  const { videoId } = useParams();

  const getVideo = () => {
    getVideoById(videoId, (res, err) => {
      if (err) {
        errorToast("Error loading Video");
        return;
      }
      setVideo(res.data);
    });
  };

  const toggleVLike = () => {
    toggleVideoLike(videoId, (res, err) => {
      if (err) {
        errorToast("Error toggling like");
        return;
      }
      setLike(res.data);
    });
  };

  const getVideoLikeStatus = () => {
    getVideoLikedStatus(videoId, (res, err) => {
      if (err) {
        errorToast("Error checking like status of the video");
        return;
      }
      setLike(res.data);
    });
  };

  useEffect(() => {
    getVideo();
    getVideoLikeStatus();
  }, [videoId]);

  if (videoLoading || likeLoading || !video) {
    return <LoadingScreen />;
  }

  return (
    <div className={styles.video}>
      <div className={styles.videoControls}>
        <video controls className={styles.videoPlayer}>
          <source src={video?.videoFile} type="video/mp4" />
        </video>
        <div className={styles.controller}>
          <div>
            <div className={styles.details}>
              <p>{video?.title}</p>
              <p>
                {video?.views} Views |{" "}
                {formatDistanceToNow(new Date(video.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
            <div className={styles.buttons}>
              <div className={styles.likeDislike} onClick={toggleVLike}>
                <img
                  src={
                    like
                      ? "../../../src/assets/like.svg"
                      : "../../../src/assets/thumbs-up.svg"
                  }
                  alt="like"
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Video;
