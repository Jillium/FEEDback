import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../graphql/mutations';
import { Redirect } from 'react-router-dom';
import Auth from '../graphql/auth';

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
            postLink: 'http://'
        }
    );
    // State for keep character counts
    const [characterCountState, setCharacterCountState] = useState(
        {
            title: postFormState.title.length,
            postBody: postFormState.postBody.length,
            postLink: postFormState.postLink.length
        }
    );
    const [addPost, { error }] = useMutation(ADD_POST);

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
        postFormState.postLink = postFormState.postLink.trim();
        let linkHead = postFormState.postLink.substring(0, 4).toLowerCase();
        if (linkHead !== 'http') {
            postFormState.postLink = 'http://' + postFormState.postLink;
        }

        try {
            await addPost({
                variables: { username, ...postFormState },
            });
            // clear form value
            setPostFormState({
                title: '',
                postBody: '',
                postLink: 'http://'
            });
            setCharacterCountState({
                title: postFormState.title.length,
                postBody: postFormState.postBody.length,
                postLink: postFormState.postLink.length
            });

            return window.location.assign('/dashboard');

        } catch (e) {
            console.error(e);
        }

    };

    const loggedIn = Auth.loggedIn();
    if (!loggedIn) {
        return <Redirect to="/login" />;
    }

    return (

        <div className="padding-top">

            <h2 className="bg-dark text-secondary p-3 display-inline-block">
                Show us your new Creation!
            </h2>

            <div className="create-post-cont">

                <form
                    className="flex-row justify-center justify-space-between-md align-stretch"
                    onSubmit={handleFormSubmit}
                >
                    <p
                        className={`m-0 ${characterCountState.title === characterLimit.title || error ? 'text-error' : ''} charcount margin-top-sm`}
                    >
                        Title Character Count: {characterCountState.title}/{characterLimit.title}
                        {error && <span className="ml-2">Title is too long...</span>}
                    </p>

                    <div className="text-area mt-1">
                        <label>Title:</label>
                        <textarea
                            placeholder="SoccerPRO"
                            name='title'
                            value={postFormState.title}
                            className="form-input col-12 col-md-9"
                            onChange={handlePostFormChange}
                        ></textarea>
                    </div>

                    <p
                        className={`m-0 ${characterCountState.postBody === characterLimit.postBody || error ? 'text-error' : ''} charcount margin-top-sm`}
                    >
                        Description Character Count: {characterCountState.postBody}/{characterLimit.postBody}
                        {error && <span className="ml-2">Description is too long...</span>}
                    </p>

                    <div className="text-area mt-1">
                        <label>Description:</label>
                        <textarea
                            placeholder="Thoughts on UI and UX..."
                            name='postBody'
                            value={postFormState.postBody}
                            className="form-input col-12 col-md-9"
                            onChange={handlePostFormChange}
                        ></textarea>
                    </div>

                    <p
                        className={`m-0 ${characterCountState.postLink === characterLimit.postLink || error ? 'text-error' : ''} charcount margin-top-sm`}
                    >
                        Link Character Count: {characterCountState.postLink}/{characterLimit.postLink}
                        {error && <span className="ml-2">Link is too long...</span>}
                    </p>

                    <div className="text-area mt-1">
                        <label>Live Site URL:</label>
                        <textarea
                            placeholder="Enter your WWW..."
                            name='postLink'
                            value={postFormState.postLink}
                            className="form-input col-12 col-md-9"
                            onChange={handlePostFormChange}
                        ></textarea>
                    </div>
                    <button className="btn col-12 col-md-3 light-color" type="submit">
                        Post!
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostForm;
