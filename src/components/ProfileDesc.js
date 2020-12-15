import React, { useContext, useState } from 'react';
import { Form, Button, Icon, List, ListContent, Grid } from "semantic-ui-react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import MyPopup from '../util/MyPopup';

function ProfileDesc({user: userId , post:{ description, username }}) {
    const { AuthUser } = useContext(AuthContext);
    const [sent, setSent] = useState(false);

    const [descriptionInput, setDescriptionInput] = useState('')
    
    
    const [updateNames, { error }] = useMutation(UPDATE_DESC_MUTATION, {
        update(_, result){
            console.log(result);
        },
        variables: {
        userId, 
        descriptionInput 
      }})
    
    const onSubmit = (event) => {
        event.preventDefault();
        updateNames();
        setSent(true);
        setDescIsOpened(false);
    }

    const [descIsOpened, setDescIsOpened] = useState(false);
    function toggleDesc() {
      setDescIsOpened(wasOpened => !wasOpened);
    }


        return (
            <Grid.Column className="profile-description">
            {description && (
                <p>{description}  </p>
            )}
            {AuthUser && AuthUser.username === username &&(
                <MyPopup content="Edit profile description">
                    <Button onClick={toggleDesc} size="mini" className="circular ui icon" style={{ marginBottom: 10 }} >
                        <Icon className="edit"></Icon>
                    </Button>
                </MyPopup>
                )}
            {descIsOpened && (
                <div className="form-container">
                <Form onSubmit={onSubmit}>
                    <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                        <textarea
                        placeholder="Description"
                        name="descriptionInput"
                        type="text"
                        value={descriptionInput}
                        onChange={event => setDescriptionInput(event.target.value)}
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
            {sent && (
                <div>
                    <h3>(Reload to see changes)</h3>
                </div>
            )}
            {error}
            </Grid.Column>
        );
    
}

const UPDATE_DESC_MUTATION = gql `
    mutation UpdateDesc($userId: ID!, $descriptionInput: String!){
        updateDesc(userId: $userId, descriptionInput: $descriptionInput){
            description
        }
    }
`

export default ProfileDesc;