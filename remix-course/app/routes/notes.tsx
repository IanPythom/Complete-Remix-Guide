import NewNote, { links as newNoteLinks } from '~/components/NewNote';
import NoteList, { links as noteListLinks } from '~/components/NotesList';
import { getStoredNotes, storeNotes } from '~/data/notes';
import type { ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useLoaderData, useRouteError, isRouteErrorResponse, Link } from '@remix-run/react';
import type { Note } from '~/components/NotesList';

// A get request only brings this notes
export default function Notes () {
    const notes = useLoaderData<Note[]>();
    const actionData = useActionData<{ message?: string }>();
    
    return (
      <main>
        <NewNote />
        {actionData?.message && (
          <p className='info-message'>{actionData.message}</p>
        )}
        <NoteList notes={notes}/>
      </main>
    )
}   

// loader is a reserved name
// triggered when the get request reaches the route
export async function loader() {
  try {
    const notes = await getStoredNotes();
    if (!notes || notes.length === 0) {
      throw new Response("No notes found! Please add a note.", { status: 404, statusText: "No Notes" });
    }
    return notes;
  } catch (error) {
    throw new Response("Could not load notes! (File missing or misspelled)", { status: 500, statusText: "Internal Server Error" });
  }
}

// Server side code for non get requests
// Typescript requires explicit type definition in strict mode
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData(); 
  const noteData = Object.fromEntries(formData);

  // Validation formData.get('title') returns a FormDataEntryValue, which can be a string or a File.
  if (typeof noteData.title !== 'string' || noteData.title.trim().length < 5) {
      return { message: 'Invalid title - must be at least 5 characters long. Status code 400' };
  }

  try {
    const existingNotes = await getStoredNotes();
    noteData.id = new Date().toISOString();
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return { success: true };
  } catch (error) {
    throw new Response("Could not save note", {
      status: 500,
      statusText: "Server Error"
    });
  }
}


export function links() {
    return [...newNoteLinks(), ...noteListLinks()]; // Surfacing links
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <main className='error'>
        <NewNote />
        <p>{error.status} {error.statusText}</p>
        <p>{error.data}</p>
        <p>
          Back to <Link to="/">safety</Link>
        </p>
      </main>
    );
  }
  // fallback for unexpected errors
  return (
    <main className='error'>
      <NewNote />
      <h1>An error occurred!</h1>
      <p>Something went wrong.</p>
      <p>
        Back to <Link to="/">safety</Link>
      </p>
    </main>
  );
}