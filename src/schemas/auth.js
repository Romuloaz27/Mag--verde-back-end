import { z } from 'zod';

export const authSchema = z.object({
  name: z.string().max(30),
  email: z.email(),
  password: z.string().min(6).max(60),
  role: z.enum(['user', 'admin'])
});
