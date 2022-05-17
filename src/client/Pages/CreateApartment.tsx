import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox  } from "@material-ui/core";
import { Get } from "../Services";
import { Col } from "react-bootstrap";
import { IPrice, IFacility, IPhoto, IApartment } from '../../server/domain/IApartment';
import { Post } from "../Services";
import { apiRoute } from '../utils';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom';
import { constants } from '../../constants';
import Switch from '@mui/material/Switch';


interface ICreateApartmentForm { 
    lat: number;
    lng: number;
    maxPersons: number;
    generalMinimumStay: number,
    generalMinimumPrice: IPrice,
    active: boolean,
    apartmentType: string,
    facilities: Array<IFacility>,
    photos: Array<IPhoto>
}

const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
    },
  }));

const CreateApartment: FunctionComponent<ICreateApartmentForm> = (props) => {
    const { heading, submitButton } = useStyles();
    const [facilityTypes, setFacilityTypes] = useState([]);
    const navigate = useNavigate();
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [maxPersons, setMaxPersons] = useState(null);
    const [generalMinimumStay, setGeneralMinimumStay] = useState(null);
    const [generalMinimumPriceAmount, setGeneralMinimumPriceAmount] = useState(null);
    const [generalMinimumPriceCurrency, setGeneralMinimumPriceCurrency] = useState('');
    const [active, setActive] = useState(false);
    const [apartmentType, setApartmentType] = useState('');
    const [name, setName] = useState('');
    const [sizeInSqm, setSizeInSqm] = useState(null);
    const [sizeOfPlot, setSizeOfPlot] = useState(null);
    const [storey, setStorey] = useState(null);
    const [license, setLicense] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postCode, setPostCode] = useState('');
    const [country, setCountry] = useState('');
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactDaysBeforeArrival, setContactDaysBeforeArrival] = useState(null);
    const [checkInFrom, setCheckInFrom] = useState('');
    const [checkInTo, setCheckInTo] = useState('');
    const [checkOutUntil, setCheckOutUntil] = useState('');
    const [allPhotos, setAllPhotos] = useState([
        { url: "", position: null, type: "" },
    ]);
    const [allFacilities, setAllFacilities] = useState([
        { name: "",
          facilityCharacteristic: "",
          language: "",
          maxAmount: null,
          privateUsage: false,
          mandatory: false,
          inclusive: false,
          reference: "",
          currency: "",
          cost: null,
          location: "",
          onDemand: false,
          roomId: "",
          roomType: ""
        },
    ]);

    const getFacilityTypes = async (): Promise<void> => {
      try {
          const res = await Get("https://provider-api.holidu.com/rest/public/integration/facilities/characteristics")
          setFacilityTypes(res);
      } catch (e) {
         console.log(e.message)
      }
    };

    const handleAddPhotos = () => {
        const values = [...allPhotos];
        values.push({
          url: "",
          position: null,
          type: "",
        });
        setAllPhotos(values);
      };
    
      const handleRemovePhoto = (index) => {
        const values = [...allPhotos];
        values.splice(index, 1);
        setAllPhotos(values);
      };
    
      const handlePhotosInputChange = (index: number, event: any) => {
        const values = [...allPhotos];
        const updatedValue = event.target.name;
        values[index][updatedValue] = event.target.value;
        setAllPhotos(values);
        
      };

      const handleAddFacilities = () => {
        const values = [...allFacilities];
        values.push({
          name: "",
          facilityCharacteristic: "",
          language: "",
          maxAmount: null,
          privateUsage: false,
          mandatory: false,
          inclusive: false,
          reference: "",
          currency: "",
          cost: null,
          location: "",
          onDemand: false,
          roomId: "",
          roomType: "",
        });
        setAllFacilities(values);
      };
    
      const handleRemoveFacilities = (index) => {
        const values = [...allFacilities];
        values.splice(index, 1);
        setAllFacilities(values);
      };
    
      const handleFacilitiesInputChange = (index, event) => {
        const values = [...allFacilities];
        if (event.target.type === 'checkbox') {
          const updatedValue = event.target.name;
          values[index][updatedValue] = event.target.checked;
          setAllFacilities(values);
          
        } else {
          const updatedValue = event.target.name;
          values[index][updatedValue] = event.target.value;
          setAllFacilities(values);
        }
      };
      
      const handleInputChange = (e, setter) => {
          setter(e.target.value); 
      };

      const handleActiveChange = (e) => {
          setActive(e.target.checked)
      };

      const handleSubmit = async (): Promise<void> => {
        const obj = {
            "lat": parseFloat(lat),
            "lng": parseFloat(lng),
            "name": name,
            "sizeInSqm": parseFloat(sizeInSqm),
            "sizeOfPlot": parseFloat(sizeOfPlot),
            "storey": parseInt(storey),
            "license": license,
            "street": street,
            "city": city,
            "postCode": postCode,
            "country": country,
            "contactName": contactName,
            "contactPhone": contactPhone,
            "contactEmail": contactEmail,
            "contactDaysBeforeArrival": parseInt(contactDaysBeforeArrival),
            "checkInFrom": checkInFrom,
            "checkInTo": checkInTo,
            "checkOutUntil": checkOutUntil,
            "maxPersons": parseInt(maxPersons),
            "generalMinimumStay": parseInt(generalMinimumStay),
            "generalMinimumPrice": {
                "amount": parseInt(generalMinimumPriceAmount),
                "currency": generalMinimumPriceCurrency,
            },
            "active": active,
            "apartmentType": apartmentType,
            "photos": allPhotos,
            "facilities": allFacilities,
        }
        try {
            const res: IApartment = await Post(
                apiRoute.getRoute('apartment'),
                obj,
            );
            if (res.ok) {
             navigate('/apartment-list');
            }
        } catch (e) {
            console.log(e.message);
            
        }
      }

      useEffect(() => {
        getFacilityTypes();
      }, []);

    return (
        <Container maxWidth="sm">
            <Typography className={heading} variant="h3">
            Create apartment
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter property name"
                type="text"
                fullWidth
                
                name="name"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter size in sqm"
                type="number"
                fullWidth
                
                name="sizeInSqm"
                value={sizeInSqm}
                onChange={(e) => handleInputChange(e, setSizeInSqm)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter total size of property including everything"
                type="number"
                fullWidth
                
                name="sizeOfPlot"
                value={sizeOfPlot}
                onChange={(e) => handleInputChange(e, setSizeOfPlot)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter storey"
                type="number"
                fullWidth
                
                name="storey"
                value={storey}
                onChange={(e) => handleInputChange(e, setStorey)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter license"
                type="text"
                fullWidth
                
                name="license"
                value={license}
                onChange={(e) => handleInputChange(e, setLicense)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter street"
                type="text"
                fullWidth
                
                name="street"
                value={street}
                onChange={(e) => handleInputChange(e, setStreet)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter city"
                type="text"
                fullWidth
                
                name="city"
                value={city}
                onChange={(e) => handleInputChange(e, setCity)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter postal code"
                type="text"
                fullWidth
                
                name="postCode"
                value={postCode}
                onChange={(e) => handleInputChange(e, setPostCode)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter country"
                type="text"
                fullWidth
                
                name="country"
                value={country}
                onChange={(e) => handleInputChange(e, setCountry)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter contact name"
                type="text"
                fullWidth
                name="contactName"
                value={contactName}
                onChange={(e) => handleInputChange(e, setContactName)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter contact phone"
                type="text"
                fullWidth
                name="contactPhone"
                value={contactPhone}
                onChange={(e) => handleInputChange(e, setContactPhone)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter contact email"
                type="text"
                fullWidth
                name="contactEmail"
                value={contactEmail}
                onChange={(e) => handleInputChange(e, setContactEmail)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter how many days before arrival contact is needed"
                type="number"
                fullWidth
                name="contactDaysBeforeArrival"
                value={contactDaysBeforeArrival}
                onChange={(e) => handleInputChange(e, setContactDaysBeforeArrival)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter when check in starts"
                type="text"
                fullWidth
                name="checkInFrom"
                value={checkInFrom}
                onChange={(e) => handleInputChange(e, setCheckInFrom)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter when check in ends"
                type="text"
                fullWidth
                name="checkInTo"
                value={checkInTo}
                onChange={(e) => handleInputChange(e, setCheckInTo)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter deadline for check out"
                type="text"
                fullWidth
                name="checkOutUntil"
                value={checkOutUntil}
                onChange={(e) => handleInputChange(e, setCheckOutUntil)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter latitude"
                type="number"
                fullWidth
                required
                name="lat"
                value={lat}
                onChange={(e) => handleInputChange(e, setLat)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter longitude"
                type="number"
                fullWidth
                required
                name="lng"
                value={lng}
                onChange={(e) => handleInputChange(e, setLng)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter maximum number of persons"
                type="number"
                fullWidth
                required
                name="maxPersons"
                value={maxPersons}
                onChange={(e) => handleInputChange(e, setMaxPersons)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter minimum stay in nights"
                type="number"
                fullWidth
                required
                name="minStay"
                value={generalMinimumStay}
                onChange={(e) => handleInputChange(e, setGeneralMinimumStay)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Enter minimum price amount"
                type="number"
                fullWidth
                required
                name="amount"
                value={generalMinimumPriceAmount}
                onChange={(e) => handleInputChange(e, setGeneralMinimumPriceAmount)}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={generalMinimumPriceCurrency}
                  label="Currency"
                  onChange={(e) => handleInputChange(e, setGeneralMinimumPriceCurrency)}
                >
                  {constants.CURRENCIES.map((currency) => {
                    return <MenuItem value={currency}>{currency}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
            <Typography variant='body1'>
                Active
            </Typography>
            <Checkbox required checked={active} onChange={handleActiveChange} />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Apartment type</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={apartmentType}
                  label="Apartment type"
                  onChange={(e) => handleInputChange(e, setApartmentType)}
                >
                  {constants.APARTMENT_TYPES.map((type) => {
                    return <MenuItem value={type}>{type}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
            <Typography variant='h4'>
                Photos
            </Typography>
            {allPhotos.length > 0 && (
                <>
                  {allPhotos.map((field, index) => (
                    <Col xs="1">
                      <div className="add-player-div">
                        <Typography variant="h6">Photo {index + 1}</Typography>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter URL"
                            type="text"
                            fullWidth
                            name="url"
                            value={field.url}
                            onChange={(event) =>
                              handlePhotosInputChange(index, event)
                            }
                          />
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter position"
                            type="number"
                            fullWidth
                            name="position"
                            value={field.position}
                            onChange={(event) =>
                              handlePhotosInputChange(index, event)
                            }
                          />
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Photo type</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={field.type}
                              label="Photo type"
                              name="type"
                              onChange={(event) =>
                                handlePhotosInputChange(index, event)
                              }
                            >
                              {constants.PHOTO_TYPES.map((type) => {
                                return <MenuItem value={type}>{type}</MenuItem>
                              })}
                            </Select>
                          </FormControl>
                        <Button
                          onClick={() => handleRemovePhoto(index)}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={submitButton}
                        >
                          Cancel photo
                        </Button>
                      </div>
                    </Col>
                  ))}
                </>
              )}
              <br/>
                  <Button
                    onClick={() => handleAddPhotos()}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add new photo
                  </Button>
                  <Typography variant='h4'>
                Facilities
            </Typography>
            {allFacilities.length > 0 && (
                <>
                  {allFacilities.map((field, index) => (
                    <Col xs="4">
                      <div className="add-player-div">
                        <Typography variant="h6">Facility {index + 1}</Typography>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter facility name"
                            type="text"
                            fullWidth
                            
                            name="name"
                            value={field.name}
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Facility characteristic</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="text"
                                name="facilityCharacteristic"
                                value={field.facilityCharacteristic}
                                label="Facility Characteristic"
                                onChange={(event) =>
                                  handleFacilitiesInputChange(index, event)
                                }
                              >
                                {facilityTypes.map((type) => {
                                  return <MenuItem value={type}>{type}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Language</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="text"
                                name="language"
                                value={field.language}
                                label="Facility language"
                                onChange={(event) =>
                                  handleFacilitiesInputChange(index, event)
                                }
                              >
                                {constants.FACILITY_LANGUAGES.map((lang) => {
                                  return <MenuItem value={lang}>{lang}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </Box>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter maximum amount"
                            type="number"
                            fullWidth
                            
                            name="maxAmount"
                            value={field.maxAmount}
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                          <Typography variant='body1'>
                            Private usage
                          </Typography>
                          <Switch
                            checked={field.privateUsage}
                            name="privateUsage"
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                          <Typography variant='body1'>
                            Mandatory
                          </Typography>
                          <Switch
                            checked={field.mandatory}
                            name="mandatory"
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                          <Typography variant='body1'>
                            Inclusive
                          </Typography>
                          <Switch
                            checked={field.inclusive}
                            name="inclusive"
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Reference</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="text"
                                name="reference"
                                value={field.reference}
                                label="Reference"
                                onChange={(event) =>
                                  handleFacilitiesInputChange(index, event)
                                }
                              >
                                {constants.FACILITY_REFERENCES.map((ref) => {
                                  return <MenuItem value={ref}>{ref}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="text"
                                name="currency"
                                value={field.currency}
                                label="Currency"
                                onChange={(event) =>
                                  handleFacilitiesInputChange(index, event)
                                }
                              >
                                {constants.CURRENCIES.map((currency) => {
                                  return <MenuItem value={currency}>{currency}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </Box>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Cost"
                            type="number"
                            fullWidth
                            name="cost"
                            value={field.cost}
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Location</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="text"
                                name="location"
                                value={field.location}
                                label="Location"
                                onChange={(event) =>
                                  handleFacilitiesInputChange(index, event)
                                }
                              >
                                {constants.FACILITY_LOCATIONS.map((loc) => {
                                  return <MenuItem value={loc}>{loc}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </Box>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Room type</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                type="text"
                                name="roomType"
                                value={field.roomType}
                                label="Room type"
                                onChange={(event) =>
                                  handleFacilitiesInputChange(index, event)
                                }
                              >
                                {constants.FACILITY_ROOM_TYPES.map((loc) => {
                                  return <MenuItem value={loc}>{loc}</MenuItem>
                                })}
                              </Select>
                            </FormControl>
                          </Box>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Room ID"
                            type="text"
                            fullWidth
                            name="roomId"
                            value={field.roomId}
                            onChange={(event) =>
                              handleFacilitiesInputChange(index, event)
                            }
                          />
                        <Button
                          onClick={() => handleRemoveFacilities(index)}
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={submitButton}
                        >
                          Cancel facility
                        </Button>
                      </div>
                    </Col>
                  ))}
                </>
              )}
              <br/>
                  <Button
                    onClick={() => handleAddFacilities()}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Add new facility
                  </Button>
                  <br />
                  <br />
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={lat == null ||
                      lng == null ||
                      maxPersons == null ||
                      generalMinimumStay == null ||
                      generalMinimumPriceAmount == null ||
                      generalMinimumPriceCurrency == '' ||
                      apartmentType == ''}
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Create apartment
                  </Button>
        </Container>
    )
}

export default CreateApartment;
