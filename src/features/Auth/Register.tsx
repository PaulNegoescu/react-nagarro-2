import { type ChangeEvent, useState, type FormEvent } from 'react';

export function Register() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    retypePassword: '',
    firstName: '',
    lastName: '',
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    // const newValues = {...values};
    // newValues[e.currentTarget.name] = e.currentTarget.value;
    // setValues(newValues);

    setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(values);
    

    // const formData = new FormData(e.currentTarget);
    // console.log(formData.get('email'));
  }

  return (
    <form className="brandForm" onSubmit={handleRegister}>
      <h1>Register</h1>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleInputChange}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={values.password}
        onChange={handleInputChange}
      />
      <label htmlFor="retypePassword">Retype Password</label>
      <input
        type="password"
        id="retypePassword"
        name="retypePassword"
        value={values.retypePassword}
        onChange={handleInputChange}
      />
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={values.firstName}
        onChange={handleInputChange}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={values.lastName}
        onChange={handleInputChange}
      />

      <button type="submit" className="actionButton">
        Register
      </button>
    </form>
  );
}
