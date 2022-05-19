import React, { FunctionComponent } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Get } from "../Services";
import { apiRoute } from '../utils';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Link } from 'react-router-dom';

const ApartmentList: FunctionComponent<any> = (props) => {
  const [apartments, setApartments] = useState([]);

  const getApartments = async (): Promise<void> => {
    try {
        const res = await Get(
            apiRoute.getRoute('apartments')
        );
        setApartments(res);
        
    } catch (e) {
        console.log(e.message); 
    }
  };

  useEffect(() => {
    getApartments();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: 'lightgray' }}>
            <TableRow>
              <TableCell align="right">providerApartmentId</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">sizeInSqm</TableCell>
              <TableCell align="right">sizeOfPlot</TableCell>
              <TableCell align="right">storey</TableCell>
              <TableCell align="right">license</TableCell>
              <TableCell align="right">street</TableCell>
              <TableCell align="right">city</TableCell>
              <TableCell align="right">postCode</TableCell>
              <TableCell align="right">country</TableCell>
              <TableCell align="right">contactName</TableCell>
              <TableCell align="right">contactPhone</TableCell>
              <TableCell align="right">contactEmail</TableCell>
              <TableCell align="right">contactDaysBeforeArrival</TableCell>
              <TableCell align="right">checkInFrom</TableCell>
              <TableCell align="right">checkInTo</TableCell>
              <TableCell align="right">checkOutUntil</TableCell>
              <TableCell align="right">latitude</TableCell>
              <TableCell align="right">langitude</TableCell>
              <TableCell align="right">maxPersons</TableCell>
              <TableCell align="right">generalMinimumStay</TableCell>
              <TableCell align="right">generalMinimumPrice.amount</TableCell>
              <TableCell align="right">generalMinimumPrice.currency</TableCell>
              <TableCell align="right">active</TableCell>
              <TableCell align="right">apartmentType</TableCell>
              <TableCell align="right">holiduApartmentId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map(({ data = {} }) => (
              <TableRow key={JSON.parse(data)?.providerApartmentId}>
                <TableCell align="right"><Link to={`apartment-list/${JSON.parse(data)?.providerApartmentId}`}>{JSON.parse(data)?.providerApartmentId}</Link></TableCell>
                <TableCell align="right">{JSON.parse(data)?.name}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.sizeInSqm}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.sizeOfPlot}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.storey}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.license}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.street}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.city}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.postCode}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.country}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.contactName}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.contactPhone}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.contactEmail}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.contactDaysBeforeArrival}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.checkInFrom}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.checkInTo}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.checkOutUntil}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.lat}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.lng}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.maxPersons}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.generalMinimumStay}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.generalMinimumPrice?.amount}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.generalMinimumPrice?.currency}</TableCell>
                <TableCell align="right">{new Boolean(JSON.parse(data)?.active)?.toString()}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.apartmentType}</TableCell>
                <TableCell align="right">{JSON.parse(data)?.holiduApartmentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ApartmentList;