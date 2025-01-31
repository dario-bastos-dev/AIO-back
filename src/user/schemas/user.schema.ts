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

export const UserIdSchema = z.string().uuid().nonempty();

// Upadate user
export const UpdateUserSchema = z.object({
	name: z.string().min(5).optional(),
	email: z.string().email().optional(),
	password: z.string().min(8).optional(),
});
