import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Form } from 'semantic-ui-react';

import { useForm } from '../util/hooks';
import { FETCH_POSTS_QUERY } from '../util/graphql';


function SharePostForm({ post: { id }}) {
  const [sent, setSent] = useState(false);

  const { values, onChange, onSubmit } = useForm(sharePostCallback, {
    body: '',
    postId: id
  });

  const [sharePost, { error }] = useMutation(SHARE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.sharePost, ...data.getPosts];
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
      values.body = '';
    }
  });

  function sharePostCallback() {
    sharePost();
    setSent(true);
  }

    return (
      <>
        <p>Write a message with the shared post</p>
        <Form onSubmit={onSubmit}>
          <div className="ui action input fluid">
            <input
                placeholder="Message"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
              />
              <button 
              type="submit" 
              className="ui button red"
              color="red"
              >
                Share
              </button>
          </div>
        </Form>
        {sent && (
            <div>
                <h3>Post was send! (Reload to see changes)</h3>
            </div>
        )}
        {error && (
          <div className="ui error message" style={{ marginBottom: 20, marginTop: -10 }}>
            <ul className="list">
              <li>{error.graphQLErrors[0].message}</li>
            </ul>
          </div>
        )}
      </>
    );
}



export default SharePostForm;

const SHARE_POST_MUTATION = gql`
  mutation SharePost($postId: ID!, $body: String!){
    sharePost(postId: $postId, body: $body) {
      id
      body
      user
      sharedPost
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      shares {
        id
        username
        createdAt
        user
      }
      shareCount
    }
  }

`;