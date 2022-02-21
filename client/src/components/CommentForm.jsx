import React, { useState } from 'react';
import { ADD_COMMENT } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import Auth from "../utils/auth";



const CommentForm = ({ postId }) => {
    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);
    const loggedIn = Auth.loggedIn();

    const [addComment, { error}] = useMutation(ADD_COMMENT);

    const handleChange = event => {
        if (event.target.value.length <= 250) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit =async event => {
        event.preventDefault();
        let username = '';
        if (loggedIn) {
            username = Auth.getProfile().data.username;
        }
        try {
            await addComment({
                variables: { commentText, postId, username }
            });
            setText('');
        setCharacterCount(0);

        // return window.location.assign('/dashboard');

        } catch (e) {
            console.error(e);
        }
        
        
    };


    return (
        <div>
            <p>Character Count: {characterCount}/250
            {error && <span className="ml-2">Something went wrong...</span>}</p>
            <form className='comment-form'
            onSubmit={handleFormSubmit}>
                <textarea
                placeholder="Please give me FEEDback...."
                value={commentText}
                onChange={handleChange}>

                </textarea>
            <button type="submit">Submit</button>    
            </form>
        </div>
    );
};

export default CommentForm;


