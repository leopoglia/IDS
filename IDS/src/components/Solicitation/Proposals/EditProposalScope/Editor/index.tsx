import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = (props: any) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(props.content);
  }, [props.content]);
  

  const handleChange = (value: React.SetStateAction<string>) => {
    setContent(value);

    console.log("OBJECTIVE --> ", props?.type)

    if(props?.type === undefined){
      props.setContent(value);
    }else{

      let valueTarget:any = {target:{ value: ""}};

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