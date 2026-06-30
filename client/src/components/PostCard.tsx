import { POST_CARD_FRAGMENT } from '../graphql/fragments';

interface PostCardProps {
  post: {
    id: string;
    title: string;
    createdAt: string;
    author: { id: string; name: string; avatar: string | null };
    tags: { id: string; name: string }[];
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p className="meta">by {post.author.name} &middot; {post.createdAt}</p>
      <div className="tags">
        {post.tags.map((t) => (
          <span key={t.id} className="tag">{t.name}</span>
        ))}
      </div>
    </article>
  );
}

PostCard.fragments = { post: POST_CARD_FRAGMENT };
