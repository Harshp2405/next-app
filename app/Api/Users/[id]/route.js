import { NextResponse } from "next/server";
import connectToMongo from "../../Lib/mongodb";
import User from "../../Model/UserModel"

export async function GET(req, { params }) {
    try {
        await connectToMongo();
        const user = await User.findById(params.id); // ✅ Correct field
        if (!user) {
            return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });
        }
        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (err) {
        console.error("Error in GET /Api/Users/[id]:", err);
        return new NextResponse(JSON.stringify({ error: err.message }), { status: 500 });
    }
}

export async function PUT(req, context) {
    try {
        await connectToMongo();

        const body = await req.json();
        const userId = context.params.id; // ✅ Proper access to dynamic route param

        const result = await User.findByIdAndUpdate(
            userId,
            { name: body.name },
            { new: true } // Return the updated document
        );

        if (!result) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error in PUT /Api/Users/[id]:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(req, context) {
    try {
        await connectToMongo();
        const userId = context.params.id;

        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted", user: result });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function PATCH(req, context) {
    try {
        await connectToMongo();
        const userId = context.params.id;
        const updates = await req.json();

        const result = await User.findByIdAndUpdate(userId, { $set: updates }, { new: true });

        if (!result) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("PATCH Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}