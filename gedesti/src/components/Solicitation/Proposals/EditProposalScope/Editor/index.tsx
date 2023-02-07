import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = (props:any) => {
  const [content, setContent] = useState('');

  const handleChange = (value: React.SetStateAction<string>) => {
    setContent(value);
    props.setContent(value);
  };

  


  return (
    <ReactQuill value={content} onChange={handleChange} />
  );
};

export default RichTextEditor;