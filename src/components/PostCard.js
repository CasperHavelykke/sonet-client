import React, { useContext, useState } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';
import SharePostForm from '../components/SharePostForm';

function PostCard({
  post: { body, 
    createdAt, 
    id, 
    user, 
    sharedPost,
    username,
    likeCount, 
    commentCount, 
    shareCount,
    likes,
    shares
   }
}) {
  const { AuthUser } = useContext(AuthContext);

  const [isOpened, setIsOpened] = useState(false);
  function toggle() {
      setIsOpened(wasOpened => !wasOpened);
  }

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header as={Link} to={`/profile/${user}`}>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
        {sharedPost && (
        <Card.Description><a href={`/posts/${sharedPost}`}>Link</a></Card.Description>
        )}
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={AuthUser} post={{ id, likes, likeCount }} />
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
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="purple" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="purple" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>
        {AuthUser && AuthUser.username === username && <DeleteButton postId={id} />}
      </Card.Content>
      {isOpened && (
        <Card fluid>
          <Card.Content>
            <SharePostForm post={{ id }}/>
          </Card.Content>
        </Card>
      )}
    </Card>
  );
}

export default PostCard;
