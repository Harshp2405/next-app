import { PrismaClient } from '@/prisma'
import Link from 'next/link'
import React from 'react'
import DeleteButton from './deletebutton'
import { revalidatePath } from 'next/cache'


const ByidDetails = async ({params}) => {
  const {taskid} = await params
  const userid = taskid
  const prisma = new PrismaClient()
  const data = await prisma.tasks.findMany({
    where: {
      UserId: userid
    },
  })
  const username = await prisma.users.findMany({
    where: {
      id: userid
    },
  })

  async function deleteUser(id) {
    'use server'
    const prisma = new PrismaClient()
    await prisma.tasks.delete({
      where: { id: id },
    })
    console.log('Deleted user with ID:', id)
    // You must import this from 'next/cache'
    revalidatePath('/taskuser')
  }

  console.log(username)
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Link href="/taskuser">
        <button className="mb-6 inline-flex items-center gap-2 rounded bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400">
          ← Back
        </button>
      </Link>
      <Link className='ml-5' href="/taskuser/addtask">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded bg-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          📝 Add Task
        </button>
      </Link>
      <h1 className="text-3xl font-bold mb-6">
        Tasks for{' '}
        <span className="text-blue-700">
          {username[0]?.UserName || 'Unknown User'}
        </span>
      </h1>

      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((task) => (
            <div
              key={task.id}
              className="rounded border border-gray-200 p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {task.Task}
                </h2>
                <span
                  className={`text-sm font-medium ${task.Status ? 'text-green-600' : 'text-red-500'
                    }`}
                >
                  {task.Status ? '✅ Completed' : '❌ Pending'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Created:{' '}
                <em>
                  {task.CreatedAt
                    ? new Date(task.CreatedAt).toLocaleString()
                    : 'No date'}
                </em>
              </p>

              <div className="flex gap-4">
                <Link href={`updatetask/${task.id}`}>
                  <button className="text-sm px-4 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition">
                    Edit Task
                  </button>
                </Link>

                <DeleteButton
                  id={task.id}
                  fnToDelete={deleteUser}
                  className="text-sm px-4 py-1 rounded bg-red-500 text-white hover:bg-red-600 transition"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks found for this user.</p>
      )}
    </div>

  )
}
{/* <Link href={"updatetask/" + task.id}> <li>Edit Task</li></Link> */}
export default ByidDetails