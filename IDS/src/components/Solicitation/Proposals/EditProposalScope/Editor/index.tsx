import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = (props: any) => {
  const [content, setContent] = useState('');
  const url = window.location.href.split("/")[3];

  useEffect(() => {

    console.log(url)

    setContent(props.content);

    if (props.content === undefined) {
      if (url !== "demand") {
        setContent(
          "<h1>" + "Escopo do Projeto:" + "</h1></br>" +
          "<h1>" + "Não faz parte do Escopo:" + "</h1></br>" +
          "<h1>" + "Alternativas Avaliadas:" + "</h1></br>" +
          "<h1>" + "Abrangência do Projeto:" + "</h1></br>" +
          "<h1>" + "Principais Riscos/ Plano de Mitigação:" + "</h1></br>"

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
    <ReactQuill modules={quillModules} value={content} onChange={handleChange} />
  );
};

export default RichTextEditor;