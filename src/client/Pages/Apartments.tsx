import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface ICreateApartment { }

const CreateApartment: FunctionComponent<any> = (props) => {
    return (
        <div>
            <Link to="/create-apartment">Create apartment</Link>
            Apartments list
        </div>
    )
}

export default CreateApartment;
