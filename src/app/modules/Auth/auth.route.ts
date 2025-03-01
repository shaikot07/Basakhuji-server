import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../user/user.validation';


const router = express.Router();

router.post('/register',validateRequest(UserValidation.userValidationSchema),AuthControllers.newUserRegistration)

router.post('/login',validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)

router.post('/refresh-token',validateRequest(AuthValidation.refreshTokenValidationSchema),AuthControllers.refreshToken,
  );

export const AuthRoutes = router;