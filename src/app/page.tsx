"use client"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"

const Page = () => {
  const [count, setCount] = useState<number>(0)
  console.log("test -rerenders")
  return (
    <div>
      page
      <Button onClick={() => setCount((e) => e + 1)}>{count}</Button>
    </div>
  )
}

export default Page
