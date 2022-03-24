import {IApartment} from "../domain/IApartment";
import Database from '../dbConfigs';
import {Schema} from "mongoose";

const {mongo: {model}} = Database;

const ApartmentSchema: Schema<IApartment> = new Schema<IApartment>({
  providerApartmentId: { type: String, required: true, unique: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  maxPersopm: { type: Number, required: true },
  generalMinimumStay: { type: Number, required: true },
  generalMinimumPrice: {required: true },
  active: { type: Boolean, required: true },
  apartmentType: { type: String, required: true },
  facilities: { type: [], required: true },
  photos: { type: [], required: true }
});

export default model<IApartment>('Apartment',ApartmentSchema);