import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const ListVaccinations = () => {
  const navigate = useNavigate();
  const { admin } = useSelector((store) => store.admin);

  const [data, setData] = useState([]);
  const [date, setDate] = useState(getCurrentDate());
  const [fetch, setFetch] = useState(true);
  const [enabled, setEnabled] = useState(false);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  const notify = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  useEffect(() => {
    const getChildrensVaccination = async () => {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/vaccination-date/${date}?vaccinated=${enabled ? 'True' : 'False'}`,
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
  }, [date, fetch, enabled]);

  const updateStatus = async (id) => {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/vaccination-update/${id}`,
      JSON.stringify({ taken: enabled ? 'False' : 'True' }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.token}`,
        },
      }
    );

    if (res.status === 200) {
      notify(enabled ? 'Marked as not vaccinated.' : 'Marked as vaccinated.');
      setFetch(!fetch);
    }
  };

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="text-2xl font-medium">Childrens Vaccination</div>
        <div className="flex items-center justify-between mt-8">
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

          <div className="relative flex flex-col items-center justify-center overflow-hidden">
            <div className="flex">
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={enabled}
                  readOnly
                />
                <div
                  onClick={() => {
                    setEnabled(!enabled);
                  }}
                  className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"
                ></div>
                <span className="ml-2 text-sm font-medium text-gray-900">
                  Vaccinated
                </span>
              </label>
            </div>
          </div>
        </div>

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
                <th scope="col" className="px-6 py-3"></th>
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
                    {vaccine.children_id}
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
                      checked={vaccine.taken}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-green-700 text-white text-sm px-3 py-1 rounded-md"
                      onClick={() =>
                        navigate(`/dashboard/profile/${vaccine.children_id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default ListVaccinations;
