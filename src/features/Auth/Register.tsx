import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthContext';
import { RegisterFormData, registerSchema } from './ValidationSchemas';
import { Input } from '@/components/form/Input';

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { login } = useAuthContext();

  async function handleRegister(values: RegisterFormData) {
    const send2Server = { ...values };
    delete send2Server.retypePassword;
    const data = await fetch('http://localhost:3210/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(send2Server),
    }).then((res) => res.json());

    if (!data.accessToken) {
      toast.error(data);
      return;
    }

    toast.success('You logged in successfully.');
    login(data);
  }

  return (
    <form
      className="brandForm"
      onSubmit={handleSubmit(handleRegister)}
      noValidate
    >
      <h1>Register</h1>
      <Input
        id="email"
        type="email"
        labelText="Email"
        errorMessage={errors.email?.message}
        {...register('email')}
      />

      <Input
        id="password"
        type="password"
        labelText="Password"
        errorMessage={errors.password?.message}
        {...register('password')}
      />

      <Input
        id="retypePassword"
        type="password"
        labelText="Retype Password"
        errorMessage={errors.retypePassword?.message}
        {...register('retypePassword')}
      />

      <Input
        id="firstName"
        type="text"
        labelText="First Name"
        errorMessage={errors.firstName?.message}
        {...register('firstName')}
      />

      <Input
        id="lastName"
        type="text"
        labelText="Last Name"
        errorMessage={errors.lastName?.message}
        {...register('lastName')}
      />

      <button type="submit" className="actionButton">
        Register
      </button>
    </form>
  );
}
