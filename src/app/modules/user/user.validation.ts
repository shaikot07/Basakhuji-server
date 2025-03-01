import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Name must be a string',
      })
      .min(1, { message: 'Name is required' })
      .max(50, { message: 'Name cannot be more than 50 characters' }),

    email: z
      .string({
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Invalid email address' }),

    password: z
      .string({
        invalid_type_error: 'Password must be a string',
      })
      .max(20, { message: 'Password cannot be more than 100 characters' }),
  }),
});

export const UserValidation = {
  userValidationSchema,
};
