import React, { useContext, useState } from 'react';
import { Form, Button, Icon, List, ListContent } from "semantic-ui-react";
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';
import MyPopup from '../util/MyPopup';


function InfoBox({user: userId, post: {
    username,
    homeCity, 
    city, 
    mobileNumber,
    education,
    job,
    maritalStatus
}}) {
    const { AuthUser } = useContext(AuthContext);
    const [sent, setSent] = useState(false);

    /*
    const { onChange, onSubmit, values } = useForm(updateUserCallback, {
        homeCityInput: '',
        cityInput: '',
        mobileNumberInput: '',
        educationInput: '',
        jobInput: '',
        maritalStatusInput: ''
    });

    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
        update(_, result){
            console.log(result);
        },
        variables: {
            userId,
            ...values
        }
    });

    function updateUserCallback() {
    updateUser();
    setSent(true);
    setIsOpened(false);
    }
*/

const [values, setValues] = useState({
    homeCityInput: '',
    cityInput: '',
    mobileNumberInput: '',
    educationInput: '',
    jobInput: '',
    maritalStatusInput: ''
})

const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});
}

const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
    update(_, result){
        console.log(result);
    },
    variables: {
        userId,
        ...values
    }
})

const onSubmit = (event) => {
    event.preventDefault();
    updateUser();
    setSent(true);
    setIsOpened(false);
}


const [isOpened, setIsOpened] = useState(false);
function toggle() {
    setIsOpened(wasOpened => !wasOpened);
    setValues({
        homeCityInput: homeCity, 
        cityInput: city, 
        mobileNumberInput: mobileNumber,
        educationInput: education,
        jobInput: job,
        maritalStatusInput: maritalStatus
    })
}

    return(
        <>
        <List size="big">
            {(homeCity || ( AuthUser && AuthUser.username === username )) && (
                <List.Item>
                <Icon 
                className="home icon" 
                />
                <ListContent>
                    {homeCity}
                    </ListContent>
                </List.Item>
            )}
            {(city || ( AuthUser && AuthUser.username === username )) && ( 
                <List.Item>
                    <Icon 
                    className="map marker icon" 
                    />
                    <ListContent>
                        {city}
                    </ListContent>
                </List.Item>
            )}
            {(mobileNumber || ( AuthUser && AuthUser.username === username )) && (
                <List.Item>
                    <Icon 
                    className="phone icon" 
                    />
                    <ListContent>
                        {mobileNumber}
                    </ListContent>
                </List.Item>
            )}
            {(job || ( AuthUser && AuthUser.username === username )) && (
                <List.Item>
                <Icon 
                className="suitcase icon" 
                />
                <ListContent>
                    {job}
                </ListContent>
            </List.Item>
            )}
            {(education || ( AuthUser && AuthUser.username === username )) && (
                <List.Item>
                <Icon 
                className="university icon" 
                />
                <ListContent>
                    {education}
                </ListContent>
            </List.Item>
            )}
            {(maritalStatus || ( AuthUser && AuthUser.username === username )) && (
                <List.Item>
                <Icon 
                className="heart icon" 
                />
                <ListContent>
                    {maritalStatus}
                </ListContent>
            </List.Item>
            )}
        </List>
        {AuthUser && AuthUser.username === username && (
            <>
            <MyPopup content="Edit Info">
                <Button onClick={toggle} size="mini" className="circular ui icon" style={{ marginBottom: 10 }} >
                    <Icon className="edit"></Icon>
                </Button>
            </MyPopup>
            {isOpened && (
            <Form onSubmit={onSubmit}>
                <p> (You can leave out fields!)</p>
                <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                    <input
                    placeholder="Home City"
                    name="homeCityInput"
                    value={values.homeCityInput}
                    onChange={onChange}
                    />
                </div>
                <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                    <input
                    placeholder="City"
                    name="cityInput"
                    value={values.cityInput}
                    onChange={onChange}
                    />
                </div>
                <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                    <input
                    placeholder="Phone number is disabled"
                    name="mobileNumberInput"
                    value={values.mobileNumberInput}
                    onChange={onChange}
                    disabled={true}
                    />
                </div>
                <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                    <input
                    placeholder="Job"
                    name="jobInput"
                    value={values.jobInput}
                    onChange={onChange}
                    />
                </div>
                <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                    <input
                    placeholder="Education"
                    name="educationInput"
                    value={values.educationInput}
                    onChange={onChange}
                    />
                </div>
                <div className="ui action input fluid" style={{ marginBottom: 10 }}>
                    <input
                    placeholder="Status"
                    name="maritalStatusInput"
                    value={values.maritalStatusInput}
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
            )}
            </>
        )}
        {sent && (
            <div>
                <h3>Info saved!</h3>
                <p>(Reload to see changes)</p>
            </div>
        )}
        </>
    );
}

const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser(
        $userId: ID!,
        $homeCityInput: String,
        $cityInput: String,
        $mobileNumberInput: String,
        $jobInput: String,
        $educationInput: String,
        $maritalStatusInput: String
    ) {
        updateUser(
            userId: $userId,
            updateUserInput: {
                homeCityInput: $homeCityInput,
                cityInput: $cityInput,
                mobileNumberInput: $mobileNumberInput,
                jobInput: $jobInput,
                educationInput: $educationInput,
                maritalStatusInput: $maritalStatusInput
            }
        ) {
            homeCity
            city
            mobileNumber
            job
            education
            maritalStatus
        }
    }
`;


export default InfoBox;