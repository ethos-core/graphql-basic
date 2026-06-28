import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        avatar: String!
        posts: [Post!]!
        createdAt: String!
    }
    
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
        tags: [Tag!]!
        createdAt: String!
        updatedAt: String!
    }

    type Comment {
        id: ID!
        body: String!
        author: User!
        post: Post!
        createdAt: String!
    }

    type Tag {
        id: ID!
        name: String!
        posts: [Post!]!
    }
    
    type PostConnection {
        edges: [PostEdge!]!
        pageInfo: PageInfo!
    }

    type PostEdge {
        node: Post!
        cursor: String!
    }

    type PageInfo {
        hasPageNext: Boolean!
        hasPagePrevious: Boolean!
        startCursor: String
        endCursor: String
    }

    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean
        tagIds: [ID!]
    }

    input UpdatePostInput {
        title: String
        body: String
        published: Boolean
        tagIds: [ID!]
    }

    input CreateCommentInput {
        body: String!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        posts(first: Int, after: String, filter: PostFilter): PostConnection!
        post(id: ID!): Post
        tags: [Tag!]!
    }

    input PostFilter {
        published: Boolean
        authorId: ID
        tagId: [ID!]
        search: String
    }

    type Mutation {
        createPost(input: CreatePostInput!): Post!
        updatePost(id: ID!, input: UpdatePostInput!): Post!
        deletePost(id: ID!): Boolean!
        createComment(postId: ID!, input: CreateCommentInput!): Comment!
        deleteComment(id: ID!): Boolean!
    }

    type Subscription {
        postCreated: Post!
        commentAdded(postId: ID!): Comment!
    }
`

const users = [
    { id: '1', name: 'Taro Tanaka', email: 'tanaka@example.com', avatar: null, createdAt: '2024-01-15' },
    { id: '2', name: 'Hanako Sato', email: 'sato@example.com', avatar: null, createdAt: '2024-02-20' },
    { id: '3', name: 'Ichiro Suzuki', email: 'suzuki@example.com', avatar: null, createdAt: '2024-03-10' },
];

const tags = [
    { id: '1', name: 'TypeScript' },
    { id: '2', name: 'React' },
    { id: '3', name: 'GraphQL' },
    { id: '4', name: 'Performance' },
];

const posts = [
    { id: '1', title: 'Introduction to GraphQL', body: 'GraphQL is...', published: true, authorId: '1', tagIds: ['3'], createdAt: '2024-04-01', updatedAt: '2024-04-01' },
    { id: '2', title: 'Complete Guide to React Hooks', body: 'Hooks are...', published: true, authorId: '2', tagIds: ['2'], createdAt: '2024-04-05', updatedAt: '2024-04-06' },
    { id: '3', title: 'New Features in TypeScript 5.0', body: 'In TS5...', published: true, authorId: '1', tagIds: ['1'], createdAt: '2024-04-10', updatedAt: '2024-04-10' },
    { id: '4', title: 'Performance Optimization', body: 'Web performance is...', published: false, authorId: '3', tagIds: ['4', '2'], createdAt: '2024-04-15', updatedAt: '2024-04-15' },
];

const comments = [
    { id: '1', body: 'Very helpful, thanks!', authorId: '2', postId: '1', createdAt: '2024-04-02' },
    { id: '2', body: 'Clear and easy to understand', authorId: '3', postId: '1', createdAt: '2024-04-03' },
    { id: '3', body: 'Hooks are awesome!', authorId: '1', postId: '2', createdAt: '2024-04-06' },
];

const resolvers = {
    Query: {
        users: () => users,
        user: (_: any, { id }: { id: string}) => users.find((u) => u.id === id),
        posts: (_: any, { first, after, filter }: { first: number, after: string, filter: any}) => {
            let filtered = [...posts];
            if (filter?.published !== undefined) filtered = filtered.filter((p) => p.published === filter.published);
            if (filter?.authorId) filtered = filtered.filter((p) => p.authorId === filter.authorId);
            if (filter?.search) filtered = filtered.filter((p) => p.title.includes(filter.search) || p.body.includes(filter.search));

            const startIndex = after ? filtered.findIndex((p) => p.id === after) + 1 : 0;
            const sliced = filtered.slice(startIndex, startIndex + first);

            return {
                edges: sliced.map((node) => ({ node, cursor: node.id })),
                pageInfo: {
                hasPageNext: startIndex + first < filtered.length,
                hasPagePrevious: startIndex > 0,
                startCursor: sliced[0]?.id || null,
                endCursor: sliced[sliced.length - 1]?.id || null,
                },
                totalCount: filtered.length,
            };
        },
        post: (_: any, { id }: { id: string }) => posts.find((p) => p.id === id),
        tags: () => tags,
    },
    Post: {
        author: (post: any) => users.find((u) => u.id === post.authorId),
        comments: (post: any) => comments.filter((c) => c.postId === post.id),
        tags: (post: any) => tags.filter((t) => post.tagIds.includes(t.id)),
    },
    Comment: {
        author: (comment: any) => users.find((u) => u.id === comment.authorId),
        post: (comment: any) => posts.find((p) => p.id === comment.postId),
    },
    User: {
        posts: (user: any) => posts.filter((p) => p.authorId === user.id),
    },
    Tag: {
        posts: (tag: any) => posts.filter((p) => p.tagIds.includes(tag.id)),
    },
    Mutation: {
        createPost: (_: any, { input }: { input: any }) => {
            const newPost = {
                id: String(posts.length + 1),
                title: input.title,
                body: input.body,
                published: input.published ?? false,
                authorId: '1',
                tagIds: input.tagIds ?? [],
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0],
            };
            posts.push(newPost);
            return newPost;
        },
        updatePost: (_: any, { id, input }: { id: string, input: any }) => {
            const post = posts.find((p) => p.id === id);
            if (!post) throw new Error(`Post not found: ${id}`);
            if (input.title !== undefined) post.title = input.title;
            if (input.body !== undefined) post.body = input.body;
            if (input.published !== undefined) post.published = input.published;
            if (input.tagIds !== undefined) post.tagIds = input.tagIds;
            post.updatedAt = new Date().toISOString().split('T')[0];
            return post;
        },
        deletePost: (_: any, { id }: { id: string }) => {
            const index = posts.findIndex((p) => p.id === id);
            if (index === -1) return false;
            posts.splice(index, 1);
            return true;
        },
        createComment: (_: any, { postId, input }: { postId: string, input: any }) => {
            const newComment = {
                id: String(comments.length + 1),
                body: input.body,
                authorId: '1',
                postId,
                createdAt: new Date().toISOString().split('T')[0],
            };
            comments.push(newComment);
            return newComment;
        },
        deleteComment: (_: any, { id }: { id: string }) => {
            const index = comments.findIndex((c) => c.id === id);
            if (index === -1) return false;
            comments.splice(index, 1);
            return true;
        },
    },
}

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
