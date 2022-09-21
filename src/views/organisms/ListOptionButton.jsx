import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Divider, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BoolAlert from '../atoms/BoolAlert';

const ListOptionButton = (props) => {
  const { list, handleAddTask, handleDeleteList } = { ...props };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleAddTask(list.id)}>カード追加</MenuItem>
        <Divider />
        <BoolAlert
          buttonComponent={
            <MenuItem>
              <Box sx={{ color: 'red' }}>リスト削除</Box>
            </MenuItem>
          }
          AlertTitle={'リストを削除してよろしいですか？'}
          AlertContent={''}
          yesText={'はい'}
          yesFunction={() => handleDeleteList(list.id)}
          noText={'キャンセル'}
          noFunction={handleClose}
        />
      </Menu>
    </Box>
  );
};
export default ListOptionButton;
