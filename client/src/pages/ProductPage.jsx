
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
    const history = useNavigate();

    return (
        <div>
            <h1>Product</h1>
            <p>This is the Product page. Placeholder for interactive elements based on the SVG layout.</p>
            <button onClick={() => navigate('/search')}>Go to Search</button>
            <br/>
        </div>
    );
}

export default ProductPage;
