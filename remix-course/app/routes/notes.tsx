import { redirect } from '@remix-run/node';
import NewNote, { links as newNoteLinks } from '~/components/NewNotes'
import NoteList, { links as noteListLinks } from '~/components/NewNotes'
import { getStoredNotes, storeNotes } from '~/data/notes';
import type { ActionFunctionArgs } from "@remix-run/node";

// A get request only brings this notes
export default function Notes () {
    return (
        <main>
            <NewNote />
            <NoteList />
        </main>
    )
}

// loader is a reserved name
// triggered when the get request reaches the route
export function loader() {

}

// Server side code for non get requests
// Typescript requires explicit type definition in strict mode
export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData(); 
    // const noteData = {
    //     title: formData.get('title')
    //     content: formData.get('content')
    // };

    // Shortcut
    const noteData = Object.fromEntries(formData);

    // It is important to add validation here

    const existingNotes = await getStoredNotes(); // Utility function for getting notes
    noteData.id = new Date().toISOString(); 
    // concatinate the new data with the old
    const updatedNotes = existingNotes.concat(noteData);
    await storeNotes(updatedNotes);
    return redirect('/notes'); // redirect user to the same page 
}

export function links() {
    return [...newNoteLinks(), ...noteListLinks()]; // Surfacing links
}