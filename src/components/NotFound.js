import React from 'react';
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section>
            <h2>Whoops!</h2>

            <p>This page doesn't exist!</p>


            <Link to="/">Home Page</Link>
        </section>
    );
}

export default NotFound;