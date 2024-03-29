import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from 'react-i18next';
import Mic from '../../../../Fixed/Accessibility/Mic';
import UserContext from '../../../../../context/userContext';

const RichTextEditor = (props: any) => {
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const url = window.location.href.split("/")[3];
  const worker: any = useContext(UserContext).worker; // Busca o usuário logado no contexto


  useEffect(() => {

    setContent(props.content);

    if (props.content === undefined) {
      if (url !== "demand" && url !== "minutes") {
        setContent(
          "<h1>" + t("notPartOfTheScope") + ": </h1></br>" +
          "<h1>" + t("evaluatedAlternatives") + ": </h1></br>" +
          "<h1>" + "Abrangência do Projeto" + ": </h1></br>" +  /// TERMINAR 
          "<h1>" + "Principais Riscos/ Plano de Mitigação" + ": </h1></br>" /// TERMINAR 

        )
      }
    }
  }, [props.content]);


  const handleChange = (value: React.SetStateAction<string>) => {
    setContent(value);

    if (props?.type === undefined) {
      props.setContent(value);
    } else {

      let valueTarget: any = { target: { value: "" } };

      valueTarget.target.value = value;

      props.handleChange(valueTarget, props.type)
    }
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, false] }],
      ['underline',
        { 'list': 'bullet' },
        { 'list': 'ordered' }],
    ]
  }



  return (

    <>
      <ReactQuill modules={quillModules} value={content} onChange={handleChange} />

      <div className='mic-absolute'>

        {worker.voiceCommand === true ?
          <Mic value={content} setValue={setContent} />
          : null}
      </div>
    </>
  );
};

export default RichTextEditor;