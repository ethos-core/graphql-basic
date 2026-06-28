import { useQuery } from '@apollo/client/react';
import { GET_POSTS } from '../graphql/queries';

export function PostsWithErrorBoundary() {
    const { data, loading, error } = useQuery(GET_POSTS, {
        variables: { first: 10 },
        errorPolicy: 'all',
    });

    if (error) {
        if (error.networkError) {
            return (
                <div className="error-banner">
                <p>Network Error: Cannot connect to server</p>
                <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            );
        }

        if (error.graphQLErrors.length > 0) {
            return (
                <div className="error-banner">
                    {error.graphQLErrors.map((err, i) => (
                        <p key={i}>GraphQL Error: {err.message} (code: {err.extensions?.code})</p>
                    ))}
                </div>
            );
        }
    }

    if (loading && !data) return <div className="loading">Loading...</div>;

    const { edges } = data.posts;

    return (
        <div>
            <h2>Posts</h2>
            {edges.map(({ node }: any) => (
                <article key={node.id} className="post-card">
                <h3>{node.title}</h3>
                <p className="meta">
                    by {node.author.name} | {new Date(node.createdAt).toLocaleDateString()}
                </p>
                <p>{node.body}</p>
                <div className="tags">
                    {node.tags.map((t: any) => (
                    <span key={t.id} className="tag">#{t.name}</span>
                    ))}
                </div>
                </article>
            ))}
        </div>
    );
}
