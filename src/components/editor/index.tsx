// components/CKEditor.js
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ onChange, data, readOnly }) => {
  return (
    <section className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        data={data}
        disabled={readOnly}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </section>
  );
};

export default CKEditorComponent;
