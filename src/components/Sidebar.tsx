import React from 'react'
import { Notes } from '../App'

// MUI
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuItemIcon from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';

interface SidebarProps {
  notes: Notes[];
  onAddNote: () => void,
  onDeleteNote: (id: string) => void,
  activeNote: string | boolean,
  setActiveNote: React.Dispatch<React.SetStateAction<string | boolean>>,
  handleDrawerClose: () => void,
}

const Sidebar: React.FC<SidebarProps> = ({ notes, onAddNote, onDeleteNote, setActiveNote, handleDrawerClose }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [deleteId, setDeleteId] = React.useState<null | string>(null);
  const open = Boolean(anchorEl);

  const onOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const onDeleteNotetrigger = () => {
    typeof deleteId ==='string' && onDeleteNote(deleteId);
    setAnchorEl(null);
    handleDrawerClose();
  }
  const onClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <Button
        variant="contained" size="medium" startIcon={<AddIcon/>}
        onClick={onAddNote}
      >
        add
      </Button>
      <List
        component="ul"
      >
        {notes.map((note: Notes) => {
          return (
            <ListItem
              key={note.id}
              alignItems="flex-start"
              onClick={() => {
                setActiveNote(note.id);
                handleDrawerClose();
              }}
            >
              <ListItemText
                primary={note.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {note.text}
                    </Typography>
                    <Typography variant="body2" component="span" sx={{display: 'block'}}>
                      {new Date(note.modDate).toLocaleDateString("ja-JP", {
                        hour: "2-digit", minute: "2-digit"
                      })}
                    </Typography>
                  </React.Fragment>
                }
              >
              </ListItemText>
              <Button
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  onOpenMenu(event);
                  setDeleteId(note.id)
                }}
                aria-controls={open ? `long-menu-${note.id}`: undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
              >
                <MoreVertIcon/>
              </Button>
              <Menu
                id={`long-menu-${note.id}`}
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
                MenuListProps={{
                  'aria-labelledby': `long-button-${note.id}`,
                }}
                PaperProps={{
                  style: {
                    // maxHeight: ITEM_HEIGHT * 4.5,
                    width: '18ch',
                  }
                }}
              >
                <MenuItem
                  onClick={onDeleteNotetrigger}
                >
                  <MenuItemIcon><DeleteIcon/></MenuItemIcon>
                  Delete
                </MenuItem>
                <MenuItem>
                  <MenuItemIcon><ContentCopyIcon/></MenuItemIcon>
                  Duplicate
                </MenuItem>
              </Menu>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default Sidebar