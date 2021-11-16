import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';

const AddCustomer = ({ addCustomer }) => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    streetaddress: '',
    city: '',
    postcode: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addCustomerClick = () => {
    setOpen(false);
    addCustomer(customers);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCustomers({ ...customers, [name]: value });
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Add Customers
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New customer</DialogTitle>
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
          <Button onClick={addCustomerClick} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCustomer;
