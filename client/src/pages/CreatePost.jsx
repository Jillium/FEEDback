import React, { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../graphql/mutations';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';

const PostForm = () => {
    const [postBody, setBody] = useState('');
    const [title, setTitle] = useState('');
    const [postLink, setPostLink] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const [redirectFlag, setRedirectFlag] = useState(false);
    const [addPost, { error }] = useMutation(ADD_POST);

    const loggedIn = Auth.loggedIn();
    if (!loggedIn) {
        return <Redirect to="/login" />;
    } else {
        if (redirectFlag) {
            return <Redirect to="/dashboard" />;
        }
    }



    // update state based on form input changes
    const handleTitleChange = (event) => {
        if (event.target.value.length <= 280) {
            setTitle(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleBodyChange = (event) => {
        if (event.target.value.length <= 280) {

            setBody(event.target.value);


            setCharacterCount(event.target.value.length);
        }
    };

    const handlePostLinkChange = (event) => {
        if (event.target.value.length <= 280) {
            setPostLink(event.target.value);

            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        let username = '';
        if (loggedIn) {
            username = Auth.getProfile().data.username;
        } else {
            username = '';
        }

        try {

            await addPost({
                variables: { username, title, postBody, postLink },
            });

            // clear form value
            setBody('');
            setTitle('');
            setPostLink('')
            setCharacterCount(0);

            // Auth.getProfile().data.username
            //return <Redirect to="/dashboard" />;
            return window.location.assign('/dashboard');

        } catch (e) {
            console.error(e);
        }

    };

    return (
        <div className="create-post-cont">
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''} charcount`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <div className="text-area">
                    <label>Title:</label>
                    <textarea
                        placeholder="SoccerPRO"
                        value={title}
                        className="form-input col-12 col-md-9"
                        onChange={handleTitleChange}
                    ></textarea>
                </div>
                <div className="text-area">
                    <label>Description:</label>
                    <textarea
                        placeholder="Thoughts on UI and UX..."
                        value={postBody}
                        className="form-input col-12 col-md-9"
                        onChange={handleBodyChange}
                    ></textarea>
                </div>

                <div className="text-area">
                    <label>Live Site URL:</label>
                    <textarea
                        placeholder="Enter your WWW..."
                        value={postLink}
                        className="form-input col-12 col-md-9"
                        onChange={handlePostLinkChange}
                    ></textarea>
                </div>
                <button className="btn col-12 col-md-3" type="submit">
                    Post!
                </button>
            </form>
        </div>
    );
};

export default PostForm;
