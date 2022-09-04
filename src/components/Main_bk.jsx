import React from "react";
import { useState, useCallback } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card.jsx";

import data from "../data/dataset.js";

import "../css/main.css";

function Main() {
 const [todoData, setTodoData] = useState(data);
 const onDragEnd = (result) => {
  if (!result.destination) return;
  const { source, destination } = result;

  // ドラッグ元のリストのインデックスを取得
  const sourceColIndex = todoData.findIndex((e) => e.id === source.droppableId);
  // ドロップ先のリストのインデックスを取得
  const destinationColIndex = todoData.findIndex(
   (e) => e.id === destination.droppableId
  );
  // ドラッグ元のリストデータを取得
  const sourseCol = todoData[sourceColIndex];
  // ドラッグ元のタスクをコピー
  const sourseTask = sourseCol["tasks"][source.index];
  // 全体のデータをコピー
  const newdata = JSON.parse(JSON.stringify(todoData));
  // ドラッグ元のタスクを削除
  newdata[sourceColIndex]["tasks"].splice(source.index, 1);
  // ドロップ先にタスクを追加
  newdata[destinationColIndex]["tasks"].splice(
   destination.index,
   0,
   sourseTask
  );
  setTodoData(newdata);
 };

 return (
  <div>
   <div className="header">todo-app</div>
   <DragDropContext onDragEnd={onDragEnd}>
    <div className="home">
     {todoData.map((list) => (
      <Droppable key={list.id} droppableId={list.id}>
       {(provided) => (
        <div
         className="list"
         ref={provided.innerRef}
         {...provided.droppableProps}
        >
         <div>{list.sectionTitle}</div>
         <div>
          {list.tasks.map((task, taskIndex) => (
           <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
            {(provided, snapshot) => (
             <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
               ...provided.draggableProps.style,
               opacity: snapshot.isDragging ? "0.5" : "1",
              }}
             >
              <Card>{task.taskTitle}</Card>
             </div>
            )}
           </Draggable>
          ))}
          {provided.placeholder}
         </div>
        </div>
       )}
      </Droppable>
     ))}
    </div>
   </DragDropContext>
  </div>
 );
}

export default Main;
