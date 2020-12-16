import React, { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Form, Icon, Button, Divider, Grid, Image, Transition } from 'semantic-ui-react';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import InfoBox from '../components/InfoBox';
import ProfileDesc from '../components/ProfileDesc';
import MyPopup from '../util/MyPopup';

function Profile(props) {
    const userId = props.match.params.userId;
    const { data: { getUser } = {} } = useQuery( FETCH_USER_QUERY, {
        variables: {
          userId
        }
      });
      const { loading, data: { getUserPosts: userPosts } = {} } = useQuery( FETCH_USERPOSTS_QUERY, {
        variables: { userId }
      });

    const { AuthUser } = useContext(AuthContext);
    const [sent, setSent] = useState(false);

    const [values, setValues] = useState({
      firstNameInput: '',
      middleNamesInput: '',
      lastNameInput: ''
  })
  
  const onChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value});
  }
  
  const [updateNames, { error }] = useMutation(UPDATE_NAMES_MUTATION, {
      update(_, result){
          console.log(result);
      },
      variables: {
      userId, 
      ...values 
    }})
  
  const onSubmit = (event) => {
      event.preventDefault();
      updateNames();
      setSent(true);
      setIsOpened(false);
  }

    /*
    const { onChange, onSubmit, values } = useForm(updateNamesCallback, {
      userId, 
      firstNameInput: '',
      middleNamesInput: '',
      lastNameInput: ''
  });

  const [updateNames] = useMutation(UPDATE_NAMES_MUTATION, {
      update(_, result){
          console.log(result);
      },
      variables: values
  });

  function updateNamesCallback() {
  updateNames();
  }
*/

    const [isOpened, setIsOpened] = useState(false);
    

    let profileMarkup;
    if (!getUser) {
      profileMarkup = <p>Loading profile..</p>;
    } else {
        const {
            username,
            firstName,
            middleNames,
            lastName
        } = getUser;
        
        function toggleName() {
          setIsOpened(wasOpened => !wasOpened);
          setValues({
            firstNameInput: firstName,
            middleNamesInput: middleNames,
            lastNameInput: lastName

          })
      }

        profileMarkup = (
            <Grid columns={1}>
                <Grid.Row style={{ padding: 20, alignContent: 'end'}} className="profile-cover-pic-container">
                <p style={{ color: 'white' }}><b>images not yet replaceable</b></p>

                </Grid.Row>
                <Grid.Row>
                    <Image 
                        className="profile-pic"
                        size="small" 
                        avatar
                        centered
                        src="https://pure-citadel-69042.herokuapp.com/images/unsplash-profile-pic.jpg"
                    />
                </Grid.Row>
                <Grid.Row className="profile-name">
                    <Grid.Row>
                    {(firstName || middleNames || lastName) && (
                      <h1>{firstName} {middleNames} {lastName}</h1>
                    )}
                    {AuthUser && AuthUser.username === username &&(
                      <MyPopup content="Edit name" >
                          <Button onClick={toggleName} size="mini" className="circular ui icon" style={{ marginBottom: 10 }} >
                              <Icon className="edit"></Icon>
                          </Button>
                      </MyPopup>
                        )}
                    </Grid.Row>
                  {sent && (
                      <div>
                          <h3>Saved! (Reload to see changes)</h3>
                      </div>
                  )}
                  {isOpened && (
                    <div  className="form-container">
                      <p style={{fontSize: 14}}>(You don't need to fill out all fields)</p>
                      <Form onSubmit={onSubmit}>
                        <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                            <input
                            placeholder="First Name"
                            name="firstNameInput"
                            value={values.firstNameInput}
                            onChange={onChange}
                            />
                        </div>
                        <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                            <input
                            placeholder="Middle Name"
                            name="middleNamesInput"
                            value={values.middleNamesInput}
                            onChange={onChange}
                            />
                        </div>
                        <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                            <input
                            placeholder="Last Name"
                            name="lastNameInput"
                            value={values.lastNameInput}
                            onChange={onChange}
                            />
                        </div>
                        <button 
                        type="submit" 
                        className="ui button red"
                        color="red"
                        >
                            Save
                        </button>
                      </Form>
                    </div>
                  )}
                </Grid.Row>
                <Grid.Row>
                  <ProfileDesc user={ userId } post={ getUser } />
                </Grid.Row>
                <Divider/>
                <Grid.Row>
                  <Grid.Column>
                      <InfoBox user={ userId } post={ getUser } />
                  </Grid.Column>
                </Grid.Row>
                <Divider />
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
                            {userPosts &&
                              userPosts.map((userPost) => (
                                  <Grid.Column key={userPost.id} style={{ marginBottom: 20 }}>
                                      <PostCard post={userPost} />
                                  </Grid.Column>
                            ))}
                        </Transition.Group>
                    )}
                </Grid.Row>
                 {error}
            </Grid>
        );
    }
    return profileMarkup;

}


const FETCH_USER_QUERY = gql`
  query($userId: ID!){
    getUser(userId: $userId) {
      id
      username
      email
      createdAt
      firstName
      middleNames
      lastName
      description
      homeCity
      city
      country
      mobileNumber
      maritalStatus
      education
      job
    }
  }
`;

const FETCH_USERPOSTS_QUERY = gql`
  query($userId: ID!){
    getUserPosts(user: $userId){
      id
      body
      user
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
    }
  }
`;

const UPDATE_NAMES_MUTATION = gql`
  mutation UpdateNames(
    $userId: ID!
    $firstNameInput: String
    $middleNamesInput: String
    $lastNameInput: String
  ) {
    updateNames(userId: $userId 
      updateNamesInput:{
        firstNameInput: $firstNameInput
        middleNamesInput: $middleNamesInput
        lastNameInput: $lastNameInput
      }
    ) {
      firstName
      middleNames
      lastName
    }
  }
`
export default Profile;