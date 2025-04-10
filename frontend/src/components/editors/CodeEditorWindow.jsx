import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
    const handleEditorChange = (code) => {
        onChange(code);
    };

    return (
        <div
            className="max-w-5xl border border-gray-500"
            style={{ resize: 'vertical', overflow: 'auto' }}
        >
            <Editor
                height="400px"
                width="100%"
                language={language || 'javascript'}
                value={code}
                theme={theme}
                defaultValue="// some comment"
                onChange={handleEditorChange}
                options={{
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditorWindow;
