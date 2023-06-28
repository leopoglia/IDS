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

  const [micSelect, setMicSelect] = useState(false);
  const [active, setActive] = useState(false);


  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  function Run(props) {
    useEffect(() => {

      if (active === true && micSelect === true) {
        const handleTranscript = () => {
          if (transcript !== '' && transcript !== undefined) {
            if (listening === true) {
              if (props?.handle !== undefined) {

                let event = { target: { value: transcript } };

                props.handle(event, props.label);
              } else {
                let event = { target: { value: transcript } };

                props.setValue(transcript);
              }
            }
          }
        };

        handleTranscript();
      }
    }, [transcript, props?.value]);

  }

  Run(props)


  const handleClick = (type) => {

    if (type === true) {
      SpeechRecognition.startListening()
    } else {
      SpeechRecognition.stopListening()
    }
    setMicSelect(false);

  }

  return (
    <div className='mic'>
      <button className={'microphone mic-' + (active === true ? listening : "false")} onClick={() => { setActive(true); }}>
        <span className='material-symbols-outlined'>
          mic
        </span>
      </button>


      {active === true &&
        <div className="modal modal-mic">
          <div className="modal-header">

            {listening === false ?
              <button className="closeModal" onClick={() => { handleClick(true); setMicSelect(true) }} >
                <span className="material-symbols-outlined">
                  play_arrow
                </span>
              </button>
              :
              <button className="closeModal" onClick={() => { handleClick(false); setMicSelect(false) }} >
                <span className="material-symbols-outlined">
                  pause
                </span>
              </button>
            }

            <button className="closeModal" onClick={() => setActive(false)} >
              <span className="material-symbols-outlined">
                close
              </span>
            </button>
          </div>


        </div>
      }
    </div>
  );
};
export default Dictaphone;
