import React from 'react';
import { useState, useContext } from 'react';
import { tokenContext } from '../../App';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Box, Container, Stack } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import MultiTabs from './MultiTabs';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import { parse, format } from 'date-fns';
import ja from 'date-fns/locale/ja';

import data from '../../data/dataset';
import { request } from '../../axios/request';
import BoolAlert from '../atoms/BoolAlert';

// カード詳細モーダルコンポーネント
const TaskDetailModal = (props) => {
  const theme = useTheme();
  const { open, handleClose, task, taskIndex } = props;
  const [taskTitle, setTaskTitle] = useState(task.task_title);
  const [deadLine, setDeadLine] = useState(parse(task.dead_line, 'yyyy/MM/dd HH:mm', new Date()));
  const [isCompleted, setIscompleted] = useState(false);
  // Cognito認証トークン
  const token = useContext(tokenContext);

  const changeTaskTitle = (e) => {
    setTaskTitle(e.target.value);
  };

  // タスクタイトルフォーカスアウト時の処理
  // タスクタイトルを変更する
  const handleBlurTaskTitle = async (e) => {
    // HTTPリクエスト
    console.log(`handleBlurTaskTitle:タスクタイトル変更`);
    const data = {
      task_title: e.target.value,
    };
    const result = await request({ token: token, method: 'put', path: `todo/task/${task.id}`, data: data });
  };

  // カード削除時の処理
  const handleDeleteTask = async () => {
    // HTTPリクエスト
    console.log(`handleDeleteTask:カード削除`);
    const result = await request({ token: token, method: 'delete', path: `todo/task/${task.id}` });
    // モーダルを閉じる
    handleClose(taskIndex);
  };

  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth={'md'}
      PaperProps={{
        sx: {
          minHeight: '90vh',
          backgroundColor: theme.palette.secondary.main,
        },
      }}
      onClose={() => handleClose(taskIndex)}
    >
      <DialogContent>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Input
              className="task-title"
              value={taskTitle}
              multiline
              onChange={changeTaskTitle}
              onBlur={handleBlurTaskTitle}
              onFocus={(event) => {
                event.target.select();
              }}
              fullWidth
              inputProps={{
                style: { fontWeight: 'bold', fontSize: 25, paddingTop: '10px' },
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <div style={{ textAlign: 'right' }}>
              <BoolAlert
                buttonComponent={
                  <IconButton sx={{ color: 'red', fontSize: '20px' }}>
                    <DeleteIcon />
                    削除
                  </IconButton>
                }
                AlertTitle={'カードを削除してよろしいですか？'}
                AlertContent={''}
                yesText={'はい'}
                yesFunction={handleDeleteTask}
                noText={'キャンセル'}
                noFunction={() => handleClose(taskIndex)}
              />
            </div>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={7}>
              <Box>
                <Stack spacing={2} direction={'row'} justifyContent="flex-start" alignItems="center">
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={ja}
                    dateFormats={{ monthAndYear: 'yyyy/M ' }}
                  >
                    <DatePicker
                      value={deadLine}
                      onChange={(newValue) => {
                        setDeadLine(newValue);
                      }}
                      minDate={new Date('2018-01-01')}
                      toolbarTitle={''}
                      toolbarFormat="M/d eee"
                      leftArrowButtonText="前月"
                      rightArrowButtonText="次月"
                      showDaysOutsideCurrentMonth={true}
                      renderInput={(params) => {
                        return (
                          <TextField
                            size="small"
                            sx={{
                              // backgroundColor: theme.palette.kinari.main,
                              maxWidth: 150,
                            }}
                            {...params}
                          />
                        );
                      }}
                    />
                    <TimePicker
                      value={deadLine}
                      onChange={(newValue) => {
                        setDeadLine(newValue);
                      }}
                      minDate={new Date('2018-01-01')}
                      ampm={false}
                      toolbarTitle={''}
                      showToolbar={true}
                      renderInput={(params) => {
                        return (
                          <TextField
                            size="small"
                            sx={{
                              maxWidth: 150,
                              // backgroundColor: theme.palette.kinari.main,
                            }}
                            {...params}
                          />
                        );
                      }}
                    />
                  </LocalizationProvider>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isCompleted}
                          onChange={() => setIscompleted(!isCompleted)}
                          inputProps={{ 'aria-label': 'controlled' }}
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />
                      }
                      label={
                        isCompleted ? (
                          <div style={{ fontSize: '15px', fontWeight: 'bold' }}>完了</div>
                        ) : (
                          <div style={{ fontSize: '15px', fontWeight: 'bold' }}>未完了</div>
                        )
                      }
                    />
                  </FormGroup>
                </Stack>
              </Box>
            </Grid>
            {/* <Grid item xs={7}></Grid> */}
            {/* <Grid item xs={7}>
              <Box sx={{ backgroundColor: theme.palette.primary.light }}>ラベルなど</Box>
            </Grid>{' '} */}
          </Grid>
          <MultiTabs task={task} open={open}></MultiTabs>
        </Grid>
      </DialogContent>
      {/* <DialogActions>
    <Button onClick={() => handleClose(taskIndex)}>Cancel</Button>
    <Button onClick={() => handleClose(taskIndex)}>Subscribe</Button>
   </DialogActions> */}
    </Dialog>
  );
};
export default TaskDetailModal;
