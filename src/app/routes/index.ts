import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { RentalHouseRoutes } from '../modules/rentalHouse/rentalHouse.route';
import { RentalRequestRoutes } from '../modules/RentalRequests/rentalRequest.route';
import { OrderRoutes } from '../modules/order/order.router';
const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/landlords',
    route: RentalHouseRoutes,
  },
  {
    path: '/tenants',
    route: RentalRequestRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
