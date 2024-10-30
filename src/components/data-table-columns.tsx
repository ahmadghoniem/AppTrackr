"use client"

import * as React from "react"
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

export const columns: ColumnDef<ApplicationDatum>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          companyName
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("companyName")}</div>
    )
  },
  {
    accessorKey: "status",
    header: () => <div>status</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("status")}</div>
  },

  {
    accessorKey: "role",
    header: () => <div>role</div>,
    cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>
  },
  {
    accessorKey: "flexibility",
    header: () => <div>flexibility</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("flexibility")}</div>
    )
  },
  {
    accessorKey: "dateApplied",
    // TODO: SORT BY DATE
    header: () => <div>dateApplied</div>,
    cell: ({ row }) => (
      <div className="lowercase">
        {(row.getValue("dateApplied") as Date).toLocaleDateString()}
      </div>
    )
  },
  {
    accessorKey: "postLink",
    header: () => <div>postLink</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("postLink")}</div>
    )
  },
  {
    // Columns require an id when using a non-string header
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel> Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
