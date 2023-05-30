import { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./style.css"

const Dictaphone = (props) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();


  const handleListen = () => {
    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    if (listening) {
      SpeechRecognition.stopListening();
      setOn(true)
    } else {
      SpeechRecognition.startListening();
      setOn(false)
    }
  };

  const [on, setOn] = useState(false)


  useEffect(() => {
    if (props.setValue) {

      if (props.value === "") {
        if (props.handle) {
          props.handle(transcript, props.label);
        } else {
          props.setValue(transcript);
        }
      }
    }
  }, [transcript, props])


  return (
    <button className={'microphone mic-' + on} onClick={handleListen}>

      <span className='material-symbols-outlined'>
        mic
      </span>

    </button>
  );
};
export default Dictaphone;
