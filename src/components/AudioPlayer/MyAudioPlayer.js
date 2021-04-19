import React, { useEffect, useContext, useState, useRef } from "react";
import "./styles/app.scss";
import Player from "./components/Player";
import axios from "../../axios";
import firebaseStorage from "../../base.js";
import UserContext from "../.././context/UserContext";
const MyAudioPlayer = ({ filename, postId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [songInfo, setSongInfo] = useState({
    currTime: 0,
    duration: 0,
    animationPercentage: 0,
    volume: 0.5,
  });
  const [fileURL, setFileURL] = useState(undefined);
  const storageRef = firebaseStorage.storage().ref();
  const fileRef = storageRef.child(filename);
  const { userData } = useContext(UserContext);
  useEffect(() => {
    const fetchURL = async () => {
      setFileURL(await fileRef.getDownloadURL());
    };
    fetchURL();
  }, [fileRef]);

  const timeUpdateHandler = (e) => {
    const currTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurr = Math.round(currTime);
    const roundedDuration = Math.round(duration);
    const animationPercentage = Math.round(
      (roundedCurr / roundedDuration) * 100
    );
    setSongInfo({
      ...songInfo,
      currTime,
      duration,
      animationPercentage,
    });
  };

  const handleViews = () => {
    if (!audioRef.current.paused && audioRef.current.currentTime >= 0) {
      setTimeout(() => {
        userData.user
          ? axios.patch(
              `https://app-litsoc.herokuapp.com/post/playviews/${postId}`,
              { user: userData.user.id }
            )
          : axios.patch(
              `https://app-litsoc.herokuapp.com/post/playviews/${postId}`
            );
      }, 10000);
    }
  };

  return (
    <div className="App">
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
      />
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={fileURL ? fileURL : ""}
        onPlay={handleViews}
      />
    </div>
  );
};

export default MyAudioPlayer;
