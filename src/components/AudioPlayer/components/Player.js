import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
const AudioPlayer = ({
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  //Event Handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const dragHandler = async (e) => {
    const dragValue = e.target.value;
    await setSongInfo({ ...songInfo, currTime: dragValue });
    audioRef.current.currentTime = e.target.value;
  };

  const volDragHandler = (e) => {
    const dragValue = e.target.value / 100;
    audioRef.current.volume = e.target.value / 100;
    setSongInfo({ ...songInfo, volume: dragValue });
  };
  const maxVolHandler = () => {
    audioRef.current.volume = 1;
    setSongInfo({ ...songInfo, volume: 1 });
  };
  const muteVolHandler = () => {
    audioRef.current.volume = 0;
    setSongInfo({ ...songInfo, volume: 0 });
  };
  //Add Styles
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  const volumeSlider = {
    transform: `translateX(${songInfo.volume * 100}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <div className="play-control">
          {!isPlaying && (
            <FontAwesomeIcon
              onClick={playSongHandler}
              icon={faPlay}
              size="2x"
              className="play"
            />
          )}
          {isPlaying && (
            <FontAwesomeIcon
              onClick={playSongHandler}
              icon={faPause}
              size="2x"
              className="play"
            />
          )}
          {/* <div className="volume-container">
          <FontAwesomeIcon
            icon={faVolumeMute}
            size="2x"
            className="volumeMute"
            onClick={muteVolHandler}
          />
          <div
            style={{
              background: "linear-gradient(to right,#B7C1EB,#084DA6)",
            }}
            className="track volumeSlider"
          >
            <input
              value={songInfo.volume}
              onChange={volDragHandler}
              type="range"
            />
            <div
              style={volumeSlider}
              className="animate-track animate-volumeSlider"
            ></div>
          </div>
          <FontAwesomeIcon
            icon={faVolumeUp}
            size="2x"
            className="volumeUp"
            onClick={maxVolHandler}
          />
        </div> */}
        </div>
        <p className="mb-0">{getTime(songInfo.currTime)}</p>
        <div
          style={{
            background: "linear-gradient(to right,#0FA697,#042026)",
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnimation} className="animate-track"></div>
        </div>
        <p className="mb-0">
          {songInfo.duration ? getTime(songInfo.duration) : "0:00"}
        </p>
      </div>
    </div>
  );
};

export default AudioPlayer;
