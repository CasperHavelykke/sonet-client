import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Image,
  Icon,
  Label
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';
import SharePostForm from '../components/SharePostForm';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { AuthUser } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState('');

  
  const { data: { getPost } = {} } = useQuery( FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });


  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }

  const [isOpened, setIsOpened] = useState(false);
  function toggle() {
      setIsOpened(wasOpened => !wasOpened);
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      user,
      sharedPost,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
      shareCount
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
              size="small"
              float="right"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header as={Link} to={`/profile/${user}`}>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
                {sharedPost && (
                <Card.Description><a href={`/posts/${sharedPost}`}>Link</a></Card.Description>
                )}
              </Card.Content>
              <hr />
              <Card.Content extra>
                <LikeButton user={AuthUser} post={{ id, likeCount, likes }} />
                {AuthUser && (
                  <MyPopup content="Share post">
                    <Button as="div" labelPosition="right" onClick={toggle} >
                      <Button color="purple" basic>
                        <Icon name="share" />
                      </Button>
                      <Label basic color="purple" pointing="left">
                        {shareCount}
                      </Label>
                    </Button>
                  </MyPopup>
                  )}
                  {!AuthUser && (
                  <MyPopup content="Share post">
                    <Button labelPosition="right" as={Link} to={`/login`}>
                      <Button color="purple" basic>
                        <Icon name="share" />
                      </Button>
                      <Label basic color="purple" pointing="left">
                        {shareCount}
                      </Label>
                    </Button>
                  </MyPopup>
                )}
                <MyPopup content="Comment on post">
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log('Comment on post')}
                  >
                    <Button basic color="purple">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="purple" pointing="left">
                      {commentCount}
                    </Label>
                  </Button>
                </MyPopup>
                {AuthUser && AuthUser.username === username && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </Card.Content>
                {isOpened && (
                  <Card fluid>
                    <Card.Content>
                      <SharePostForm post={{ id }}/>
                    </Card.Content>
                  </Card>
                )}
            </Card>
            {AuthUser && (
              <Card fluid>
                <Card.Content>
                  <p>Post a comment</p>
                  <Form>
                    <div className="ui action input fluid">
                      <input
                        type="text"
                        placeholder="Comment.."
                        name="comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                        ref={commentInputRef}
                      />
                      <button
                        type="submit"
                        className="ui button red"
                        disabled={comment.trim() === ''}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {AuthUser && AuthUser.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
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

export default SinglePost;
