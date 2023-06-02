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



  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  // useEffect(() => {

  //   // if (props.handle === true) {
  //   //   props.handle(transcript, props.label);
  //   // } else {
  //     props.setValue(transcript);
  //   // }


  // }, [props.value])

  function Run(props) {
    useEffect(() => {
      // Função para lidar com a lógica condicional


      const handleTranscript = () => {
        if (transcript !== '' && transcript !== undefined) {

          if (props?.handle !== undefined) {
            props.handle(transcript, props.label);
          } else {
            props.setValue(transcript);
          }
        }
      };

      handleTranscript();

    }, [transcript, props]);

  }

  Run(props)


  const handleClick = () => {

    if (micSelect === true) {
      SpeechRecognition.startListening()
    }
    setMicSelect(false);
  }

  return (
    <button className={'microphone mic-' + listening} onClick={() => { handleClick(); setMicSelect(true) }}>


      <span className='material-symbols-outlined'>
        mic
      </span>

    </button>
  );
};
export default Dictaphone;
