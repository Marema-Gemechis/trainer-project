import { useState, useEffect, useMemo, useCallback } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { customersCol, trainingsCol } from './columns';
import Tables from './components/Tables';
import AddCustomer from './components/AddCustomer';
import AddTraining from './components/AddTraining';
import { Button } from '@mui/material';
import EditCustomer from './components/EditCustomer';
import EditTraining from './components/EditTraining';

function App() {
  const [customers, setCustomers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetchData(
        'https://customerrest.herokuapp.com/api/customers'
      );
      setCustomers(response.content);
    };
    const fetchTrainings = async () => {
      const response = await fetchData(
        'https://customerrest.herokuapp.com/api/trainings'
      );
      setTrainings(response.content);
    };
    fetchCustomers();
    fetchTrainings();
  }, []);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteResource = useCallback(async (link, updateFn, url) => {
    try {
      if (window.confirm('Are you sure you want to delete')) {
        console.log(link);
        await fetch(link, { method: 'DELETE' });
        const response = await fetchData(url);
        updateFn(response.content);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const customerColumns = useMemo(
    () => [
      ...customersCol,
      {
        id: 'delete',
        filterable: false,
        sortable: false,
        Cell: ({ row }) => (
          <Button
            variant='outlined'
            color='error'
            onClick={() =>
              deleteResource(
                row.original.links[0].href,
                setCustomers,
                'https://customerrest.herokuapp.com/api/customers'
              )
            }
          >
            Delete
          </Button>
        )
      },
      {
        id: 'edit',
        filterable: false,
        sortable: false,
        Cell: ({ row }) => (
          <EditCustomer
            prevValues={row.original}
            editCustomer={updateCustomer}
          />
        )
      }
    ],
    [deleteResource]
  );

  const trainingColumns = useMemo(
    () => [
      ...trainingsCol,
      {
        id: 'delete',
        filterable: false,
        sortable: false,
        Cell: ({ row }) => (
          <Button
            variant='outlined'
            color='error'
            onClick={() =>
              deleteResource(
                row.original.links[0].href,
                setTrainings,
                'https://customerrest.herokuapp.com/api/trainings'
              )
            }
          >
            Delete
          </Button>
        )
      },
      {
        id: 'edit',
        filterable: false,
        sortable: false,
        Cell: ({ row }) => (
          <EditTraining
            prevValues={row.original}
            editTraining={updateTraining}
          />
        )
      }
    ],
    [deleteResource]
  );

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addResource = async (customerInfo, link, updateFn) => {
    try {
      await fetch(link, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customerInfo)
      });

      const response = await fetchData(link);
      updateFn(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  const udpateResource = async (newData, link, updateFn, url) => {
    try {
      await fetch(link, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
      });

      const response = await fetchData(url);
      updateFn(response.content);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCustomer = (newData, link) => {
    udpateResource(
      newData,
      link,
      setCustomers,
      'https://customerrest.herokuapp.com/api/customers'
    );
  };

  const updateTraining = (newData, link) => {
    udpateResource(
      newData,
      link,
      setTrainings,
      'https://customerrest.herokuapp.com/api/trainings'
    );
  };

  const addCustomer = (customerInfo) => {
    addResource(
      customerInfo,
      'https://customerrest.herokuapp.com/api/customers',
      setCustomers
    );
  };

  const addTraining = (customerInfo) => {
    addResource(
      customerInfo,
      'https://customerrest.herokuapp.com/api/trainings',
      setTrainings
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label='tabs'>
          <Tab label='Customers' />
          <Tab label='Trainings' />
        </Tabs>
      </Box>
      {value === 0 && (
        <div>
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            <AddCustomer addCustomer={addCustomer} />
          </span>
          {customers.length > 0 && (
            <Tables columns={customerColumns} data={customers} />
          )}
        </div>
      )}
      {value === 1 && (
        <div>
          <span style={{ display: 'flex', justifyContent: 'center' }}>
            <AddTraining addTraining={addTraining} />
          </span>
          {trainings.length > 0 && (
            <Tables columns={trainingColumns} data={trainings} />
          )}
        </div>
      )}
    </Box>
  );
}

export default App;
