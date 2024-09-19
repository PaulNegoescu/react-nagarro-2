
import { type InferType, object, string, ref } from 'yup';

const common = {
  email: string()
    .required('Please provide a valid email address.')
    .email('Please provide a valid email address.'),
  password: string()
    .required('Please enter a password.')
    .min(6, 'The password should be at least 6 characters long.'),
}

export const loginSchema = object(common);

export const registerSchema = object({
  ...common,
  retypePassword: string().oneOf(
    [ref('password')],
    'The passwords do not match.'
  ),
  firstName: string().required('Please tell us your first name.'),
  lastName: string().required('Please tell us your last name.'),
});

export type LoginFormData = InferType<typeof loginSchema>;
export type RegisterFormData = InferType<typeof registerSchema>;
