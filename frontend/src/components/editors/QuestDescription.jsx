import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const buttonList = [['math']];

const QuestDescriptionEditor = ({ description }) => {
    return (
        <SunEditor
            setContents={description}
            hideToolbar={true}
            disable={true}
            setDefaultStyle="font-family: IBM Plex Sans; font-size: 16px; color:rgb(31, 41, 55)"
            setOptions={{
                minHeight: 25,
                resizingBar: false,
                katex: katex,
                buttonList: buttonList,
                toolbarContainer: '.sun-editor',
            }}
        />
    );
};

export default QuestDescriptionEditor;
