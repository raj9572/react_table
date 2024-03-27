/* eslint-disable react/jsx-key */

import './App.css'
import { useTable, useSortBy, usePagination } from 'react-table'
import { data } from "./data.json"
// import Home from './components/Home'


// const data = [
//   { id: 1, gender: 'male', salary: 50000 },
//   { id: 2, gender: 'female', salary: 60000 },
//   { id: 3, gender: 'male', salary: 55000 },
//   { id: 4, gender: 'female', salary: 65000 },
//   { id: 5, gender: 'male', salary: 52000 }
// ];

const columns = [
  {
    Header: "ID",
    accessor: "id"
  },
  {
    Header: "Name",
    accessor: "name"
  },
  {
    Header: "Gender",
    accessor: "gender"
  },
  {
    Header: "Salary",
    accessor: "salary",
    sortType: 'basic'
  }
]

function App() {

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state:{pageIndex},
    pageCount,
    gotoPage 
  } = useTable(
    {
      columns,
       data,
       initialState:{pageSize:5}
    },
    useSortBy,
    usePagination
  )

  // const props = getTableProps()
  // console.log('props',props)
  return (
    <div className='container'>
      <table border={1} {...getTableProps()}>
        <thead >


          {
            headerGroups.map((hg, i) => (
              <tr key={i} {...hg.getHeaderGroupProps()}>

                {
                  hg.headers.map((column) => (
                    <th  {...column.getHeaderProps(column.getSortByToggleProps())}>
                      {column.render("Header")}
                      <span>
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                    </th>
                  ))
                }
              </tr>
            ))

          }


        </thead>
        <tbody {...getTableBodyProps()}>

          {
            page.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {
                    row.cells.map((cell, i) => (
                      <td key={i} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))
                  }
                </tr>)
            })
          }

        </tbody>
      </table>

      <div>
        <button disabled={pageIndex === 0} onClick={() => gotoPage(0)}>First</button>
        <button disabled={!canPreviousPage} onClick={previousPage}>prev</button>
        <span>
          {pageIndex + 1} of {pageCount}
        </span>
        <button disabled={!canNextPage} onClick={nextPage}>next</button>
        <button disabled={pageIndex >= pageCount - 1} onClick={() => gotoPage(pageCount - 1)}>Last</button>
      </div>

    </div>
  )
}

export default App
