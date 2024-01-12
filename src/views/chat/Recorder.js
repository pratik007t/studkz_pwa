import React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  ChatUploadFile,
  ChatUploadURL,
  conversationList,
} from "store/action/chat.action";

const Recorder = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const chatTitle = useSelector((state) => state.ChatReducer.conversation);

  const addAudioElement = async (blob) => {
    if (blob) {
      const date = new Date();
      const time = date.getTime();
      const file = new File([blob], `recorded_${time}.mp3`);
      if (file) {
        for (const fileData of [file]) {
          const obj = {
            fileName: fileData.name,
            fileSize: fileData.size,
          };
          const data = await dispatch(ChatUploadURL(chatTitle.threadID, obj));
          if (data) {
            dispatch(ChatUploadFile(data.uploadURL, fileData));
            await dispatch(conversationList(id));
          }
        }
      }
    }
  };
  return (
    <React.Fragment>
      <AudioRecorder 
        onRecordingComplete={(blob) => addAudioElement(blob)}
        // recorderControls={recorderControls}
      />
    </React.Fragment>
  );
};

export default Recorder;
