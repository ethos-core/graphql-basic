import { gql } from '@apollo/client/core';
import { POST_CARD_FRAGMENT } from './fragments';

export const GET_POSTS = gql`
    query GetPosts($first: Int!, $after: String, $filter: PostFilter) {
        posts(first: $first, after: $after, filter: $filter) {
            edges {
                node {
                    ...PostCard
                }
                cursor
            }
            pageInfo {
                hasPageNext
                endCursor
            }
        }
    }
    ${POST_CARD_FRAGMENT}
`
