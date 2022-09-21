import React, { useCallback, useEffect, useContext } from 'react';
import { tokenContext } from '../../App';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import draftToMarkdown from 'draftjs-to-markdown';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { request } from '../../axios/request.jsx';

const NoteField = (props) => {
  const theme = useTheme();
  const { tab_id, open } = { ...props };
  // const [contents, setContents] = React.useState(props.contents);
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [isFocus, setIsFocus] = React.useState(false);
  // Cognito認証トークン
  const token = useContext(tokenContext);

  // const handleChange = (e) => {
  //   contents.text = e.target.value;
  //   setContents(contents);
  // };
  // const handleImageUpload = useCallback(async (file: File) => {
  //   return await axios
  //     .post
  //     // fileをアップロードし、アップロード後の画像のurlを返す処理
  //     ()
  //     .then((response) => {
  //       return { data: { link: response } };
  //     })
  //     .catch((error) => {
  //       return error;
  //     });
  // }, []);

  //タスクが開かれた時にノートの中身のデータを取得しに行く
  useEffect(() => {
    const fetchData = async () => {
      // HTTPリクエスト
      console.log(`タブの中身のデータ取得`);
      const result = await request({ token: token, method: 'get', path: `todo/note/${tab_id}` });
      // ノートの中身のデータ
      const content = result.noteContents.content_json;
      // 空かどうか判定する
      if (!Object.keys(content).length) {
        // 空の場合初期化する
        setEditorState(EditorState.createEmpty());
      } else {
        // 空でない場合contentStateにする
        const contentState = convertFromRaw(content);
        // contentStateをeditorStateにする
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    };
    if (open) fetchData();
  }, [open]);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = async (e, editorState) => {
    setIsFocus(false);
    // editorStateをrawデータにする
    const raw = convertToRaw(editorState.getCurrentContent());
    const data = {
      content_json: JSON.stringify(raw),
    };
    // HTTPリクエスト
    console.log(`handleBlur:notesデータ登録`);
    const result = await request({ token: token, method: 'put', path: `todo/note/${tab_id}`, data: data });
    // setEditorState(EditorState.createEmpty());
  };

  useEffect(() => {}, [isFocus]);

  const toolbarStyleObject = {
    backgroundColor: theme.palette.kinari.dark,
    fontSize: '5px',
    marginBottom: 0,
    border: 'none',
  };
  return (
    <div>
      <Editor
        tabIndex="-1"
        onBlur={(event, editorState) => {
          handleBlur(event, editorState);
        }}
        onFocus={handleFocus}
        placeholder={'クリックして編集'}
        localization={{ locale: 'ja' }}
        toolbarHidden={!isFocus}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        // wrapperStyle={<wrapperStyleObject>}
        // editorStyle={<editorStyleObject>}
        toolbarStyle={toolbarStyleObject}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: [
            'inline',
            'blockType',
            'fontSize',
            'list',
            'textAlign',
            'colorPicker',
            'link',
            'image',
            'remove',
            'history',
          ],
          image: {
            // uploadCallback: handleImageUpload,
            alt: { present: true, mandatory: true },
            previewImage: true,
          },
          inline: { inDropdown: false },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
      />
    </div>
    // </Paper>
  );
};
export default NoteField;
