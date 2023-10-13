import React, { useState } from "react";

const AssignTags = ({ products, tag_lines, tags, createTag_line }) => {
    const [assignee, setAssignee] = useState('');
    const [assignTag, setAssignTag] = useState('');

    const currentTags = tag_lines.filter(tagLine => tagLine.product_id === assignee)
    const availableTags = tags.filter(tag => !currentTags.find(line => line.tag_id === tag.id))

    const save = (event) => {
        event.preventDefault();
        const newTag_line = {
            product_id: assignee,
            tag_id: assignTag
        }
        createTag_line(newTag_line);
        setAssignTag('');
        setAssignee('');
    }
    return(
        <div>
            <h5>Assign Tags</h5>
            <form onSubmit={ save }>
                <p>Assign...</p>
                <select value={assignee} onChange={event => setAssignee(event.target.value)}>
                    <option value={''}>-Select Product-</option>
                    {
                        products.map(product => {
                            return(
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            );
                        })
                    }
                </select>
                <p>the Tag...</p>
                <select value={assignTag} onChange={event => setAssignTag(event.target.value)}>
                    <option value={''}>-Select Tag-</option>
                    {
                    availableTags.map(tag => {
                        return(
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        );
                    })
                }
                </select>
                <button disabled={ !assignee || !assignTag }>Assign Tag!</button>
            </form>
        </div>
    );
}

export default AssignTags;