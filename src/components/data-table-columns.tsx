"use client"

// named imports are often preferred for optimal tree-shaking.
import { useState, useEffect } from "react"
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons"
import { ColumnDef } from "@tanstack/react-table"
import { type ApplicationDatum } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import Editor from "./Editor"
import { deleteApplicationData } from "@/lib/actions"

// TODO: get possible select values from db + preferred

const defaultColumn: Partial<ColumnDef<ApplicationDatum>> = {
  cell: ({ getValue, row, column, table }) => {
    const columnId = column.id as keyof ApplicationDatum // which data column we are using
    const rowIndex = row.index // get record.id from row.index
    const initialValue = getValue()
    const recordId = row.original.id
    const columnMeta = column.columnDef.meta
    const updateData = (value) =>
      table.options.meta?.updateData(
        getValue,
        rowIndex,
        columnId,
        recordId,
        value
      )
    return (
      <Editor
        updateData={updateData}
        initialValue={initialValue}
        columnMeta={columnMeta}
      />
    )
  }
}

const columns: ColumnDef<ApplicationDatum>[] = [
  {
    // Columns require an id when using a non-string header
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Company Name
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    meta: {
      editorType: "input",
      placeholder: "Enter Company Name"
    }
  },
  {
    accessorKey: "category",
    header: "Category",
    meta: {
      editorType: "select",
      selectOptions: [
        { value: "full-time", label: "Full-Time" },
        { value: "part-time", label: "Part-Time" },
        { value: "contract", label: "Contract" },
        { value: "internship", label: "Internship" },
        { value: "freelance", label: "Freelance" }
      ],
      placeholder: "Category"
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: {
      editorType: "select",
      selectOptions: [
        { value: "applied", label: "Applied", color: "#B3CCE5" },
        { value: "interviewing", label: "Interviewing", color: "#FFD966" },
        {
          value: "technical",
          label: "Technical Interview",
          color: "#FFAB40"
        },
        { value: "offer", label: "Offer Received", color: "#81C784" },
        { value: "accepted", label: "Accepted", color: "#4CAF50" },
        { value: "rejected", label: "Rejected", color: "#B0BEC5" },
        { value: "ghosted", label: "No Response", color: "#CFD8DC" },
        { value: "withdrawn", label: "Withdrawn", color: "#90A4AE" }
      ],
      placeholder: "Status"
    }
  },
  {
    accessorKey: "flexibility",
    header: "Flexibility",
    meta: {
      editorType: "select",
      selectOptions: [
        { value: "remote", label: "Remote", color: "#81C784" },
        { value: "hybrid", label: "Hybrid", color: "#CFD8DC" },
        { value: "onsite", label: "On-site", color: "#B0BEC5" },
        { value: "not-specified", label: "Not Specified", color: "#90A4AE" }
      ],
      placeholder: "Work Location"
    }
  },
  {
    accessorKey: "role",
    header: "Role",
    meta: {
      editorType: "input",
      placeholder: "Enter position role"
    }
  },
  {
    accessorKey: "dateApplied",
    header: "Date Applied",
    sortingFn: "datetime", // recommended for date columns
    // TODO: SORT BY DATE
    meta: {
      editorType: "datepicker"
    }
  },
  {
    accessorKey: "postLink",
    header: "Post Link",
    meta: {
      editorType: "input",
      placeholder: "Enter job post link"
    }
  },
  {
    accessorKey: "location",
    header: "Location",

    meta: {
      editorType: "input",
      placeholder: "Enter job location"
    }
  },
  {
    accessorKey: "createdAt",
    sortingFn: "datetime", // recommended for date columns
    meta: {
      editorType: "datepicker",
      placeholder: "Enter job location"
    }
  },

  {
    // Columns require an id when using a non-string header
    id: "actions",
    enableHiding: false,
    cell: ({ cell, row, column, table }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel> Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <button
              onClick={() => {
                deleteApplicationData(row.original.id)
                // Calculate pagination details
                const PageCount = table.getPageCount()
                const RowCount = table.getRowCount()
                const pageSize = table.getState().pagination.pageSize
                const isLastRowOnPage = RowCount % pageSize === 1

                // If it's the last row on the page, navigate to the previous page
                if (isLastRowOnPage && PageCount > 1) {
                  table.previousPage()
                }
              }}
            >
              remove
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
]
export { columns, defaultColumn }
