import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function GET() {
	try {
		const notes = await prisma.note.findMany();
		if (notes) {
			return NextResponse.json(notes);
		}
		// return NextResponse.json(
		// 	{ message: "there is not notes" },
		// 	{ status: 404 }
		// );
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
	}
}

export async function POST(request: Request) {
	try {
		const { title, content } = await request.json();
		const newNote = await prisma.note.create({
			data: {
				title,
				content,
			},
		});
		return NextResponse.json(newNote);
	} catch (error) {
		// if (error instanceof Prisma.PrismaClientKnownRequestError) {
		// 	return NextResponse.json(
		// 		{ message: "Database error ocurred" },
		// 		{ status: 500 }
		// 	);
		// }
		if (error instanceof PrismaClientKnownRequestError) {
			return NextResponse.json({ message: error.message }, { status: 500 });
		}
	}
}
