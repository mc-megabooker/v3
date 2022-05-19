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
        setApartment(res.record[0].data);
    } catch (e) {
        console.log(e.message); 
    }
  };

useEffect(() => {
  getApartment(apartmentId);
}, [])

  return (
    <div>
      <h1>{JSON.parse(apartment)?.name}</h1>
      <h2>Property information</h2>
      <ul style={{ 'listStyleType': 'none' }}>
        <li>
          Provider Apartment ID: {JSON.parse(apartment)?.providerApartmentId}
        </li>
        <li>
          Holidu Apartment ID: {JSON.parse(apartment)?.holiduApartmentId}
        </li>
        <li>
          Latitude: {JSON.parse(apartment)?.lat}
        </li>
        <li>
          Longitude: {JSON.parse(apartment)?.lng}
        </li>
        <li>
          Max number of persons: {JSON.parse(apartment)?.maxPersons}
        </li>
        <li>
          Active: {new Boolean(JSON.parse(apartment)?.active).toString()}
        </li>
        <li>
          Apartment type: {JSON.parse(apartment)?.apartmentType}
        </li>
        <li>
          General minimum price: {JSON.parse(apartment)?.generalMinimumPrice?.amount}
        </li>
        <li>
          Currency: {JSON.parse(apartment)?.generalMinimumPrice?.currency}
        </li>
        <li>
          Size in SQM: {JSON.parse(apartment)?.sizeInSqm}
        </li>
        <li>
          Size of Plot: {JSON.parse(apartment)?.sizeOfPlot}
        </li>
        <li>
          Storey: {JSON.parse(apartment)?.storey}
        </li>
        <li>
          License: {JSON.parse(apartment)?.license}
        </li>
        <li>
          Street: {JSON.parse(apartment)?.street}
        </li>
        <li>
          City: {JSON.parse(apartment)?.city}
        </li>
        <li>
          Postal code: {JSON.parse(apartment)?.postCode}
        </li>
        <li>
          Country: {JSON.parse(apartment)?.country}
        </li>
        <li>
          Conatct name: {JSON.parse(apartment)?.contactName}
        </li>
        <li>
          Contact phone: {JSON.parse(apartment)?.contactPhone}
        </li>
        <li>
          Contact email: {JSON.parse(apartment)?.contactEmail}
        </li>
        <li>
          Contact days before arrival: {JSON.parse(apartment)?.contactDaysBeforeArrival}
        </li>
        <li>
          Check in from: {JSON.parse(apartment)?.checkInFrom}
        </li>
        <li>
          Check in to: {JSON.parse(apartment)?.checkInTo}
        </li>
        <li>
          Check out until: {JSON.parse(apartment)?.checkOutUntil}
        </li>
      </ul>
      <h3>Photos</h3>
      {JSON.parse(apartment)?.photos?.map((photo) => {
          return (
            <p>
              {photo?.url}, POSITION: {photo?.position}, TYPE: {photo?.type}
            </p>
          );
        })}
        <h3>Facilities</h3>
        {JSON.parse(apartment)?.facilities?.map((facility) => {
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