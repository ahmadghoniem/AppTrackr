import React from "react"
import { TableBody, TableCell, TableRow } from "./ui/table"
import { ApplicationDatum } from "./data-table"
import { flexRender, Table } from "@tanstack/react-table"
import { columns } from "@/components/data-table-columns"

const DataTableBody = ({ table }: { table: Table<ApplicationDatum> }) => {
  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

export default DataTableBody
