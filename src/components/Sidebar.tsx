import React from 'react'
import { Notes } from '../App'

// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
  return (
    <Box sx={{ '& button': { m: 1 } }}>
      <Button
        variant="contained" size="medium"
        onClick={onAddNote}
      >
        add
      </Button>
      <List
        component="ul"
      >
        {notes.map((note: Notes) => {
          return (
            <ListItem key={note.id} alignItems="flex-start"
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
              <Button variant="outlined" color="error" size="small"
                onClick={() => onDeleteNote(note.id)}>
                delete
              </Button>
            </ListItem>
          )
        })}
      </List>
    </Box>
  )
}

export default Sidebar