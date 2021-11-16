import React from 'react';
import { useFilters, useSortBy, useTable } from 'react-table';
import styled from 'styled-components';

function TextFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

const Tables = ({ columns, data }) => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TextFilter
    }),
    []
  );

  const Styles = styled.div`
    table {
      border-spacing: 0;
      border: 1px solid black;
      width: '100%';
      tr {
        :last-child {
          td {
            border-bottom: 0;
          }
        }
      }

      th,
      td {
        padding: 0.5rem;
        border-bottom: 1px solid black;
        border-right: 1px solid black;
        width: 15%;

        :last-child {
          border-right: 0;
        }
      }

      th {
        background: '';
        border-bottom: 3px solid blue;
        color: black;
      }
    }
  `;
  const { getTableProps, headerGroups, rows, getTableBodyProps, prepareRow } =
    useTable(
      {
        columns,
        data,
        defaultColumn
      },
      useFilters,
      useSortBy
    );

  return (
    <>
      <Styles>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    <div {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? ' 🔽'
                            : ' 🔼'
                          : ''}
                      </span>
                    </div>
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Styles>
    </>
  );
};

export default Tables;
