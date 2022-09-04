import React from 'react';
import axios from 'axios';
import Header from './Header';

import { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Tasks from './Tasks.jsx';
import data from '../data/dataset.js';
import { MdPlaylistAdd } from 'react-icons/md';
import { TextField } from '@mui/material';

import '../css/main.css';
import { request } from '../axios/request.jsx';

function Main() {
  const [todoData, setTodoData] = useState([]);

  // 全体データ取得
  const getTodoData = async () => {
    // データ初期化
    setTodoData([]);
    // HTTPリクエスト
    console.log(`getTodoData:全体データ取得`);
    const result = await request({ method: 'get', path: 'todo' });
    setTodoData(result.todoData);
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
      method: 'post',
      path: `todo/task`,
      data: data,
    });
    //データ再読み込み
    getTodoData();
  };

  return (
    <div>
      {/* <div className="header">todo-app</div> */}
      <Header />
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
                          {/* リスト名表示 */}
                          <span className="list-name">
                            <TextField
                              id="standard-basic"
                              variant="standard"
                              defaultValue={list.list_title}
                              onBlur={(e) => handleBlur(e, list.id)}
                            />
                          </span>
                          <span
                            style={{
                              float: 'right',
                              marginRight: '10px',
                            }}
                            onClick={() => handleAddTask(list.id)}
                          >
                            <MdPlaylistAdd className="add-task-button" size={25} />
                          </span>
                          <Tasks list={list} />
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
