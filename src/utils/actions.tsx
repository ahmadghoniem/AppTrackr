import db from "@/utils/db"
export const getApplicationData = () => {
  const Applications = db.application.findMany()
  return Applications
}
