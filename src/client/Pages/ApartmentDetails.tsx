import React, { FunctionComponent, useEffect, useState } from 'react';
import { Post } from "../Services";
import { apiRoute } from '../utils';

const ApartmentDetails: FunctionComponent<any> = (props) => {
  const [apartment, setApartment] = useState({});
  const apartmentId = window.location.href.split('/').pop();

  const getApartment = async (providerApartmentId: string): Promise<void> => {    
    try {
        const obj = {
          "providerApartmentId": providerApartmentId
        };
        const res: any = await Post(
          apiRoute.getRoute('getApartment'),
          obj,
      );
        setApartment(JSON.parse(res.record[0].data));
        console.log(JSON.parse(res.record[0].data));
        
    } catch (e) {
        console.log(e.message); 
    }
  };

useEffect(() => {
  getApartment(apartmentId);
}, [])

  return (
    <div>
      <h1>{apartment?.name}</h1>
      <h2>Property information</h2>
      <ul style={{ 'listStyleType': 'none' }}>
        <li>
          Provider Apartment ID: {apartment?.providerApartmentId}
        </li>
        <li>
          Holidu Apartment ID: {apartment?.holiduApartmentId}
        </li>
        <li>
          Latitude: {apartment?.lat}
        </li>
        <li>
          Longitude: {apartment?.lng}
        </li>
        <li>
          Max number of persons: {apartment?.maxPersons}
        </li>
        <li>
          Active: {new Boolean(apartment?.active).toString()}
        </li>
        <li>
          Apartment type: {apartment?.apartmentType}
        </li>
        <li>
          General minimum price: {apartment?.generalMinimumPrice?.amount}
        </li>
        <li>
          Currency: {apartment?.generalMinimumPrice?.currency}
        </li>
        <li>
          Size in SQM: {apartment?.sizeInSqm}
        </li>
        <li>
          Size of Plot: {apartment?.sizeOfPlot}
        </li>
        <li>
          Storey: {apartment?.storey}
        </li>
        <li>
          License: {apartment?.license}
        </li>
        <li>
          Street: {apartment?.street}
        </li>
        <li>
          City: {apartment?.city}
        </li>
        <li>
          Postal code: {apartment?.postCode}
        </li>
        <li>
          Country: {apartment?.country}
        </li>
        <li>
          Conatct name: {apartment?.contactName}
        </li>
        <li>
          Contact phone: {apartment?.contactPhone}
        </li>
        <li>
          Contact email: {apartment?.contactEmail}
        </li>
        <li>
          Contact days before arrival: {apartment?.contactDaysBeforeArrival}
        </li>
        <li>
          Check in from: {apartment?.checkInFrom}
        </li>
        <li>
          Check in to: {apartment?.checkInTo}
        </li>
        <li>
          Check out until: {apartment?.checkOutUntil}
        </li>
      </ul>
      <h3>Photos</h3>
      {apartment?.photos?.map((photo) => {
          return (
            <p>
              {photo?.url}, POSITION: {photo?.position}, TYPE: {photo?.type}
            </p>
          );
        })}
        <h3>Facilities</h3>
        {apartment?.facilities?.map((facility) => {
          return (
            <div>
              <ul style={{ 'listStyleType': 'none' }}>
                <li>
                  Name: {facility?.name}
                </li>
                <li>
                  Facility characteristic: {facility?.facilityCharacteristic}
                </li>
                <li>
                  Language: {facility?.language}
                </li>
                <li>
                  Maximum amount: {facility?.maxAmount}
                </li>
                <li>
                  Private usage: {new Boolean(facility?.privateUsage).toString()}
                </li>
                <li>
                  Is mandatory: {new Boolean(facility?.mandatory).toString()}
                </li>
                <li>
                  Is inclusive: {new Boolean(facility?.inclusive).toString()}
                </li>
                <li>
                  Reference: {facility?.reference}
                </li>
                <li>
                  Currency: {facility?.currency}
                </li>
                <li>
                  Cost: {facility?.cost}
                </li>
                <li>
                  Location: {facility?.location}
                </li>
                <li>
                  Is on demand: {new Boolean(facility?.onDemand).toString()}
                </li>
                <li>
                  Room ID: {facility?.roomId}
                </li>
                <li>
                  Room type: {facility?.roomType}
                </li>
              </ul>
              <br />
              <br />
            </div>
          );
        })}
    </div>
  );
}

export default ApartmentDetails;