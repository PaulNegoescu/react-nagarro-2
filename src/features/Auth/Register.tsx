import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { type InferType, object, string, ref } from 'yup';
import { useAuthContext } from './AuthContext';

const validationSchema = object({
  email: string()
    .required('Please provide a valid email address.')
    .email('Please provide a valid email address.'),
  password: string()
    .required('Please choose a password.')
    .min(6, 'The password should be at least 6 characters long.'),
  retypePassword: string().oneOf(
    [ref('password')],
    'The passwords do not match.'
  ),
  firstName: string().required('Please tell us your first name.'),
  lastName: string().required('Please tell us your last name.'),
});

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { login } = useAuthContext();

  async function handleRegister(values: InferType<typeof validationSchema>) {
    const send2Server = {...values};
    delete send2Server.retypePassword;
    const data = await fetch('http://localhost:3210/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send2Server),
    }).then(res => res.json());

    if(!data.accessToken) {
      toast.error(data);
      return;  
    }

    toast.success('You logged in successfully.')
    login(data);
  }

  return (
    <form
      className="brandForm"
      onSubmit={handleSubmit(handleRegister)}
      noValidate
    >
      <h1>Register</h1>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register('email')} />
      {errors.email && <p className="errorMessage">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register('password')} />
      {errors.password && (
        <p className="errorMessage">{errors.password.message}</p>
      )}

      <label htmlFor="retypePassword">Retype Password</label>
      <input
        type="password"
        id="retypePassword"
        {...register('retypePassword')}
      />
      {errors.retypePassword && (
        <p className="errorMessage">{errors.retypePassword.message}</p>
      )}

      <label htmlFor="firstName">First Name</label>
      <input type="text" id="firstName" {...register('firstName')} />
      {errors.firstName && (
        <p className="errorMessage">{errors.firstName.message}</p>
      )}

      <label htmlFor="lastName">Last Name</label>
      <input type="text" id="lastName" {...register('lastName')} />
      {errors.lastName && (
        <p className="errorMessage">{errors.lastName.message}</p>
      )}

      <button type="submit" className="actionButton">
        Register
      </button>
    </form>
  );
}
