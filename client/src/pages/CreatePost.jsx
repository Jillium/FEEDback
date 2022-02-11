import React, { useEffect, useState, validateEmail } from 'react';


function CreatePost(props) {

    const [
        user = { user }
    ] = props;

    const [formState, setFormState] = useState({ title: '', postBody: '', url: '' });

    const [errorMessage, setErrorMessage] = useState('');

    const { title, postBody, url } = formState;

    function handleChange(e) {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            console.log(isValid);
            // isValid conditional statement
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`);
            } else {
                setErrorMessage('');
            }
        }
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formState);
    }

    return (
        <div>
            <h3>Create New Post Here:</h3>
            <form id="create-post-form" onSubmit={handleSubmit}>
                <div>
                    {/* title */}
                    <label htmlFor="title">Title:</label>
                    <input type="text" defaultValue="A New Hope(Post)" onBlur={handleChange} name="name"></input>
                </div>

                <div>
                    {/* body */}
                    <label htmlFor="postBody" >Description:</label>
                    <input type="text" defaultValue="New website I created, hows the UX?" onBlue={handleChange} name="postBody"></input>
                </div>

                <div>
                    {/* {URL} */}
                    <label htmlFor="url">URL To Live Site:</label>
                    <input type="text" defaultValue="Please Enter full URL Here" onBlue={handleChange}></input>
                    {errorMessage && (
                        <div>
                            <p className="error-text">{errorMessage}</p>
                        </div>
                    )}
                </div>

                <button type="submit">Post!</button>
            </form>
            <h4>Created by: {user}</h4>
        </div>
    )
}

export default CreatePost;