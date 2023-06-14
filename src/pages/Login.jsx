import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAdmin } from '../redux/admin/adminSlice';

const Login = () => {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/hospital-login/`,
      JSON.stringify(data)
    );

    let json = res.data.data;

    json = { ...json, token: res.data.token };

    localStorage.setItem('childvaccination', JSON.stringify(json));

    dispatch(setAdmin(json));
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-[88vh]">
        <form
          className="shadow-md px-10 py-10 rounded-lg w-[400px] mt-20"
          onSubmit={login}
        >
          <div className="text-2xl font-semibold mb-5">Login</div>
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
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
