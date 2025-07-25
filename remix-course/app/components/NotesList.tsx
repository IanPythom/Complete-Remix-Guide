import styles from './NotesList.css';

// Define the Note type
type Note = {
  id: string;
  title: string;
  content: string;
};

// Define component props
interface NoteListProps {
    notes: Note[];
}

function NoteList({ notes }: NoteListProps) {
    if (notes.length === 0) {
        return (
            <div className="info-message">
            <p>No notes found! Please add a note.</p>
            </div>
        );
    }

    return (
      <ul id="note-list">
          {notes.map((note, index) => (
              <li key={note.id} className="note">
                  <article>
                      <header>
                          <ul className="note-meta">
                              <li>#{index + 1}</li>
                              <li>
                                  <time dateTime={note.id}>
                                      {new Date(note.id).toLocaleDateString('en-US', {
                                          day: 'numeric',
                                          month: 'short',
                                          year: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                      })}
                                  </time>
                              </li>
                          </ul>
                          <h2>{note.title}</h2>
                      </header>
                      <p>{note.content}</p>
                  </article>
              </li>
          ))}
      </ul>
  );
}

export default NoteList;
export type { Note };

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}