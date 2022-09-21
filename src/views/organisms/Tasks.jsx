import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskDetailModal from './TaskDetailModal.jsx';
import Card from '../atoms/Card.jsx';

function Tasks({ list, getTodoData }) {
  const theme = useTheme();
  const [listData, setListData] = React.useState(list);

  // カード詳細モーダルをtaskIndex指定で開く
  const handleOpen = (taskIndex) => {
    listData['tasks'][taskIndex].open = true;
    setListData({ ...listData });
    console.log(`handleOpen! taskIndex:${taskIndex}`);
  };
  // カード詳細モーダルをtaskIndex指定で閉じる
  const handleClose = (taskIndex) => {
    listData['tasks'][taskIndex].open = false;
    setListData({ ...listData });
    console.log(`handleClose! taskIndex:${taskIndex}`);
    // データ再取得
    getTodoData();
  };

  return (
    <div>
      <Droppable key={list.id} droppableId={list.id} type="CARD">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {listData['tasks'].map((task, taskIndex) => {
              return (
                <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                  {(provided, snapshot) => (
                    <div
                      key={task.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? '0.5' : '1',
                        cursor: 'default',
                      }}
                    >
                      {/* カード部 */}
                      <Card taskTitle={task.task_title} handleOpen={handleOpen} taskIndex={taskIndex} />
                      {/* カードクリック時に表示されるカード詳細モーダル部 */}
                      <TaskDetailModal
                        open={task.open === true ? true : false}
                        handleClose={handleClose}
                        task={task}
                        taskIndex={taskIndex}
                      ></TaskDetailModal>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
export default Tasks;
