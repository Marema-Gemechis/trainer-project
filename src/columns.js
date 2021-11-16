import moment from 'moment';

export const customersCol = [
  {
    Header: 'Firstname',
    accessor: 'firstname',
    sortType: 'basic'
  },
  {
    Header: 'Lastname',
    accessor: 'lastname',
    sortType: 'basic'
  },
  {
    Header: 'Email',
    accessor: 'email',
    sortType: 'basic'
  },
  {
    Header: 'Phone',
    accessor: 'phone'
  },
  {
    Header: 'Street Address',
    accessor: 'streetaddress'
  },
  {
    Header: 'City',
    accessor: 'city',
    sortType: 'basic'
  },
  {
    Header: 'Postal Code',
    accessor: 'postcode'
  }
];

export const trainingsCol = [
  {
    Header: 'Activity',
    accessor: 'activity',
    sortType: 'basic'
  },
  {
    Header: 'Date',
    accessor: 'date',
    Cell: ({ cell: { value } }) => moment(value).format('DD/MM/YYYY')
  },
  {
    Header: 'Duration',
    accessor: 'duration'
  }
];
