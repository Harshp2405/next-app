import { NextResponse } from "next/server";
import connectToMongo  from "../Lib/mongodb";
import User from "../Model/UserModel"

export async function GET(req) {
    try {
        await connectToMongo(); // Ensure DB is connected
        const users = await User.find(); // Safe to query now
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (err) {
        console.error("Error in GET Users:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToMongo();
        const body = await req.json()
        const newUser = new User(body)
        const saveUser = await newUser.save()
        return NextResponse.json({user : saveUser})

    } catch (error) {
        console.log("POST error")
        return NextResponse.json({ error:"Errorr in post"+error })
    }
}
