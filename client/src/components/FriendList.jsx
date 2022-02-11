import React from 'react';

const FriendList = ({ users }) => {

    // conditionally renders if there are no posts yet 

    if (!users.length) {
        return <h3>Your friend list is empty!</h3>
    }

    return (
        <div>
            <h3>Friends Go Here</h3>
        </div>
    )
}

export default FriendList;