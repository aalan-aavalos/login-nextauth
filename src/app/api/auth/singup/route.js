import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongoose";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    //throw new Error("a")
    await connectDB();
    const { email, password, fullname } = await request.json();

    //Validacion
    if (!password || password.length < 8)
      return NextResponse.json(
        { message: "Contraseña corta" },
        { status: 400 }
      );

    const userFound = await User.findOne({ email });

    if (userFound)
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword, fullname });

    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json(savedUser);
  } catch (error) {
    
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
