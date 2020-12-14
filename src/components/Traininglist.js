import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import moment from "moment";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = useState('');
  const gridRef = useRef();

  useEffect(() => {
    getTrainings();
  }, [])

  const getTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }

  const deleteTraining = (training) => {
    if (window.confirm('Are you sure?')) {
      fetch('https://customerrest.herokuapp.com/api/trainings/' + training, {
        method: 'DELETE'
      })
        .then(_ => gridRef.current.refreshCells({ rowNodes: getTrainings() }))
        .then(_ => setMsg('Training was deleted successfully'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }
  }

  const closeSnackbar = () => {
    setOpen(false);
  }

  const columns = [
    { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
    { headerName: 'Date', field: 'date', cellRenderer: (data) => { return moment(data.value).format("MM/DD/YYYY HH:mm"); }, sortable: true, filter: true },
    { headerName: 'Duration', field: 'duration', sortable: true, filter: true },
    { headerName: "Customer's first name", field: 'customer.firstname', sortable: true, filter: true },
    { headerName: "Customer's last name", field: 'customer.lastname', sortable: true, filter: true },

    {
      headerName: '',
      field: 'data',
      width: 114,
      cellRendererFramework: (params) =>
        <Button variant="outlined" color="secondary" onClick={() => deleteTraining(params.data.id)}>
          Delete
          </Button>

    }
  ]

  return (
    <div>

      <div className="ag-theme-material" style={{ height: '700px', width: 'auto', margin: 'auto' }}>
        <AgGridReact
          ref={gridRef}
          suppressCellSelection={true}
          onGridReady={params => {
            gridRef.current = params.api
          }}
          columnDefs={columns}
          rowData={trainings}
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

export default Traininglist;