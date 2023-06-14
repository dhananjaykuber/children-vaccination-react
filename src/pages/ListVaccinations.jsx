import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ListVaccinations = () => {
  const { admin } = useSelector((store) => store.admin);

  const [data, setData] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [fetch, setFetch] = useState(true);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    const getChildrensVaccination = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/vaccination-date/${date}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      setData(res.data.data);
    };

    getChildrensVaccination();
  }, [date, fetch]);

  const updateStatus = async (id) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/vaccination-update/${id}`,
      JSON.stringify({ taken: 'True' }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
      }
    );

    console.log(res.data);
  };

  return (
    <Layout>
      <label className="block mb-4">
        <input
          required
          type="date"
          placeholder="Date Of Brith"
          className="border border-slate-300 rounded-md outline-none text-sm shadow-sm px-3 py-2 placeholder-slate-400"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <div className="relative overflow-x-auto table-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Parent Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                Vaccine
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((vaccine) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={vaccine.id}
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {vaccine.id}
                </td>
                <td className="px-6 py-4">{vaccine.parent_name}</td>
                <td className="px-6 py-4">{vaccine.parent_email}</td>
                <td className="px-6 py-4">{vaccine.phone_number}</td>
                <td className="px-6 py-4">{vaccine.vaccine_name}</td>
                <td className="px-6 py-4">{vaccine.date}</td>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    onChange={() => updateStatus(vaccine.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ListVaccinations;
