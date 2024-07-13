import React from 'react';
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

// component
import Sidebar from './components/Sidebar';
import Main from './components/Main';

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export interface Notes {
  id: string,
  title: string;
  text: string;
  modDate: number;
}
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  const storageValue = localStorage.getItem("notes");

  const [notes, setNotes] = useState<Notes[]>((typeof storageValue === 'string' && JSON.parse(storageValue)) || []);
  const [activeNote, setActiveNote] = useState<string | boolean>(false);

  // state for MUI
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState(false);
  const drawerWidth = 240;

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if(notes.length > 0) setActiveNote(notes[0].id);
  }, []);

  // function for MUI
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(prev => !prev);
  };

  const onAddNote = () => {
    const newNote = {
        id: uuidv4(),
        title: "New Note",
        text: "tex text",
        modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
  }
  const onDeleteNote = (id: string) => {
    const deleteNote =
      notes.filter((note) => {
        return id !== note.id;
      });
    setNotes(deleteNote);
  }
  const onCopyNote = (note: Notes) => {
    const copiedNote = {
      id: uuidv4(),
      title: note.title,
      text: note.text,
      modDate: Date.now(),
    };
    setNotes([...notes, copiedNote])
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };
  const onUpdatenote = (updateNote: Notes) => {
    const updatedNotesArray =
      notes.map((note) => (note.id === updateNote.id) ? updateNote: note);
    setNotes(updatedNotesArray);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          color= 'primary'
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon/>
            </IconButton>
            <Typography
              variant="h6" noWrap component="div"
            >
              THE NOTE APP
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Sidebar
              notes={notes}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
              onCopyNote={onCopyNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              handleDrawerClose={handleDrawerClose}
            />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            <Sidebar
              notes={notes}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
              onCopyNote={onCopyNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              handleDrawerClose={handleDrawerClose}
            />
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1, p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` }
          }}
        >
          <Toolbar />
          <Main
            getActiveNote={getActiveNote()}
            onUpdatenote={onUpdatenote}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}