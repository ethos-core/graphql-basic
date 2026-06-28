import { gql } from '@apollo/client/core';

export const CREATE_POST = gql`
    mutation CreatePost($input: CreatePostInput!) {
        createPost(input: $input) {
        id
        title
        body
        published
        createdAt
        author { id name }
        tags { id name }
        }
    }
`;

export const UPDATE_POST = gql`
    mutation UpdatePost($id: ID!, $input: UpdatePostInput!) {
        updatePost(id: $id, input: $input) {
            id
            title
            body
            published
            updatedAt
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id)
    }
`;
