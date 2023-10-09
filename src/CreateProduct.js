import React, {useState} from "react";

const CreateProduct = ({ createProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const save = (event) => {
        event.preventDefault();
        const product = {
            name,
            price: (price * 100),
            description
        }
        createProduct(product)
        setName('');
        setPrice('');
        setDescription('');
    }

    return(
        <div>
            <h2>Create New Product</h2>
            <form onSubmit={save}>
                <input 
                    placeholder="Enter Name"
                    value={name}
                    maxLength={100}
                    onChange={event => setName(event.target.value)}
                />
                <input 
                    type='number'
                    placeholder='0.00'
                    value={price}
                    min='0.01'
                    step='0.01'
                    onChange={event => setPrice(event.target.value)}
                />
                <textarea
                    value={description}
                    rows={10}
                    placeholder="Enter Description"
                    onChange={event => setDescription(event.target.value)}
                ></textarea>
                <button type='submit' disabled={!name || !price || !description}>Add Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;