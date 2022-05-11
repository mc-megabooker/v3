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

const ApartmentList: FunctionComponent<any> = (props) => {
  const [apartments, setApartments] = useState([]);

  const getApartments = async (): Promise<void> => {
    try {
        const res = await Get(
            apiRoute.getRoute('apartments')
        );
        setApartments(res.apartments);
        
    } catch (e) {
        console.log(e.message); 
    }
};

  useEffect(() => {
    getApartments();
  }, []);

  console.log(apartments);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: 'lightgray' }}>
            <TableRow>
              <TableCell align="right">providerApartmentId</TableCell>
              <TableCell align="right">latitude</TableCell>
              <TableCell align="right">langitude</TableCell>
              <TableCell>maxPersons</TableCell>
              <TableCell align="right">generalMinimumStay</TableCell>
              <TableCell align="right">generalMinimumPrice.amount</TableCell>
              <TableCell align="right">generalMinimumPrice.currency</TableCell>
              <TableCell>active</TableCell>
              <TableCell align="right">apartmentType</TableCell>
              <TableCell align="right">holiduApartmentId</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apartments.map(({ data = {} }) => (
              <TableRow key={data?.providerApartmentId}>
                <TableCell align="right">{data?.providerApartmentId}</TableCell>
                <TableCell align="right">{data?.lat}</TableCell>
                <TableCell align="right">{data?.lng}</TableCell>
                <TableCell align="right">{data?.maxPersons}</TableCell>
                <TableCell align="right">{data?.generalMinimumStay}</TableCell>
                <TableCell align="right">{data?.generalMinimumPrice?.amount}</TableCell>
                <TableCell align="right">{data?.generalMinimumPrice?.currency}</TableCell>
                <TableCell align="right">{new Boolean(data?.active)?.toString()}</TableCell>
                <TableCell align="right">{data?.apartmentType}</TableCell>
                <TableCell align="right">{data?.holiduApartmentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ApartmentList;