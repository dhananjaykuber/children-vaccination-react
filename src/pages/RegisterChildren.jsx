import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';

const RegisterChildren = () => {
  const { admin } = useSelector((store) => store.admin);

  const [loading, setLoading] = useState(false);

  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('M');
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const notify = () => {
    toast.success('Registration successful.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const registerChildren = async (e) => {
    e.preventDefault();

    const data = {
      dob: dob,
      gender: gender,
      parent_name: parentName,
      parent_email: email,
      phone_number: phone,
    };

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/children-register/`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
      }
    );

    if (res.status === 200) {
      console.log(res.data);
      notify();

      setDob('');
      setGender('M');
      setParentName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="text-2xl font-medium">Children Registration</div>

        <form
          className="w-[400px] mt-10 shadow-xl px-10 py-10 rounded-lg"
          onSubmit={registerChildren}
        >
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Date Of Brith
            </span>
            <input
              required
              type="date"
              placeholder="Date Of Brith"
              className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Gender
            </span>
            <select
              className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Parent Name
            </span>
            <input
              required
              type="text"
              placeholder="Parent Name"
              className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
            />
          </label>
          <label className="block mb-4">
            <span className="block text-sm font-medium text-slate-700 mb-1">
              Parent Email
            </span>
            <input
              required
              type="email"
              placeholder="Parent Email"
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
              required
              type="number"
              placeholder="Phone Number"
              className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400 w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <button className="bg-slate-700 px-5 py-2 rounded-lg text-sm text-white border hover:bg-white hover:text-slate-700 hover:border-slate-700 transition">
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </Layout>
    </>
  );
};

export default RegisterChildren;
