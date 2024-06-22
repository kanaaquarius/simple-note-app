import React from 'react'
import { Notes } from '../App'

// MUI
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';

interface MainProps {
  getActiveNote?: Notes | undefined,
  onUpdatenote: (updateNote: Notes) => void,
}

const Main: React.FC<MainProps> = ({getActiveNote, onUpdatenote}) => {

  const onEditNote = (key: string, value: string) => {
    onUpdatenote({
      ...getActiveNote!,
      id: getActiveNote?.id ?? '',
      [key]: value,
      modDate: Date.now(),
    });
  }

  if(!getActiveNote) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
      >
        no notes are selected
      </Typography>
    )
  }
  return (
      <>
        <TextField id='title'
          variant="standard" fullWidth
          value={getActiveNote.title}
          onChange={(e) => onEditNote('title', e.target.value)}
        />
        <TextField placeholder='type something' id="text"
          multiline fullWidth maxRows={15} margin="normal"
          sx={{"& fieldset": { border: 'none' }}}
          value={getActiveNote.text}
          onChange={(e) => onEditNote('text', e.target.value)}
        />
      </>
  )
}

export default Main