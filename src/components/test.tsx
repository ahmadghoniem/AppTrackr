"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useEffect, useState } from "react"
import { getApplicationData } from "@/lib/actions"
type ApplicationData = Awaited<ReturnType<typeof getApplicationData>>
type ApplicationDatum = ApplicationData[number]

export const useDefaultColumn: Partial<ColumnDef<ApplicationDatum>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  }
}
