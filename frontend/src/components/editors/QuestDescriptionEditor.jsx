import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import './Editor.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const buttonList = [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['math'],
    '/',
    ['fontColor', 'hiliteColor'],
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'table'],
    ['link', 'image'],
];

const QuestDescriptionEditor = ({ description, handleChangeContents }) => {
    return (
        <SunEditor
            setContents={description}
            onChange={handleChangeContents}
            setDefaultStyle="font-family: IBM Plex Sans; font-size: 16px; color:rgb(31, 41, 55); border: 1px solid #9ca3af"
            setOptions={{
                minHeight: 25,
                height: 'auto',
                resizingBar: false,
                katex: katex,
                buttonList: buttonList,
                toolbarContainer: '.sun-editor',
            }}
        />
    );
};

export default QuestDescriptionEditor;
