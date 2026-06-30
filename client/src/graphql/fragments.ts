import { gql } from '@apollo/client/core';

export const POST_CARD_FRAGMENT = gql`
    fragment PostCard on Post {
        id
        title
        createdAt
        author {
            id
            name
            avatar
        }
        tags {
            id
            name
        }
    }
`;

export const POST_DETAIL_FRAGMENT = gql`
    fragment PostDetail on Post {
        ...PostCard
        body
        published
        updatedAt
        comments {
            id
            body
            author {
                id
                name
            }
        }
    }
    ${POST_CARD_FRAGMENT}
`;
