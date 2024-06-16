import prisma from "@/utils/connect";
import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/options";

// Fetch All Post
export const GET = async (req: Request) => {
  const session = await getAuthSession();
  const userEmail = session?.user.email ?? undefined;
  try {
    const posts = await prisma.post.findMany({
      where: {
        userEmail: userEmail,
      },
    });

    return new NextResponse(JSON.stringify(posts));
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

// Create New post
export const POST = async (req: Request) => {
  // const session = await getAuthSession();

  // if (!session) {
  //   return new NextResponse(
  //     JSON.stringify({ message: 'Not Authenticated!' }, { status: 401 })
  //   );
  // }

  try {
    const body = await req.json();
    console.log(body);
    const posts = await prisma.post.create({
      data: body,
    });

    return new NextResponse(JSON.stringify(posts));
    // return new NextResponse(JSON.stringify({ status: 200 }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong with fucking database!",
      }),
    );
  }
};
