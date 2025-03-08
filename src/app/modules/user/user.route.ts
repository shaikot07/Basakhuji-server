import express from 'express';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';
import { USER_ROLE } from './user.constant';

const router = express.Router();

// router.post('/register',validateRequest(UserValidation.userValidationSchema), userController.newUserRegistration)

// router.post('/login',validateRequest(AuthValidation.loginValidationSchema), AuthControllers.loginUser)
// router.post(
//   '/create-student',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );
// router.patch('/admin/users/:userId/block', auth('admin'),
router.get('/',auth(USER_ROLE.admin), userController.getAllUser)
router.patch('/:userId/block',auth(USER_ROLE.admin), userController.blockUser)
router.put('/:userId/role',auth(USER_ROLE.admin), userController.blockUser)
// router.delete('/blogs/:id', auth('admin'), BlogControllers.deleteBlogByAdmin);

export const userRoutes = router;