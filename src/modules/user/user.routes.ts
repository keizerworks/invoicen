import  {Router} from 'express';
import { validateRequestBody } from '@/middleware/validate-request.middleware';
import { userProfileUpdate, userOrganizationUpdate, getUserProfile, getUserOrganization } from './user.controller';
import { postUpdateUserProfileSchema, postUpdateUserOrganizationSchema } from './user.schema';


const userRouter = Router();

userRouter.post('/update-profile', validateRequestBody(postUpdateUserProfileSchema), userProfileUpdate);
userRouter.post('/update-organization/:id', validateRequestBody(postUpdateUserOrganizationSchema), userOrganizationUpdate);
userRouter.get('/profile', getUserProfile);
userRouter.get('/organization', getUserOrganization );

export default userRouter;