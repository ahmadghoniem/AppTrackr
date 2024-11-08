import DataTable from "@/components/data-table"
import { getApplicationData } from "@/lib/actions"
import React from "react"

const page = async () => {
  const applicationData = await getApplicationData()
  return <DataTable applicationData={applicationData} />
}

export default page
