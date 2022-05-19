import Apartments from './Pages/Apartments';
import Import from './Pages/Import';
import CreateApartment from './Pages/CreateApartment';
import ApartmentList from './Pages/ApartmentList';
import ApartmentDetails from './Pages/ApartmentDetails';

const routes = [
  {
    path: '/', component: Apartments, exact: true
  },
  {
    path: '/import', component: Import, exact: true
  },
  {
    path: '/create-apartment', component: CreateApartment, exact: true
  },
  {
    path: '/apartment-list', component: ApartmentList, exact: true
  },
  {
    path: '/apartment-list/:id', component: ApartmentDetails, exact: true
  }
];

export default routes;