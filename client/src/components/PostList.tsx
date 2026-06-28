import { useQuery } from '@apollo/client/react';
import { GET_POSTS } from '../graphql/queries';

export function PostList() {
    const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
        variables: { first: 10 },
    });

    if (loading && !data) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error.message}</div>;

    const { edges, pageInfo } = data.posts;

    const loadMore = () => {
        fetchMore({
            variables: { after: pageInfo.endCursor },
        });
    };

    return (
        <div>
            <h2 className="post-list-header">Posts</h2>
            {edges.map(({ node }: any) => (
                <article key={node.id} className="post-card">
                    <h3>{node.title}</h3>
                    <p className="meta">by {node.author.name} &middot; {node.createdAt}</p>
                    <div className="tags">
                        {node.tags.map((t: any) => (
                            <span key={t.id} className="tag">{t.name}</span>
                        ))}
                    </div>
                </article>
            ))}
            {pageInfo.hasPageNext && (
                <button className="btn-load-more" onClick={loadMore}>Load More</button>
            )}
        </div>
    )
}
