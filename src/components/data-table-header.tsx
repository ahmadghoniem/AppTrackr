import React from "react"
import { ApplicationDatum } from "./data-table"
import { flexRender, Table } from "@tanstack/react-table"
import { TableHead, TableHeader, TableRow } from "./ui/table"

const DataTableHeader = ({ table }: { table: Table<ApplicationDatum> }) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </TableHeader>
  )
}

export default DataTableHeader
