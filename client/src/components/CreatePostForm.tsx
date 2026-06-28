import { useMutation } from '@apollo/client/react';
import { CREATE_POST } from '../graphql/mutations';
import { GET_POSTS } from '../graphql/queries';

export function CreatePostForm() {
    const [createPost, { loading }] = useMutation(CREATE_POST, {
        refetchQueries: [{ query: GET_POSTS, variables: { first: 10 } }],
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const form = new FormData(formEl);
        await createPost({
            variables: {
                input: {
                    title: form.get('title') as string,
                    body: form.get('body') as string,
                    published: form.get('published') === 'on',
                }
            }
        });
        formEl.reset();
    }

    return (
        <form className="create-form" onSubmit={handleSubmit}>
            <h2>Create Post</h2>
            <input type="text" name="title" placeholder="Title" required />
            <textarea name="body" placeholder="Body" rows={3} required />
            <div className="form-footer">
                <label className="checkbox-label">
                    <input type="checkbox" name="published" /> Publish
                </label>
                <button type="submit" className="btn-submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Create Post'}
                </button>
            </div>
        </form>
    );
}
