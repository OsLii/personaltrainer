import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditCustomer(props) {
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' })
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log(props.params)
        setCustomer({
            firstname: props.customer.firstname,
            lastname: props.customer.lastname,
            streetaddress: props.customer.streetaddress,
            postcode: props.customer.postcode,
            city: props.customer.city,
            email: props.customer.email,
            phone: props.customer.phone
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateCustomer(customer, props.customer.links[0].href);
        handleClose();
    }

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (

        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
      </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        label="Last name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        label="Street Address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        label="Post code"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={customer.phone}
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

export default EditCustomer;