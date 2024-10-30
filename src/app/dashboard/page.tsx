import DataTable, { Payment } from "@/components/data-table"
import { getApplicationData } from "@/utils/actions"
import React from "react"

const data: Promise<Payment[]> = new Promise((res) =>
  setTimeout(res, 2000, [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com"
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com"
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com"
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com"
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com"
    }
  ])
)
const page = async () => {
  const data = await getApplicationData()
  return <DataTable data={data} />
}

export default page
