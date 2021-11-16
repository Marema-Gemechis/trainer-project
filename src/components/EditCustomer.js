import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

const EditCustomer = ({ prevValues, editCustomer }) => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState(prevValues);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editCustomerClick = () => {
    setOpen(false);
    editCustomer(customers, customers.links[0].href);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCustomers({ ...customers, [name]: value });
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            name='firstname'
            label='Firstname'
            type='text'
            fullWidth
            variant='standard'
            value={customers.firstname}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='lastname'
            label='Lastname'
            type='text'
            fullWidth
            variant='standard'
            value={customers.lastname}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='phone'
            label='Phone'
            type='text'
            fullWidth
            variant='standard'
            value={customers.phone}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='email'
            label='Email'
            type='text'
            fullWidth
            variant='standard'
            value={customers.email}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='streetaddress'
            label='Street Address'
            type='text'
            fullWidth
            variant='standard'
            value={customers.streetaddress}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='city'
            label='City'
            type='text'
            fullWidth
            variant='standard'
            value={customers.city}
            onChange={handleChange}
          />
          <TextField
            margin='dense'
            name='postcode'
            label='Postal Code'
            type='text'
            fullWidth
            variant='standard'
            value={customers.postcode}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary'>
            Cancel
          </Button>
          <Button onClick={editCustomerClick} color='primary'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCustomer;
