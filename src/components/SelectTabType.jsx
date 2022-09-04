import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { request } from '../axios/request.jsx';

import Box from '@mui/material/Box';
import ArticleIcon from '@mui/icons-material/Article.js';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import DeleteIcon from '@mui/icons-material/Delete.js';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline.js';
import Stack from '@mui/material/Stack';

const SelectTabType = (props) => {
  const { addNote, tabsData, getTabIcon, setTabsData } = { ...props };
  // const addNote = props.addNote;
  console.log(tabsData);

  const handleBlurTabTitle = async (e, tab, tabIndex) => {
    // タブ名変更
    // HTTPリクエスト
    console.log(`handleBlurTabTitle:タブ名変更`);
    const data = {
      tab_title: e.target.value,
      type: tab.type,
    };
    const result = await request({
      method: 'put',
      path: `todo/tabName/${tab.tab_id}`,
      data: data,
    });
    const newTabsData = [...tabsData];
    newTabsData[tabIndex].tab_title = data.tab_title;
    setTabsData(newTabsData);
  };

  const handleDeleteTab = async (tab, tabIndex) => {
    console.log('aa');
    // タブ削除
    const data = {
      type: tab.type,
      tab_title: 'ss',
    };
    const result = await request({
      method: 'delete',
      path: `todo/tab/${tab.tab_id}`,
      data: data,
    });
    const newTabsData = [...tabsData];
    newTabsData.splice(tabIndex, 1);
    setTabsData(newTabsData);
  };

  return (
    <Box sx={{ pt: 5, pl: 15, pr: 15 }}>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button variant="contained" onClick={addNote}>
          <ArticleIcon />
          新規追加
        </Button>
      </div>
      {tabsData.map((tab, tabIndex) => {
        return (
          <Card sx={{ p: 1, m: 1 }} key={tab.tab_id}>
            <Grid container>
              <Grid item xs={1}>
                <Box sx={{ mt: 0.5, mr: 1, textAlign: 'center' }}>{getTabIcon(tab.type)}</Box>
              </Grid>
              <Grid item xs={9}>
                <TextField
                  // key={tab.tab_id}
                  id="standard-basic"
                  defaultValue={tab.tab_title}
                  variant="standard"
                  fullWidth
                  onBlur={(e) => handleBlurTabTitle(e, tab, tabIndex)}
                />
              </Grid>
              <Grid item xs={2}>
                <Box sx={{ mt: 0.5, mr: 1, textAlign: 'right' }}>
                  {/* <button onClick={() => handleDeleteTab(tab, tabIndex)}>aa</button> */}
                  {tabIndex != 0 ? <DeleteOutlineIcon onClick={() => handleDeleteTab(tab, tabIndex)} /> : null}
                </Box>
              </Grid>
            </Grid>
          </Card>
        );
      })}
    </Box>
  );
};
export default SelectTabType;
