import axios from 'axios';
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setAdmin } from '../redux/admin/adminSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const register = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      phone_number: phone,
      email: email,
      password: password,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/hospital-register/`,
      JSON.stringify(data)
    );

    if (res.status === 200) {
      let json = res.data.data;

      json = { ...json, token: res.data.token };

      localStorage.setItem('childvaccination', JSON.stringify(json));

      dispatch(setAdmin(json));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-[88vh]">
        <form
          className="shadow-md px-10 py-10 rounded-lg w-[400px] mt-20"
          onSubmit={register}
        >
          <div className="text-2xl font-semibold mb-5">Signup</div>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Hospital Name
            </span>
            <input
              type="text"
              placeholder="Hospital Name"
              className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </span>
            <input
              type="email"
              placeholder="Email"
              className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </span>
            <input
              type="text"
              placeholder="Phone Number"
              className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </span>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute right-2 top-3 cursor-pointer">
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
            </div>
          </label>
          <button className="bg-slate-700 px-5 py-2 rounded-lg text-sm text-white border hover:bg-white hover:text-slate-700 hover:border-slate-700 transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
