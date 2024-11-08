import React from "react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Table } from "@tanstack/react-table"
import { ApplicationDatum } from "./data-table"

const dataTableFilter = ({ table }: { table: Table<ApplicationDatum> }) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter by company name..."
        value={
          (table.getColumn("companyName")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("companyName")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default dataTableFilter
