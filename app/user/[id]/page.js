import React from 'react';
import { PrismaClient } from '@/prisma'

const Getbyid = async ({ params }) => {
    const { id } = await params;

    const prisma = new PrismaClient();
    const data = await prisma.foods.findUnique({
        where: {
            id: id, //
        },
    })
console.log(id)
console.log(data)

return (
    <div>
        
            <>
                <p>User ID: {data.id_}</p>
                <p>Foodname: {data.Foodname}</p>
                <p>Image: {data.image}</p>
                <p>Price: {data.price}</p>
                <p>Description: {data.Fooddescription}</p>
                <p>Category: {data.category}</p>
            </>
    </div>
);
};

export default Getbyid;
