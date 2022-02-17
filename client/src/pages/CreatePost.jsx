import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../graphql/mutations';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';

const PostForm = () => {
    // Store limit of text inputs
    const characterLimit = {
        title: 100,
        postBody: 280,
        postLink: 100
    }
    // State for postForm input
    const [postFormState, setPostFormState] = useState(
        {
            title: '',
            postBody: '',
            postLink: ''
        }
    );
    // State for keep character counts
    const [characterCountState, setCharacterCountState] = useState(
        {
            title: 0,
            postBody: 0,
            postLink: 0
        }
    );
    const [addPost, { error }] = useMutation(ADD_POST);

    const loggedIn = Auth.loggedIn();

    // update state based on form input changes
    const handlePostFormChange = (event) => {
        const { name, value } = event.target;
        if (value.length <= characterLimit[name]) {
            setPostFormState({
                ...postFormState,
                [name]: value,
            });
            setCharacterCountState({
                ...characterCountState,
                [name]: value.length,
            });
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let username = '';
        if (loggedIn) {
            username = Auth.getProfile().data.username;
        } 

        try {
            await addPost({
                variables: { username, ...postFormState },
            });
            // clear form value
            setPostFormState({
                title: '',
                postBody: '',
                postLink: ''
            });
            setCharacterCountState({
                title: 0,
                postBody: 0,
                postLink: 0
            });
            
            //return <Redirect to="/dashboard" />;
            return window.location.assign('/dashboard');

        } catch (e) {
            console.error(e);
        }

    };

    return (
        <div>
            <p
                className={`m-0 ${characterCountState.title === characterLimit.title || error ? 'text-error' : ''}`}
            >
                Title Character Count: {characterCountState.title}/{characterLimit.title}
                {error && <span className="ml-2">Title is too long...</span>}
            </p>
            <p
                className={`m-0 ${characterCountState.postBody === characterLimit.postBody || error ? 'text-error' : ''}`}
            >
                Description Character Count: {characterCountState.postBody}/{characterLimit.postBody}
                {error && <span className="ml-2">Description is too long...</span>}
            </p>
            <p
                className={`m-0 ${characterCountState.postLink === characterLimit.postLink || error ? 'text-error' : ''}`}
            >
                Link Character Count: {characterCountState.postLink}/{characterLimit.postLink}
                {error && <span className="ml-2">Link is too long...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <label>Title:</label>
                <textarea
                    name="title"
                    placeholder="SoccerPRO"
                    value={postFormState.title}
                    className="form-input col-12 col-md-9"
                    onChange={handlePostFormChange}
                ></textarea>

                <label>Description:</label>
                <textarea
                    name="postBody"
                    placeholder="Thoughts on UI and UX..."
                    value={postFormState.postBody}
                    className="form-input col-12 col-md-9"
                    onChange={handlePostFormChange}
                ></textarea>
                <label>Live Site URL:</label>
                <textarea
                    name="postLink"
                    placeholder="Enter your WWW..."
                    value={postFormState.postLink}
                    className="form-input col-12 col-md-9"
                    onChange={handlePostFormChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Post!
                </button>
            </form>
        </div>
    );
};

export default PostForm;
