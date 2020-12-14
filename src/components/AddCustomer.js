import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddCustomer(props) {
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', email: '', phone: '', streetaddress: '', postcode: '' , city: '' })
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.addCustomer(customer);
        handleClose();
    }

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (

        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                AddCustomer
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstname"
                        onChange={inputChanged}
                        label="Firstname"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        onChange={inputChanged}
                        label="Lastname"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        onChange={inputChanged}
                        label="Streetaddress"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        onChange={inputChanged}
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        onChange={inputChanged}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        onChange={inputChanged}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        onChange={inputChanged}
                        label="Phone"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
          </Button>
                </DialogActions>
            </Dialog>
        </div>

    );
}

export default AddCustomer;