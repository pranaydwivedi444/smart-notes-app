// import { z } from 'zod';
const {z} = require('zod');
const userNameSchema = z
  .string()
  .min(4, "Username must be at least 4 characters long");

// Check password with at least one special character or capital letter and 8 characters
const passwordSchema = z
  .string()
  .regex(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/,
    "Password must be at least 8 characters long and contain at least one uppercase letter or special character"
  );

// Check email format
const emailSchema = z.string().email("Invalid email address");

const userSchema = z.object({
  username: userNameSchema,
  password: passwordSchema,
  email: emailSchema,
});

module.exports = userSchema;
