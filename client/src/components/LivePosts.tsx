import { useQuery } from '@apollo/client/react';
import { GET_POSTS } from '../graphql/queries';

export function LivePosts() {
    const { data, loading, startPolling, stopPolling, refetch } = useQuery(GET_POSTS, {
      variables: { first: 10 },
      pollInterval: 30000,
    });

    if (loading && !data) return <div>Loading...</div>;

    return (
      <div>
        <button onClick={() => refetch()}>Refresh</button>
        <button onClick={() => startPolling(5000)}>Start Polling (5s)</button>
        <button onClick={() => stopPolling()}>Stop Polling</button>
        {data?.posts.edges.map(({ node }: any) => (
          <article key={node.id}>
            <h3>{node.title}</h3>
            <p>by {node.author.name}</p>
          </article>
        ))}
      </div>
    );
}
