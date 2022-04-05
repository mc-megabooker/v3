
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './Components/app';
import ImportPage from './Pages/Import';
import Apartments from './Pages/Apartments';
import CreateApartment from './Pages/CreateApartment';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Apartments />} />
                    <Route path="import" element={<ImportPage />} />
                    <Route path="apartments" element={<Apartments />}></Route>
                    <Route path="create-apartment" element={<CreateApartment />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Application;