import React, { useState } from "react";
import { Link } from "react-router-dom";
import TagDetails from "./TagDetails";
import CreateTag from "./CreateTag";

const Tags = ({ tags, tag_lines, auth, products, createTag }) => {
    return (
        <div className="container">
            <div className="mainPage">
                <h1>All Tags</h1>
                <div className="tagsPage">
                    <div>
                        
                        <ul>
                            {
                                tags.map((tag) => {
                                    return (
                                        <li key={tag.id}>
                                            <Link to={`/tags/${tag.id}`} className="tag">
                                                <h3>{tag.name}</h3>
                                            </Link>
                                            <TagDetails
                                                tags={tags}
                                                tag_lines={tag_lines}
                                                auth={auth}
                                                products={products}
                                                tag={tag}
                                            />
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </div>
                </div>
            
            {
                auth.is_admin ? (
                    <div>
                        <CreateTag createTag={createTag} />
                        <Link to='/tags/edit' onClick={() => scroll(0, 2000)}>Edit Tags</Link>
                    </div>
                ) : null
            }
            </div>
        </div>
    );
}

export default Tags;