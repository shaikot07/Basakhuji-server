import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { userRoutes } from '../modules/user/user.route';
import { RentalHouseRoutes } from '../modules/rentalHouse/rentalHouse.route';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
