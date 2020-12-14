import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer.js';
import EditCustomer from './EditCustomer.js';
import AddTraining from './AddTraining.js';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);

    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, [])

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link[0].href, {
                method: 'DELETE'
            })
                .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
                .then(_ => setMsg('Customer was deleted successfully'))
                .then(_ => setOpen(true))
                .catch(err => console.error(err))
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
            .catch(err => console.error(err))
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
            .catch(err => console.error(err))
            .then(_ => setMsg('Customer was updated successfully'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))

    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newTraining)
        })
            .then(_ => gridRef.current.refreshCells({ rowNodes: getCustomers() }))
            .catch(err => console.error(err))
    }

    const closeSnackbar = () => {
        setOpen(false);
    }

    const columns = [
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Street Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Post code', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        {
            headerName: '',
            width: 91,
            cellRendererFramework: (row) => <EditCustomer updateCustomer={updateCustomer} customer={row.data} />
        },
        {
            headerName: '',
            field: 'links',
            width: 114,
            cellRendererFramework: (params) =>
                <Button variant="outlined" color="secondary" onClick={() => deleteCustomer(params.value)}>
                    Delete
                </Button>

        },
        {
            headerName: '',
            width: 91,
            cellRendererFramework: (params) => <AddTraining addTraining={addTraining} params={params} />
        }

    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '800px', width: '80%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    suppressCellSelection={true}
                    onGridReady={params => {
                        gridRef.current = params.api
                    }}
                    columnDefs={columns}
                    rowData={customers}
                    pagination="true"
                    paginationPageSize="10"
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={closeSnackbar}
                    message={msg}
                />
            </div>
        </div>
    );
}

export default Customerlist;