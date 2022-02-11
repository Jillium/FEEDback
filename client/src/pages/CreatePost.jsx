import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '../graphql/mutations';
import { QUERY_POST, QUERY_USER } from '../graphql/queries';

const postForm = () => {
    const [postBody, setBody] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation(ADD_POST, {
    });

    // update state based on form input changes
    const handleChange = (event) => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await addPost({
                variables: { postBody },
            });

            // clear form value
            setBody('');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
            >
                Character Count: {characterCount}/280
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="SoccerPRO"
                    value={title}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <textarea
                    placeholder="Thoughts on UI and UX..."
                    value={postBody}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Post!
                </button>
            </form>
        </div>
    );
};

export default postForm;
