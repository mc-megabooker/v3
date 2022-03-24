import router from '../router';
import {Request, Response} from 'express';
import { IApartment, IFacility, IPhoto, IPrice } from '../../domain/IApartment';
import { Apartment } from '../../models';
import { IError } from '../../domain/IError';

router.route('/apartment')
  .post(async (req: Request, res: Response) => {
    const {
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
    }: {
      providerApartmentId: string,
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
      res.status(201).json(savedApartment);
      console.log(savedApartment);
    } catch (e) {
      const error: IError = {
        status: 500,
        message: "Something is wrong"
      }
      console.error(e);
      res.status(error.status).json({message: "Something us wrong"})
    }
  });

  export default router;