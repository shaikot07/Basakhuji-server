import express from 'express';
import auth from '../../middlewares/auth';
import { userController } from './user.controller';
import { USER_ROLE } from './user.constant';

const router = express.Router();



// router.post(
//   '/create-student',
//   auth(USER_ROLE.admin),
//   validateRequest(createStudentValidationSchema),
//   UserControllers.createStudent,
// );
// router.patch('/admin/users/:userId/block', auth('admin'),
router.get('/',auth(USER_ROLE.admin), userController.getAllUser)
router.get('/:userId/singleUser', userController.getsingleUserById)
router.patch('/:userId/block',auth(USER_ROLE.admin), userController.blockUser)
router.patch('/:userId/role',auth(USER_ROLE.admin), userController.updatedRollById)
router.patch('/:userId/profileUpdated', userController.updatedUserPersonalInfoById)
router.put('/:userId/changePassword', userController.changePasswordByUserId)
// router.delete('/blogs/:id', auth('admin'), BlogControllers.deleteBlogByAdmin);1
    
export const userRoutes = router;