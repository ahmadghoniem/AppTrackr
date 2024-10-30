import db from "@/utils/db"
// to run the seed file pnpx tsx ./seed.ts
// you could have used node ./seed.ts but this is only if it was a js file and node doesn't support running ts files
// up until V22.6.0 you can use --experimental-strip-types flag to strip types and doesn't validate them though

function rand(arr) {
  const len = arr.length
  const rand = ~~(Math.random() * len)
  return arr[rand]
}
async function main() {
  // Seed job applications
  for (let j = 1; j <= 5; j++) {
    await db.application.create({
      data: {
        role: rand(["software-engineer", "frontend-developer"]),
        companyName: rand(["Meta", "Google", "Noon", "Snapchat"]),
        status: rand(["Applied", "Rejected", "Ghosted", "Interviewing"]),
        category: rand(["Full-time", "part-time"]),
        flexibility: rand(["on-site", "remote", "hybrid"]),
        location: rand(["Alexandria,Egypt", "San-fransisco"])
      }
    })
  }
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })
