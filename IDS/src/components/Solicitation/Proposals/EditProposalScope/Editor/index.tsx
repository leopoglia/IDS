import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const RichTextEditor = (props: any) => {
  const [content, setContent] = useState('');

  const handleChange = (value: React.SetStateAction<string>) => {
    setContent(value);
    props.setContent(value);
  };

  const quillModules = {
    toolbar: [
      [{ header: [1, false] }],
      ['bold', 'italic', 'underline', 'blockquote',
      'code-block', 'link',
        { 'list': 'bullet' },
        { 'list': 'ordered' }],
    ]
  }



  return (
    <ReactQuill modules={quillModules} value={content} onChange={handleChange} />
  );
};

export default RichTextEditor;