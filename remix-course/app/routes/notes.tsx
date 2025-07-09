import NewNote, { links as newNoteLinks } from '~/components/NewNotes'
import newNoteStyles from '~/components/NewNotes'

export default function Notes () {
    return (
        <main>
            <NewNote />
        </main>
    )
}

export function links() {
    return [...newNoteLinks()]; // Surfacing links
}