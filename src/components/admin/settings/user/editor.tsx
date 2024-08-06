'use client';

import CKEditorComponent from '@src/components/editor';

export const UserEditor = ({ editMode, editorData, handleEditorData }) => {
  return (
    <div className="my-8">
      <CKEditorComponent
        data={editorData}
        onChange={handleEditorData}
        readOnly={!editMode}
      />
    </div>
  );
};

export const UserViewer = ({ editorData }) => {
  return (
    <div className="my-2 p-2">
      <div className="min-h-[40vh] w-full">
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
      </div>
    </div>
  );
};
