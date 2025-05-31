import { PrismaClient } from '@/prisma'
import React from 'react'
import { redirect } from 'next/navigation'
const Addtask = async () => {


  const prisma = new PrismaClient()
  const userdata = await prisma.users.findMany()

  async function savedata(formdata) {
    "use server"
    const prisma = new PrismaClient()

    const mytask ={
      CreatedAt: new Date(formdata.get("CreatedAt")),
      Status: false,
      Task: String(formdata.get("Task")),
      UserId: String(formdata.get("UserId"))
    }


    const taskdata = await prisma.tasks.create({
      data:mytask
    })

    console.log("-----------------------------------------------------", formdata)
    console.log("===============================================================", taskdata)
    redirect("/taskuser")
  }


  console.log(userdata)

  return (
    <div> 
      Add Task

      <form action={savedata} className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white shadow-md rounded-md space-y-6">
        {/* Task Field */}
        <div>
          <label htmlFor="task" className="block text-sm font-medium text-gray-300">Task</label>
          <input
            type="text"
            id="task"
            name="Task"
            required
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Created At */}
        <div>
          <label htmlFor="createdAt" className="block text-sm font-medium text-gray-300">Created At</label>
          <input
            type="datetime-local"
            id="createdAt"
            name="CreatedAt"
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Status */}
        {/* <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300">Status</label>
          <select
            id="status"
            name="Status"
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="true">Completed</option>
            <option value="false">Pending</option>
          </select>
        </div> */}

        {/* Assigned User */}
        <div>
          <label htmlFor="userId" className="block text-sm font-medium text-gray-300">Assigned User</label>
          <select
            id="userId"
            name="UserId"
            required
            className="mt-1 block w-full border border-gray-700 bg-gray-800 text-white rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select User</option>
            {
              userdata.map((dt, k) => (
                <option value={dt.id} key={k} >{dt.UserName}</option>
              ))
            }
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

export default Addtask