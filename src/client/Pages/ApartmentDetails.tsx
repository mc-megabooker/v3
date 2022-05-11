import React, { FunctionComponent, useEffect } from 'react';
import { Get } from "../Services";
import {
  Routes,
  Route,
} from "react-router-dom";
import { apiRoute } from '../utils';

const ApartmentDetails: FunctionComponent<any> = (props) => {

useEffect(() => {
  console.log("me");
}, [])

  return (
    <div>
      <p>
        Apartment details
      </p>
    </div>
  );
}

export default ApartmentDetails;