import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag';

import PostCard from '../components/PostCard';

function Top(){
    const { loading, data: { getTopLikedPosts: posts } = {} } = useQuery( FETCH_TOP_LIKED_POSTS_QUERY );

    return (
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Top Posts</h1>
      </Grid.Row>
      <Grid.Row>
        <div  className="profile-description">
          <p>
              This page shows the most liked posts
          </p>
        </div>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <div>
          <h1>Loading posts..</h1>
          <p>May take a while. (refresh won't work unless on the "top" page)</p>
          </div>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
    );
} 

export const FETCH_TOP_LIKED_POSTS_QUERY = gql`
  {
    getTopLikedPosts{
      id
      body
      user
      sharedPost
      createdAt
      username
      likeCount
      likesCount
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

export default Top;