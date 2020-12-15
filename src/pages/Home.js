import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Transition } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Home() {
  const { AuthUser } = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery( FETCH_POSTS_QUERY );

  return (
    <Grid columns={1}>
      <Grid.Row className="page-title">
        <h1>Feed</h1>
      </Grid.Row>
      <Grid.Row>
        <div  className="profile-description">
          <p>
              This page shows the most recent posts from your friends
          </p>
        </div>
      </Grid.Row>
      <Grid.Row>
        {AuthUser && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts..</h1>
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

export default Home;
