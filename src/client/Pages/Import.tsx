import React, { useEffect, useRef, useState } from 'react';
import '../Less/app.less';
import { parseString } from 'xml2js';
import { IApartment } from '../../server/domain/IApartment';
import { Post } from "../Services";
import { apiRoute } from '../utils';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

interface IImportPageProps { }

const ImportPage: React.FunctionComponent<IImportPageProps> = (props) => {
    const [objectName, setObjectName] = useState('');
    const [objectCoordinates, setObjectCoordinates] = useState({});
    const [objectCity, setObjectCity] = useState('');
    const [objectState, setObjectState] = useState('');
    const [xmlText, setXmlText] = useState('');
    const [units, setUnits] = useState([]);
    const fileRef = useRef();
    const [uploadSuccess, setUploadSuccess] = useState('');

    const handleChange = (e: any) => {
        const [file] = e.target.files;
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onloadend = function() {
            const data = reader.result;
            setXmlText(data);
        };
    }

    const parseXml = () => {
        parseString(xmlText, (err: any, result: any) => {
            setUnits(result.objects.object[0].units[0].unit);
            setObjectName(result.objects.object[0].name[0]);
            setObjectCoordinates({
                "lat": result.objects.object[0].gpsObject[0].split(',')[0],
                "lng": result.objects.object[0].gpsObject[0].split(',')[1]
            });
            setObjectCity(result.objects.object[0].location[0].riviera[0].name[0]);
            setObjectState(result.objects.object[0].location[0].state[0].name[0]);
        });
        setUploadSuccess('Done. Check apartment list');
    };

    useEffect(() => {
        submitApartments(units);
    }, [units]);

    const submitApartments = async (units: any) => {
        await Promise.all(units.map((unit: any) => {
            const maxNumberOfPeople = Math.max(...unit.pricelists[0].pricelist.map(o => o.noOfPersons[0]));
            const maxPrice = Math.max(...unit.pricelists[0].pricelist.map(o => o.price[0]));
            const photos: { url: any; position: number; }[] = [];
            unit.gallery[0].photo.map((photo: any) => {
                const photoObject = {
                    "url": photo.url[0],
                    "position": parseInt(photo.sortOrder[0]) + 1
                };
                photos.push(photoObject);
            });

            const obj = {
                "lat": parseFloat(objectCoordinates.lat),
                "lng": parseFloat(objectCoordinates.lng),
                "name": objectName + ": " + unit.name[0],
                "sizeInSqm": 0,
                "sizeOfPlot": 0,
                "storey": 0,
                "license": '',
                "street": '',
                "city": objectCity,
                "postCode": '',
                "country": objectState,
                "contactName": '',
                "contactPhone": '',
                "contactEmail": '',
                "contactDaysBeforeArrival": 0,
                "checkInFrom": '',
                "checkInTo": '',
                "checkOutUntil": '',
                "maxPersons": maxNumberOfPeople,
                "generalMinimumStay": 7,
                "generalMinimumPrice": {
                    "amount":maxPrice,
                    "currency": "EUR",
                },
                "active": true,
                "apartmentType": 'APARTMENT',
                "photos": photos,
                "facilities": [],
            }
            try {
                const res: IApartment = Post(
                    apiRoute.getRoute('apartment'),
                    obj,
                );
                if (!res.ok) {
                 // setUploadSuccess(false);
                }
            } catch (e) {
                console.log(e.message);
                
            }
        })
        )
    };

    return (
        <div>
            <div>
                <div>
                    <input ref={fileRef} type="file" onChange={handleChange} multiple={false} />
                    <div>
                        <button onClick={() => parseXml()}>Upload!</button>
                    </div>
                </div>
                <div>
                    <ul style={{ listStyle: 'none' }}>
                        <li>
                            <Typography variant='button'>
                                <Link to="/apartment-list">Apartment list</Link>
                            </Typography>
                        </li>
                    </ul>
                </div>
                <h3>{uploadSuccess}</h3>
            </div>
        </div>
    );
}

export default ImportPage;
