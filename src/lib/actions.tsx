"use server"
// data mutations using server actions

import { ApplicationDatum } from "@/components/data-table"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export const getApplicationData = async () => {
  const Applications = await db.application.findMany()
  return Applications
}

export const updateApplicationData = async (
  recordId: string,
  columnId: keyof ApplicationDatum,
  value: unknown
) => {
  const Applications = await db.application.update({
    where: {
      id: recordId
    },
    data: {
      [columnId]: value
    }
  })
  return Applications
}

export const createApplicationData = async () => {
  const Applications = await db.application.create({
    data: {
      companyName: "",
      category: "",
      role: "",
      status: ""
    }
  })
  revalidatePath("/dashboard")
  return Applications
}
export const deleteApplicationData = async (id: string) => {
  const deleteApplication = await db.application.delete({
    where: {
      id
    }
  })
  revalidatePath("/dashboard")
  return deleteApplication
}
