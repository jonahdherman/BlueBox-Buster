import React, { useRef, useEffect } from "react";

const ProductImageEditor = ({ product, updateProduct }) => {
    const el = useRef();
    useEffect(() => {
        el.current.addEventListener('change', (event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', async() => {
                const updatedProduct = {...product, image: reader.result};
                await updateProduct(updatedProduct);
            });
        });
    }, []);

    return(
        <div>
            {`Change Product Image: `}
            <input type='file' ref={ el }/>
        </div>
    );
}

export default ProductImageEditor;