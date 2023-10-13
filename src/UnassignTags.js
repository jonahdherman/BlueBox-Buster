import React, { useState } from "react";

const UnassignTags = ({ products, tag_lines, tags, deleteTag_line }) => {
    const [unassignee, setUnassignee] = useState('');
    const [unassignTag, setUnassignTag] = useState('');

    const currentTags = tag_lines.filter(tagLine => tagLine.product_id === unassignee)
            .map(line => tags.find(tag => tag.id === line.tag_id));

    const save = (event) => {
        event.preventDefault();
        const tag_line = tag_lines.find(line => line.product_id === unassignee && line.tag_id === unassignTag)
        deleteTag_line(tag_line);
        setUnassignTag('');
        setUnassignee('');
    }
    return(
        <div>
            <h2>Or</h2>
            <h5>Unassign Tags</h5>
            <form onSubmit={ save }>
                <p>Unassign from...</p>
                <select value={unassignee} onChange={event => setUnassignee(event.target.value)}>
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
                <select value={unassignTag} onChange={event => setUnassignTag(event.target.value)}>
                    <option value={''}>-Select Tag-</option>
                    {
                    currentTags.map(tag => {
                        return(
                            <option key={tag.id} value={tag.id}>
                                {tag.name}
                            </option>
                        );
                    })
                }
                </select>
                <button disabled={ !unassignee || !unassignTag }>Remove Tag</button>
            </form>
        </div>
    );
}

export default UnassignTags;