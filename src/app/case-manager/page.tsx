import { z } from "zod"
import path from "path"
import { promises as fs } from "fs"
import { DataTable } from "@/components/data-table/data-table"
import { taskSchema } from "@/data/schema"
import { columns } from "@/components/data-table/columns"

// Simulate a database read for tasks.
async function getTasks() {
    const data = await fs.readFile(
      path.join(process.cwd(), "/src/data/tasks.json") 
    )
  
    const tasks = JSON.parse(data.toString())
  
    return z.array(taskSchema).parse(tasks)
  }

export default async function CaseManager() {
    const tasks = await getTasks()
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
          </div>
          <DataTable data={tasks} columns={columns} />
          </div>
    )
}