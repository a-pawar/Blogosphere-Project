import React, { useState } from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function TextEditor() {
  const [text, setText] = useState('');

  const handleChange = (value) => {
    setText(value);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      // ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    // 'link', 'image'
  ];

  return (
    <div>
      <ReactQuill
        value={text}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      />
    </div>
  );
};


