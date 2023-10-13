import React, { useState } from "react";

const CreateTag = ({ createTag }) => {
    const [name, setName] = useState('');

    const save = (event) => {
        event.preventDefault();
        const tag = { name }
        createTag(tag);
        setName('');
    }

    return(
        <div>
            <h3>Create New Tag</h3>
            <form onSubmit={ save }>
                <input 
                    value={ name }
                    onChange={ event => setName(event.target.value)}
                />
                <button disabled={!name}>Create Tag</button>
            </form>
        </div>
    );
}

export default CreateTag;