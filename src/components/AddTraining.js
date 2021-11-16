import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

const AddTraining = ({ addTraining }) => {
  const [open, setOpen] = useState(false);
  const [trainings, setTrainings] = useState({
    activity: '',
    date: '',
    duration: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTrainigClick = () => {
    setOpen(false);
    addTraining(trainings);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTrainings({ ...trainings, [name]: value });
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add Trainings
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='activity'
            label='Activity'
            type='text'
            fullWidth
            variant='standard'
            value={trainings.activity}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='date'
            type='date'
            fullWidth
            variant='standard'
            value={trainings.date}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='duration'
            label='Duration'
            type='text'
            fullWidth
            variant='standard'
            value={trainings.duration}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={addTrainigClick} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTraining;
