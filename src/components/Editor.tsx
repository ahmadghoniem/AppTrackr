"use client"

import React, { ReactNode, useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Input } from "./ui/input"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

// When the input is blurred, we'll call our table meta's updateData function

type EditorProps = {
  columnMeta?: string
  initialValue: unknown
  updateData: (value: unknown) => void
}

const Editor = ({ columnMeta, initialValue, updateData }: EditorProps) => {
  // We need to keep and update the state of the cell normally controlled value
  const [value, setValue] = useState(initialValue)
  const handleChange = (newValue) => setValue(newValue)
  const editorType = columnMeta.editorType
  const placeholder = columnMeta.placeholder
  const options = columnMeta.selectOptions
  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  switch (editorType) {
    case "input":
      return (
        <Input
          value={value as string}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
          onBlur={(e) => updateData(e.target.value)}
        />
      )
      break
    case "datepicker":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !value && "text-muted-foreground"
              )}
            >
              <CalendarIcon />
              {value ? format(value as Date, "PP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={(value) => (setValue(value), updateData(value))}
              required
              initialFocus
            />
          </PopoverContent>
        </Popover>
      )
      break
    case "select":
      const selectedColor =
        options.find((opt) => opt.value === value)?.color || ""
      return (
        <Select
          value={(value as string) || ""}
          onValueChange={(value) => (setValue(value), updateData(value))}
        >
          <SelectTrigger
            style={{ "--selected-color": selectedColor }}
            className="bg-[--selected-color] select-none"
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map(
              (option: { value: string; label: string; color: string }) => {
                return (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    style={{ "--option-color": option.color }}
                    className="bg-[var(--option-color)]"
                  >
                    {option.label}
                  </SelectItem>
                )
              }
            )}
          </SelectContent>
        </Select>
      )
      break
    default:
      return <div>{value as ReactNode}</div>
      break
  }
}

export default Editor
