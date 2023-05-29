import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceInput = () => {
  const { transcript, resetTranscript, listening } = useSpeechRecognition();

  const handleChange = (event) => {
    // Atualiza o valor do input com o texto falado
    event.target.value = transcript;

    console.log(event.target.value);
  };

  return (
    <div>
      <input type="text" onChange={handleChange} />
      <button onClick={SpeechRecognition.startListening}>Iniciar Escuta</button>
      <button onClick={SpeechRecognition.stopListening}>Parar de Escutar</button>
      <button onClick={resetTranscript}>Limpar</button>
      {listening && <div>Escutando...</div>}
    </div>
  );
};

export default VoiceInput;
