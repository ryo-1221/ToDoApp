import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';

// カードコンポーネント
const Card = ({ taskTitle, handleOpen, taskIndex }) => {
  const theme = useTheme();

  return (
    <Paper className="task" sx={{ backgroundColor: theme.palette.kinari.main }} onClick={() => handleOpen(taskIndex)}>
      {taskTitle}
    </Paper>
  );
};

export default Card;
