import React, { FunctionComponent, useState } from 'react';
import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
    Checkbox
  } from "@material-ui/core";
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
    const navigate = useNavigate();
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [maxPersons, setMaxPersons] = useState(null);
    const [generalMinimumStay, setGeneralMinimumStay] = useState(null);
    const [generalMinimumPriceAmount, setGeneralMinimumPriceAmount] = useState(null);
    const [generalMinimumPriceCurrency, setGeneralMinimumPriceCurrency] = useState('');
    const [active, setActive] = useState(false);
    const [apartmentType, setApartmentType] = useState('');
    const [allPhotos, setAllPhotos] = useState([
        { url: "", position: null },
    ]);
    const [allFacilities, setAllFacilities] = useState([
        { name: "" },
    ]);

    const handleAddPhotos = () => {
        const values = [...allPhotos];
        values.push({
          url: "",
          position: null,
        });
        setAllPhotos(values);
      };
    
      const handleRemovePhoto = (index) => {
        const values = [...allPhotos];
        values.splice(index, 1);
        setAllPhotos(values);
      };
    
      const handlePhotosInputChange = (index, event) => {
        const values = [...allPhotos];
        const updatedValue = event.target.name;
        values[index][updatedValue] = event.target.value;
        setAllPhotos(values);
      };

      const handleAddFacilities = () => {
        const values = [...allFacilities];
        values.push({
          name: "",
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
        const updatedValue = event.target.name;
        values[index][updatedValue] = event.target.value;
        setAllFacilities(values);
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

        console.log(obj);
      }

    return (
        <Container maxWidth="sm">
            <Typography className={heading} variant="h3">
            Create apartment
            </Typography>
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
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={generalMinimumPriceCurrency}
                  label="Currency"
                  onChange={(e) => handleInputChange(e, setGeneralMinimumPriceCurrency)}
                >
                  <MenuItem value="AED">AED</MenuItem>
                  <MenuItem value="ARS">ARS</MenuItem>
                  <MenuItem value="AUD">AUD</MenuItem>
                  <MenuItem value="AZN">AZN</MenuItem>
                  <MenuItem value="BGN">BGN</MenuItem>
                  <MenuItem value="BHD">BHD</MenuItem>
                  <MenuItem value="BRL">BRL</MenuItem>
                  <MenuItem value="CAD">CAD</MenuItem>
                  <MenuItem value="CHF">CHF</MenuItem>
                  <MenuItem value="CLP">CLD</MenuItem>
                  <MenuItem value="CNY">CNY</MenuItem>
                  <MenuItem value="COP">COP</MenuItem>
                  <MenuItem value="CZK">CZK</MenuItem>
                  <MenuItem value="DKK">DKK</MenuItem>
                  <MenuItem value="EGP">EGP</MenuItem>
                  <MenuItem value="EUR">EUR</MenuItem>
                  <MenuItem value="GBP">GBP</MenuItem>
                  <MenuItem value="GEL">GEL</MenuItem>
                  <MenuItem value="HKD">HKD</MenuItem>
                  <MenuItem value="HUF">HUF</MenuItem>
                  <MenuItem value="IDR">IDR</MenuItem>
                  <MenuItem value="ILS">ILS</MenuItem>
                  <MenuItem value="INR">INR</MenuItem>
                  <MenuItem value="JOD">JOD</MenuItem>
                  <MenuItem value="JPY">JPY</MenuItem>
                  <MenuItem value="KRW">KRW</MenuItem>
                  <MenuItem value="KWD">KWD</MenuItem>
                  <MenuItem value="KZT">KZT</MenuItem>
                  <MenuItem value="MDL">MDL</MenuItem>
                  <MenuItem value="MXN">MXN</MenuItem>
                  <MenuItem value="MYR">MYR</MenuItem>
                  <MenuItem value="NAD">NAD</MenuItem>
                  <MenuItem value="NOK">NOK</MenuItem>
                  <MenuItem value="NZD">NZD</MenuItem>
                  <MenuItem value="OMR">OMR</MenuItem>
                  <MenuItem value="PLN">PLN</MenuItem>
                  <MenuItem value="QAR">QAR</MenuItem>
                  <MenuItem value="RON">RON</MenuItem>
                  <MenuItem value="RUB">RUB</MenuItem>
                  <MenuItem value="SAR">SAR</MenuItem>
                  <MenuItem value="SEK">SEK</MenuItem>
                  <MenuItem value="SGD">SGD</MenuItem>
                  <MenuItem value="THB">THB</MenuItem>
                  <MenuItem value="TRY">TRY</MenuItem>
                  <MenuItem value="TWD">TWD</MenuItem>
                  <MenuItem value="UAH">UAH</MenuItem>
                  <MenuItem value="USD">USD</MenuItem>
                  <MenuItem value="XOF">XOF</MenuItem>
                  <MenuItem value="ZAR">ZAR</MenuItem>
                  
                </Select>
              </FormControl>
            </Box>
            <Typography variant='body1'>
                Active
            </Typography>
            <Checkbox checked={active} onChange={handleActiveChange} />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Apartment type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={apartmentType}
                  label="Apartment type"
                  onChange={(e) => handleInputChange(e, setApartmentType)}
                >
                  <MenuItem value="APARTMENT">APARTMENT</MenuItem>
                  <MenuItem value="VACATION_APARTMENT">VACATION_APARTMENT</MenuItem>
                  <MenuItem value="FISHING_HOUSE">FISHING_HOUSE</MenuItem>
                  <MenuItem value="BED_AND_BREAKFAST">BED_AND_BREAKFAST</MenuItem>
                  <MenuItem value="HOLIDAY_VILLAGE1">HOLIDAY_VILLAGE1</MenuItem>
                  <MenuItem value="HOLIDAY_VILLAGE2">HOLIDAY_VILLAGE2</MenuItem>
                  <MenuItem value="APARTMENT_HOTEL">APARTMENT_HOTEL</MenuItem>
                  <MenuItem value="FARMHOUSE">FARMHOUSE</MenuItem>
                  <MenuItem value="COTTAGE">COTTAGE</MenuItem>
                  <MenuItem value="CAMPING">CAMPING</MenuItem>
                  <MenuItem value="CHALET">CHALET</MenuItem>
                  <MenuItem value="VACATION_HOME">VACATION_HOME</MenuItem>
                  <MenuItem value="GUEST_ROOM">GUEST_ROOM</MenuItem>
                  <MenuItem value="HOSTEL">HOSTEL</MenuItem>
                  <MenuItem value="HOTEL">HOTEL</MenuItem>
                  <MenuItem value="BOAT">BOAT</MenuItem>
                  <MenuItem value="MANOR">MANOR</MenuItem>
                  <MenuItem value="MOBILE_HOME">MOBILE_HOME</MenuItem>
                  <MenuItem value="LODGE">LODGE</MenuItem>
                  <MenuItem value="HOUSE_BOAT">HOUSE_BOAT</MenuItem>
                  <MenuItem value="PENTHOUSE">PENTHOUSE</MenuItem>
                  <MenuItem value="CASTLE">CASTLE</MenuItem>
                  <MenuItem value="STUDIO">STUDIO</MenuItem>
                  <MenuItem value="VILLA">VILLA</MenuItem>
                  <MenuItem value="RESIDENCE">RESIDENCE</MenuItem>
                  <MenuItem value="ROOM">ROOM</MenuItem>
                  <MenuItem value="BARN">BARN</MenuItem>
                  <MenuItem value="CAVE">CAVE</MenuItem>
                  <MenuItem value="ALLOTMENT_GARDEN">ALLOTMENT_GARDEN</MenuItem>
                  <MenuItem value="ROOM_BREAKFAST">ROOM_BREAKFAST</MenuItem>
                  <MenuItem value="BUNGALOW">BUNGALOW</MenuItem>
                  <MenuItem value="YACHT">YACHT</MenuItem>
                  <MenuItem value="CAMPER">CAMPER</MenuItem>
                  <MenuItem value="CARAVAN">CARAVAN</MenuItem>
                  <MenuItem value="LUXURY_TENT">LUXURY_TENT</MenuItem>
                  <MenuItem value="TENT">TENT</MenuItem>
                  <MenuItem value="TIPI">TIPI</MenuItem>
                  <MenuItem value="YURT">YURT</MenuItem>
                  <MenuItem value="HOLIDAY_VILLAGE3">HOLIDAY_VILLAGE3</MenuItem>
                  <MenuItem value="GUEST_HOUSE">GUEST_HOUSE</MenuItem>
                  <MenuItem value="PENSION">PENSION</MenuItem>
                  <MenuItem value="BEACH_HUT">BEACH_HUT</MenuItem>
                  <MenuItem value="CHACARA">CHACARA</MenuItem>
                  <MenuItem value="COUNTRY_HOUSE">COUNTRY_HOUSE</MenuItem>
                  <MenuItem value="FARM">FARM</MenuItem>
                  <MenuItem value="FINCA">FINCA</MenuItem>
                  <MenuItem value="GITE">GITE</MenuItem>
                  <MenuItem value="HUT">HUT</MenuItem>
                  <MenuItem value="LIGHTHOUSE">LIGHTHOUSE</MenuItem>
                  <MenuItem value="LOG_CABIN">LOG_CABIN</MenuItem>
                  <MenuItem value="MILL">MILL</MenuItem>
                  <MenuItem value="MOUNTAIN_HUT">MOUNTAIN_HUT</MenuItem>
                  <MenuItem value="RIAD">RIAD</MenuItem>
                  <MenuItem value="TOWER">TOWER</MenuItem>
                  <MenuItem value="TREE_HOUSE">TREE_HOUSE</MenuItem>
                  <MenuItem value="TRULLO">TRULLO</MenuItem>
                  <MenuItem value="RESORT">RESORT</MenuItem>
                  <MenuItem value="GLAMPING">GLAMPING</MenuItem>
                  <MenuItem value="HOMESTAY">HOMESTAY</MenuItem>
                  
                </Select>
              </FormControl>
            </Box>
            <Typography variant='h4'>
                Photos
            </Typography>
            {allPhotos.length > 0 && (
                <>
                  {allPhotos.map((field, index) => (
                    <Col xs="4">
                      <div className="add-player-div">
                        <Typography variant="h6">Photo {index + 1}</Typography>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            label="Enter URL"
                            type="text"
                            fullWidth
                            required
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
                            required
                            name="position"
                            value={field.position}
                            onChange={(event) =>
                              handlePhotosInputChange(index, event)
                            }
                          />
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
                            required
                            name="name"
                            value={field.name}
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
