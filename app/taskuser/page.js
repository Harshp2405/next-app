import { PrismaClient } from '@/prisma'
import Link from 'next/link'
import React from 'react'


const TaskUser = async () =>  {
    
    const prisma = new PrismaClient()
    // const data = await prisma.users.findMany()
    const data = await prisma.users.findMany({ include: { tasks:true}})
    console.log(data)
  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-4 mb-6">
        <Link href="/taskuser/adduser">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded bg-green-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            ➕ Add User
          </button>
        </Link>
        <Link href="/taskuser/addtask">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            📝 Add Task
          </button>
        </Link>
      </div>

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((d, ind) => (
            <div
              key={ind}
              className="rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold text-gray-100 mb-2">
                User: {d.UserName}
              </h2>
              <Link
                href={`/taskuser/${d.id}`}
                className="text-sm text-blue-600 hover:underline"
              >
                ➤ View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>

  )
}

export default TaskUser