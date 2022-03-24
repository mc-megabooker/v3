import router from '../router';
import {Request, Response} from 'express';
import { IApartment, IFacility, IPhoto, IPrice } from '../../domain/IApartment';
import { Apartment } from '../../models';
import { IError } from '../../domain/IError';
import { v4 as uuidv4 } from 'uuid';
import postApartment from '../../services/holidu.service';

router.route('/apartment')
  .post(async (req: Request, res: Response) => {
    const providerApartmentId: string = uuidv4();
    const {
      lat,
      lng,
      maxPersons,
      generalMinimumStay,
      generalMinimumPrice,
      active,
      apartmentType,
      facilities,
      photos
    }: {
      lat: number,
      lng: number,
      maxPersons: number,
      generalMinimumStay: number,
      generalMinimumPrice: IPrice,
      active: boolean,
      apartmentType: string,
      facilities: Array<IFacility>,
      photos: Array<IPhoto>
    } = req.body;
    const myApartment: IApartment = new Apartment({
      providerApartmentId,
      lat,
      lng,
      maxPersons,
      generalMinimumStay,
      generalMinimumPrice,
      active,
      apartmentType,
      facilities,
      photos
    });
    try {
      const savedApartment: IApartment = await myApartment.save();
      postApartment(myApartment);
      res.status(201).json(savedApartment);
    } catch (e) {
      const error: IError = {
        status: 500,
        message: "Something is wrong"
      }
      console.error(e);
      res.status(error.status).json({message: "Something is wrong"})
    }
  });

  export default router;