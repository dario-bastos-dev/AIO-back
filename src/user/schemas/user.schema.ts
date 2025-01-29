import { z } from 'zod';

// Login user
export const LoginUserSchema = z.object({
	email: z.string().email().nonempty(),
	password: z.string().min(8).nonempty(),
});

// Create user
export const CreateUserSchema = LoginUserSchema.extend({
	name: z.string().min(5).nonempty(),
});
