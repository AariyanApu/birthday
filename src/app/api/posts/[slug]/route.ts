import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Delete a post by slug
export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  const { slug } = params;
  var id = slug;
  try {
    // Delete the post by slug
    const deleteResult = await prisma.post.delete({
      where: {
        id,
      },
    });

    // Check if the post was successfully deleted
    if (!deleteResult) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }),
    );
  } catch (error) {
    console.error("Error deleting post:", error);

    // Log the complete error object
    console.error("Complete error object:", error);

    // Return a more detailed error response
    return new NextResponse(
      JSON.stringify({ error: "Database Error", details: error }),
      { status: 500 },
    );
  }
};
