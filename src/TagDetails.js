import React from "react";
import { Link, useParams } from "react-router-dom";

const TagDetails = ({ tag_lines, products, tag }) => {
    const { term } = useParams();
    if (!products.length) {
        return null;
    }
    return (
        <div className="container">
            <div className="tagDetails">
                {
                    tag.id === term ? (
                        <ul>
                            {
                                tag_lines.filter(tagline => tagline.tag_id === term)
                                    .map(tagline => products.find(product => product.id === tagline.product_id))
                                    .map(product => {
                                        return (
                                            <li key={product.id} onClick={()=> scroll(0, -1000)}>
                                                <Link to={`/products/${product.id}`}>
                                                    {product.name}
                                                </Link>
                                            </li>
                                        );
                                    })
                            }
                        </ul>
                    ) : null
                }
            </div>
        </div>
    );
}

export default TagDetails;