import { data, Form,  useNavigation, useActionData } from '@remix-run/react';
import newNoteStyles from './NewNote.css'

function NewNote () {
    const data = useActionData<{ message?: string }>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method="post" id="note-form">
            {data?.message && <p>{data.message}</p>}
            <p>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" required />
            </p>
            <p>
                <label htmlFor="content">Content</label>
                <textarea id="content" name="content" rows={5} required />
            </p>
            <div className="form-actions">
                <button disabled={isSubmitting}>
                    {isSubmitting ? 'Adding... ' : 'Add Note'}
                </button>
            </div>
        </Form>
    );
}

export default NewNote;

export function links() {
    return [{rel: 'stylesheet', href: newNoteStyles}];
}