import { PrismaClient } from '@/prisma'
import React from 'react'
import { redirect } from 'next/navigation'

const Updatetask = async ({params}) => {
  const {id} = await params
  const prisma = new PrismaClient()
  const Taskdata = await prisma.tasks.findUnique({ where: { id: id } });

  async function savedata(formdata) {
    "use server"
    console.log(formdata.get("Status"))
    const task = {
      CreatedAt: new Date(formdata.get("CreatedAt")),
      UpdateAt: new Date(),
      // Status:Boolean(formdata.get("Status")),
      Status:Boolean(formdata.get("Status") === "true" ? true : false),
      Task: String(formdata.get("Task")),
      UserId: String(formdata.get("UserId"))
    }

console.log(task)
    const prisma = new PrismaClient()
    await prisma.tasks.update({ data: task, where: { id: id } })
    redirect("/taskuser")
  }


  console.log(id)
  // console.log(Taskdata)

  return (
    <div>Update
      <form action={savedata} className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-md rounded-md space-y-6">
        {/* Task Field */}
        <div>
          <label htmlFor="task"  className="block text-sm font-medium text-gray-300">Task</label>
          <input
            type="text"
            readOnly
            id="task"
            name="Task"
            defaultValue={Taskdata.Task}
            required
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* {User Id} */}
        
          <input
            type="text"
            readOnly
            hidden
            id="UserId"
            name="UserId"
            defaultValue={Taskdata.UserId}
            required
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />

        {/* Created At */}
        <div>
          
          <input
          hidden
            type="text"
            id="createdAt"
            name="CreatedAt"
            defaultValue={Taskdata.CreatedAt.toLocaleDateString("en-CA")}
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Update At */}
        <div >
          
          <input
          hidden
            type="text"
            id="createdAt"
            name="UpdateAt"
            defaultValue={Taskdata.CreatedAt.toLocaleDateString("en-CA")}
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
          <select
            id="status"
            name="Status"
            defaultValue={Taskdata.Status ?true : false}
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={true}>Completed</option>
            <option value={false}>Pending</option>
          </select>

        </div>


        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Task
          </button>
        </div>
      </form>
    </div>
  )
}

export default Updatetask