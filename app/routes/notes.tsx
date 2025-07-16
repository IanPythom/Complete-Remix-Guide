import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NotesList';
import { getStoredNotes, storeNotes } from '~/data/notes';
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from '@remix-run/node';
import { useActionData, useLoaderData } from '@remix-run/react';
import type { Note } from '~/components/NotesList';
import { Link } from "@remix-run/react";

// A get request only brings this notes
export default function Notes () {
    const notes = useLoaderData<Note[]>();
    // const error = useActionData<{ message?: string }>();
    
    return (
        <main>
            <NewNote />
            <NoteList notes={notes}/>
        </main>
    )
}   

// loader is a reserved name
// triggered when the get request reaches the route
export async function loader() {
  try {
    const notes = await getStoredNotes();
    return notes;
  } catch (error) {
    throw new Error("Could not load notes! (File missing or misspelled)");
  }
}

// Server side code for non get requests
// Typescript requires explicit type definition in strict mode
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData(); 
    const noteData = Object.fromEntries(formData);

    // Validation formData.get('title') returns a FormDataEntryValue, which can be a string or a File.
    if (typeof noteData.title !== 'string' || noteData.title.trim().length < 5) {
        return { message: 'Invalid title - must be at least 5 characters long.' };
    }

    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString(); 
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    // await new Promise<void>((resolve) => setTimeout(resolve, 2000));
    // Option 1: return { success: true }; // stays on page, revalidates loader
    // Option 2: return redirect('/notes'); // also works, but triggers navigation
    return { success: true };
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()]; // Surfacing links
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <main className='error'>
        <h1>An error occurred!</h1>
        <p>{error.message}</p>
        <p>
            Back to <Link to="/">safety</Link>
        </p>
    </main>
  );
}