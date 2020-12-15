import React, { useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, Divider, Form, Grid } from 'semantic-ui-react';
import gql from 'graphql-tag';

import { AuthContext } from '../context/auth';

function TestPage() {
    const { AuthUser } = useContext(AuthContext);

    const userId = AuthUser.id;

    const { loading, data: { getUser } = {} } = useQuery( FETCH_USER_QUERY, {
        update(proxy, result){
            console.log(result)
        },
        variables: {
          userId
        }
    });

    /*
    const [values, setValues] = useState({
        countryInput: '',
        descriptionInput: ''
    });

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value});
    }


    const [updateCountry, { error, loading: mutationLoading } ] = useMutation(UPDATE_COUNTRY_MUTATION, {

        variables: {
        userId,
        ...values
    }
        
    });
    
    const submit = (event) => {
        event.preventDefault();
        updateCountry();
    }


    console.log(values);

        /*
    const [updateCountry] = useMutation(UPDATE_COUNTRY_MUTATION)

    async function submit() {
        await updateCountry({ variables: { userId, values } })
    }
*/ 

      let TestPage;
      if(loading){
        TestPage = (<p>Page Loading...</p>)
      } else {
        const {
            username,
            email,
            createdAt,
            firstName,
            middleNames,
            lastName,
            description,
            homeCity,
            city,
            country,
            mobileNumber,
            maritalStatus,
            education,
            job
        } = getUser;

        TestPage = (
        <Grid columns={1}>
            <Grid.Column>
            <Grid.Row className="page-title">
                <h1>Settings</h1>
            </Grid.Row>
            <Grid.Row>
                <div  className="profile-description">
                <p>
                    This is where the settings would be <br/>
                    This website is part of my bachelors project.
                    The project ends January 8th 2021
                </p>
                </div>
            </Grid.Row>
            {AuthUser && AuthUser.username === username && (
            <Grid.Row >
                <Card fluid style={{marginBottom: 40, marginTop: 40, maxWidth: 500, padding: 20}}>
                    <Card.Content>
                        <h3>You are logged in as: {username}</h3>
                        <Divider/>
                        <h4>Your database info:</h4>
                        <p>
                            <b>username:</b> {username} <br/>
                            <b>email:</b> {email} <br/>
                            <b>Created At:</b> {createdAt} <br/>
                            <b>First Name:</b> {firstName} <br/>
                            <b>Middle Names:</b> {middleNames} <br/>
                            <b>Last Name:</b> {lastName} <br/>
                            <b>Description:</b> {description} <br/>
                            <b>Home City:</b> {homeCity} <br/>
                            <b>City:</b> {city} <br/>
                            <b>Country:</b> {country} <br/>
                            <b>Mobile Number:</b> {mobileNumber} <br/>
                            <b>Marital Status:</b> {maritalStatus} <br/>
                            <b>Education:</b> {education} <br/>
                            <b>Job:</b> {job} <br/>
                        </p>
                    </Card.Content>
                </Card>
            </Grid.Row>
            )}
            </Grid.Column>
        </Grid>
        )
      }

    return TestPage;
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

export default TestPage;