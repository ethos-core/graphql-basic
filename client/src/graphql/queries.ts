import { gql } from '@apollo/client/core';

export const GET_POSTS = gql`
    query GetPosts($first: Int!, $after: String, $filter: PostFilter) {
        posts(first: $first, after: $after, filter: $filter) {
            edges {
                node {
                    id
                    title
                    body
                    published
                    createdAt
                    author {
                        id
                        name
                    }
                    tags {
                        id
                        name
                    }
                }
                cursor
            }
            pageInfo {
                hasPageNext
                endCursor
            }
        }
    }
`
