"use client"

import { useState, useEffect, useRef, useCallback, useReducer } from "react"
import {
  // ColumnFiltersState,
  // SortingState,
  // VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  RowData,
  SortingState
} from "@tanstack/react-table"
import {
  createApplicationData,
  getApplicationData,
  updateApplicationData
} from "@/lib/actions"
export type ApplicationData = Awaited<ReturnType<typeof getApplicationData>>
export type ApplicationDatum = ApplicationData[number]

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: keyof ApplicationDatum,
      value: unknown
    ) => void
    editorType: string
  }
}

import { Table } from "@/components/ui/table"
import DataTableFilter from "./data-table-filter"
import { columns, defaultColumn } from "@/components/data-table-columns"
import DataTablePagination from "./data-table-pagination"
import DataTableHeader from "./data-table-header"
import DataTableBody from "./data-table-body"
import useSkipper from "@/hooks/useSkipper"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

// Give our default column cell renderer editing superpowers!

export default function DataTable({
  applicationData
}: {
  applicationData: ApplicationData
}) {
  // async getApplicationData is called in the server rendered page.tsx and passed to this client component to a useState

  const [data, setData] = useState(applicationData)
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  useEffect(() => {
    skipAutoResetPageIndex()
    setData(applicationData)
  }, [applicationData])
  console.log(data)
  // to be able to overwrite the internal automatically-managed state (columnFilter/sorting/columnVisibility/rowSelection) to produce the final state for the table.
  // log the output of columnFilter and use it to get the desired output by passing it to setColumnFilter

  // const [sorting, setSorting] = useState<SortingState>([])
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  // const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  // const [rowSelection, setRowSelection] = useState({})
  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(), // a must
    getSortedRowModel: getSortedRowModel(), // to be able to sort using toggleSorting found in data-table-columns
    getFilteredRowModel: getFilteredRowModel(), // to be able to filter using filter by company name
    getPaginationRowModel: getPaginationRowModel(), // to be able to use pagination functionality
    autoResetPageIndex: autoResetPageIndex,

    // autoResetExpanded,
    // onPaginationChange: setPagination,
    // onColumnFiltersChange: setColumnFilters,
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5
      },
      columnVisibility: {
        createdAt: false,
        select: false
      },
      sorting: [
        {
          id: "createdAt",
          desc: false
        }
      ]
    },
    meta: {
      updateData: async (getValue, rowIndex, columnId, recordId, value) => {
        if (getValue() === value) return
        // Skip page index reset until after next rerender]
        skipAutoResetPageIndex()
        const res = await updateApplicationData(recordId, columnId, value)
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value
              }
            }
            return row
          })
        )
      }
    }
  })
  console.log(table.getCanNextPage()) // access the sorting state from the table instance
  return (
    <div className="w-full ">
      <div className="flex justify-between items-center">
        <DataTableFilter table={table} />
        <Button
          onClick={() => {
            createApplicationData()
            const numberOfPages = table.getPageCount()
            const pageSize = table.getState().pagination.pageSize
            const numberOfRows = table.getRowCount()
            const pageIndex = table.getState().pagination.pageIndex
            if (
              numberOfRows === pageSize * numberOfPages ||
              table.getCanNextPage()
            ) {
              table.setPageIndex(pageIndex + 1) // Sets the page index to the last page.
            }
          }}
        >
          <Plus /> add a new record
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <DataTableHeader table={table} />
          <DataTableBody table={table} />
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}
