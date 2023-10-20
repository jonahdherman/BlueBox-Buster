import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const UpdateProduct = ({ products, updateProduct }) => {
    const { id } = useParams();
    const product = products.find(product => product.id === id);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const product = products.find(product => product.id === id);
        if (product) {
            setName(product.name);
            setPrice((product.price / 100).toFixed(2));
            setDescription(product.description);
            setError('');
        }
    }, [products]);

    if (!product) {
        return null;
    }

    const save = async (event) => {
        event.preventDefault();
        const updatedProduct = {
            ...product,
            name,
            price: price * 100,
            description
        }
        try {
            updateProduct(updatedProduct);
            navigate('/products');

        } catch (err) {
            setError(err.data.message)
        }
    }

    return (
        <div id='flexer'>
        <div className="container">
            <div className="mainPage editproduct">
            <h2>Edit Product: {product.name}</h2>
            {
                error ? JSON.stringify(error, null, 2) : null
            }
            <form onSubmit={save}>
                <input
                    placeholder={product.name}
                    value={name}
                    maxLength={100}
                    onChange={event => setName(event.target.value)}
                />
                <input
                    type='number'
                    placeholder={(product.price / 100).toFixed(2)}
                    value={price}
                    min='0.01'
                    step='0.01'
                    onChange={event => setPrice(event.target.value)}
                />
                <textarea
                    value={description}
                    rows={10}
                    placeholder={product.description}
                    onChange={event => setDescription(event.target.value)}
                ></textarea>
                <button type='submit'>Update</button>
            </form>
            <div>
                <Link to='/products'>Cancel</Link>
            </div>
        </div>
        </div>
        </div>
    );
}

export default UpdateProduct;