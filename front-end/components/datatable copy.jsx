import React from 'react'
import {MaterialReactTable,useMaterialReactTable,
} from "material-react-table"



const Datatable = ({columns,data,...Option}) => {
const table =useMaterialReactTable({
    columns,
    data,
    ...Option,
})

  return (
    <MaterialReactTable table={table}/>
  )
}

export default DataTable;