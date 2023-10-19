import React, { useRef, useState, useEffect } from "react";

const CreateProduct = ({ createProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [vip, setVip] = useState(false);
    const [image, setImage] = useState('');
    const el = useRef();

    useEffect(() => {
        el.current.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', async () => {
                setImage(reader.result);
            });
        });
    }, []);


const save = (event) => {
    event.preventDefault();
    const product = {
        name,
        price: (price * 100),
        description,
        vip_only: vip,
        image: image
    }
    createProduct(product)
    setName('');
    setPrice('');
    setDescription('');
    setVip(false);
    setImage('');
}

return (
    <div className="createProductForm">
        <h2>Create New Product *Admin*</h2>
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
            <p>VIP exclusive?</p>
            <select value={vip} onChange={event => setVip(event.target.value)}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </select>
            <div>
            <p>Product Image</p>
            <input type='file' ref={ el }/>
        </div>
            <button type='submit' disabled={!name || !price || !description}>Add Product</button>
        </form>
    </div>
);
}

export default CreateProduct;