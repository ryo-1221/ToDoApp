import React, { useEffect, useContext } from 'react';
import { tokenContext } from '../../App';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import NoteField from '../atoms/NoteField';
import SelectTabType from './SelectTabType';
import { request } from '../../axios/request';

import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';

const TaskDetailModal = (props) => {
  const { task, open } = { ...props };
  const [tabsData, setTabsData] = React.useState(task.tabsData);
  const [value, setValue] = React.useState(tabsData[0].tab_id);
  const theme = useTheme();
  // Cognito認証トークン
  const token = useContext(tokenContext);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getTabComponent = (tab) => {
    if (tab.type === 'note') {
      return <NoteField id={tab.tab_id} key={tab.tab_id} tab_id={tab.tab_id} open={open}></NoteField>;
    }
  };
  const getTabIcon = (type) => {
    if (type === 'note') return <ArticleIcon />;
  };
  const addNote = async () => {
    console.log('ノートを追加');
    const data = { task_id: task.id };
    // console.log(data);
    // 新規ノートを追加
    console.log(`addNote:新規ノートを追加`);
    const result = await request({ token: token, method: 'post', path: 'todo/note', data: data });
    console.log(result);
    const newTabsData = {
      task_id: result.task_id,
      tab_id: result.id,
      tab_title: result.note_title,
      type: result.type,
    };
    // データセット
    setTabsData([...tabsData, newTabsData]);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabsData.map((tab) => {
              return (
                <Tab
                  icon={getTabIcon(tab.type)}
                  // icon={<EditIcon />}
                  iconPosition="start"
                  label={<div style={{ fontSize: '15px', fontWeight: 'bold' }}>{tab.tab_title}</div>}
                  value={tab.tab_id}
                  key={tab.tab_id}
                />
              );
            })}
            <Tab
              label={
                <div>
                  <EditIcon />
                </div>
              }
              value={'addTab'}
              key={'addTab'}
            />
          </TabList>
        </Box>
        {tabsData.map((tab) => {
          return (
            <TabPanel value={tab.tab_id} sx={{ p: 1, minHeight: '100%' }} key={tab.tab_id}>
              {getTabComponent(tab)}
            </TabPanel>
          );
        })}
        <TabPanel value={'addTab'} sx={{ p: 1, minHeight: '100%' }} key={'addTab'}>
          <SelectTabType
            key={task.id}
            addNote={addNote}
            tabsData={tabsData}
            getTabIcon={getTabIcon}
            setTabsData={setTabsData}
          ></SelectTabType>
        </TabPanel>
      </TabContext>
    </Box>
  );
};
export default TaskDetailModal;
