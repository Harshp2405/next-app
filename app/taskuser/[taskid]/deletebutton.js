"use client"

import React from 'react'
export default function DeleteButton({ id, fnToDelete }) {
    const handleClick = async () => {
        console.log('Deleting user with ID:', id)
        await fnToDelete(id)
    }

    return (
        <button onClick={handleClick} className="bg-red-500 text-white px-2 py-1">
            Delete
        </button>
    )
}