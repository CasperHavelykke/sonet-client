import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      body
      user
      sharedPost
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      shareCount
      shares {
        id
        username
        createdAt
      }
    }
  }
`;

export const FETCH_MOST_SHARED_POSTS_QUERY = gql`
  {
    getPosts{
      id
      body
      user
      sharedPost
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      shareCount
      shares {
        id
        username
        createdAt
      }
    }
  }
`;
