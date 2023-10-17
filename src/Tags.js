import React, { useState } from "react";
import { Link } from "react-router-dom";
import TagDetails from "./TagDetails";
import CreateTag from "./CreateTag";

const Tags = ({ tags, tag_lines, auth, products, createTag }) => {
    return (
        <div>
            <div>
                <h1>All Tags</h1>
                <ul>
                {
                    tags.map((tag) => {
                        return (
                            <li key={tag.id}>
                                <Link to={`/tags/${tag.id}`} className="tag">
                                    {tag.name}
                                </Link>
                                <TagDetails 
                                    tags = { tags }
                                    tag_lines = { tag_lines }
                                    auth = { auth }
                                    products={ products }
                                    tag = { tag }
                                />
                            </li>
                        );
                    })
                }
                </ul>
            </div>
            {
               auth.is_admin ? (
                    <div>
                        <CreateTag createTag = { createTag }/>
                        <Link to='/tags/edit'>Edit Tags</Link>
                    </div>
               ) : null 
            }
            
        </div>
    );
}

export default Tags;