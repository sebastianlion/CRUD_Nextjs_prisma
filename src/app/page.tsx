"use client";
import { useEffect } from "react";

import { useNotes } from "@/context/NoteContext";
import NoteForm from "@/components/NoteForm";
import NotedCard from "@/components/NoteCard";

function HomePage() {
	const { notes, loadNotes } = useNotes();

	useEffect(() => {
		loadNotes();
	}, []);
	return (
		<div className="flex items-center justify-center h-screen">
			<div>
				<NoteForm />

				{notes && notes.map((note) => <NotedCard note={note} key={note.id} />)}
			</div>
		</div>
	);
}

export default HomePage;
