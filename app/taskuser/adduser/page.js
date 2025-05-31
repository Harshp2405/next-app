
import { PrismaClient } from '@/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

const Adduser = async () => {

    async function Useradd(formdata) {
        'use server'
        
        const prisma = new PrismaClient()
       
        const mydata = {
            UserName: String(formdata.get("UserName")),
            Password: String(formdata.get("Password")),
        }

        const data = await prisma.users.create({
            data: mydata
        })
        console.log("-----------------------------------------------------", formdata)
        console.log("===============================================================", data)
        redirect("/taskuser")
    }

    return (
        <div>
            <form
                action={Useradd}
                className="max-w-md mx-auto p-4 border rounded shadow space-y-4"
            >
                <h2 className="text-xl font-semibold">User Form</h2>

                <div>
                    <label className="block mb-1 font-medium">Username</label>
                    <input
                        type="text"
                        name="UserName"
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="password"
                        name="Password"
                        
                        required
                        className="w-full p-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Adduser