import React, { useState } from "react";
import AssignTags from "./AssignTags";
import UnassignTags from "./UnassignTags";

const EditTags = ({ products, tag_lines, tags, createTag_line, deleteTag_line }) => {

    
    return(
        <div className="container">
            <div className="mainPage">
            <AssignTags products={products} tag_lines={tag_lines} tags={tags} createTag_line={createTag_line} />
            <UnassignTags products={products} tag_lines={tag_lines} tags={tags} deleteTag_line={deleteTag_line} />
            </div>
        </div>
    );
}

export default EditTags;