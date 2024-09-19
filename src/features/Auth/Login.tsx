import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAuthContext } from './AuthContext';
import { LoginFormData, loginSchema } from './ValidationSchemas';

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { login } = useAuthContext();

  async function handleLogin(values: LoginFormData) {
    const data = await fetch('http://localhost:3210/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
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
      onSubmit={handleSubmit(handleLogin)}
      noValidate
    >
      <h1>Login</h1>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" {...register('email')} />
      {errors.email && <p className="errorMessage">{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input type="password" id="password" {...register('password')} />
      {errors.password && (
        <p className="errorMessage">{errors.password.message}</p>
      )}

      <button type="submit" className="actionButton">
        Login
      </button>
    </form>
  );
}
