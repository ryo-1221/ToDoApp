import React, { useContext } from 'react';
import { tokenContext } from '../App';
import axios from 'axios';
import Header from './organisms/Header';

import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Tasks from './organisms/Tasks.jsx';
import data from '../data/dataset.js';
import { MdPlaylistAdd } from 'react-icons/md';
import { Grid, TextField } from '@mui/material';
import '../css/main.css';
import { request } from '../axios/request.jsx';
import ListOptionButton from './organisms/ListOptionButton';

function Main(props) {
  const [todoData, setTodoData] = useState([]);
  // Cognito認証トークン
  const token = useContext(tokenContext);

  // 全体データ取得
  const getTodoData = async () => {
    // HTTPリクエスト
    console.log(`getTodoData:全体データ取得`);
    const result = await request({ token: token, method: 'get', path: 'todo' });
    console.log(result.todoData);
    const newTodoData = result.todoData;
    // 初期化
    setTodoData([]);
    setTodoData(newTodoData);
  };

  // 初期表示
  useEffect(() => {
    getTodoData();
  }, []);

  //  カード/リストのドロップ時の処理
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, type } = result;
    // カード並び替え時
    if (type === 'CARD') {
      // ドラッグ元のリストのインデックスを取得
      const sourceColIndex = todoData.findIndex((e) => e.id === source.droppableId);
      // ドロップ先のリストのインデックスを取得
      const destinationColIndex = todoData.findIndex((e) => e.id === destination.droppableId);
      // ドラッグ元のタスクを削除
      const [removed] = todoData[sourceColIndex]['tasks'].splice(source.index, 1);
      // ドロップ先に削除したタスクを追加
      todoData[destinationColIndex]['tasks'].splice(destination.index, 0, removed);
      setTodoData(todoData);
      //  console.log(todoData);
      // リスト並び替え時
    } else {
      // ドラッグ元のリストを削除
      const [removed] = todoData.splice(source.index, 1);
      // ドロップ先に削除したリストを追加
      todoData.splice(destination.index, 0, removed);
      setTodoData(todoData);
    }
  };

  // リスト名変更時の処理
  const handleBlur = async (e, id) => {
    console.log(e.target.value);
    // HTTPリクエスト
    console.log(`handleBlur:リスト名変更`);
    const data = {
      listTitle: e.target.value,
    };
    const result = await request({
      token: token,
      method: 'put',
      path: `todo/listName/${id}`,
      data: data,
    });
  };

  // リスト追加ボタン押下時の処理
  const handleAddListClick = async () => {
    // HTTPリクエスト
    console.log(`handleAddListClick:リスト追加`);
    const result = await request({
      token: token,
      method: 'post',
      path: `todo/list`,
    });
    let newList = {
      ...result,
    };
    let newTodoData = [...todoData, newList];
    setTodoData(newTodoData);
  };

  // タスク追加ボタン押下時の処理
  const handleAddTask = async (list_id) => {
    console.log('handleAddTask:タスク追加');
    const data = {
      list_id: list_id,
    };
    const result = await request({
      token: token,
      method: 'post',
      path: `todo/task`,
      data: data,
    });
    console.log(result);
    //データ再読み込み
    getTodoData();
  };

  // リスト削除ボタン押下時の処理
  const handleDeleteList = async (list_id) => {
    console.log('handleDeleteList:リスト削除');
    const result = await request({
      token: token,
      method: 'delete',
      path: `todo/list/${list_id}`,
    });
    //データ再読み込み
    getTodoData();
  };

  return (
    <div>
      {/* <div className="header">todo-app</div> */}
      <Header signOut={props.signOut} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable key={'droppable'} droppableId={'droppable'} type="LIST" direction="horizontal">
          {(provided) => (
            <div className="home" ref={provided.innerRef} {...provided.droppableProps}>
              {todoData.map((list, listIndex) => {
                return (
                  <div key={list.id}>
                    <Draggable key={list.id} draggableId={list.id} index={listIndex}>
                      {(provided, snapshot) => (
                        <div
                          className="list"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? '0.5' : '1',
                            cursor: 'default',
                          }}
                        >
                          <Grid container>
                            {/* リスト名表示 */}
                            <Grid item xs={10}>
                              <TextField
                                id="standard-basic"
                                variant="standard"
                                fullWidth
                                defaultValue={list.list_title}
                                onBlur={(e) => handleBlur(e, list.id)}
                                sx={{ padding: '5px 5px 5px 10px' }}
                              />
                            </Grid>
                            {/* <span
                            style={{
                              float: 'right',
                              marginRight: '10px',
                            }}
                            onClick={() => handleAddTask(list.id)}
                          > */}
                            {/* <MdPlaylistAdd className="add-task-button" size={25} /> */}
                            {/* </span> */}
                            <Grid item xs={2}>
                              <ListOptionButton
                                list={list}
                                handleAddTask={handleAddTask}
                                handleDeleteList={handleDeleteList}
                              />
                            </Grid>
                          </Grid>
                          <Tasks list={list} getTodoData={getTodoData} />
                        </div>
                      )}
                    </Draggable>
                  </div>
                );
              })}
              <button className="add-list" onClick={handleAddListClick}>
                + リストを追加
              </button>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
export default Main;
