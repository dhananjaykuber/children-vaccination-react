import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

const ListChildrens = () => {
  const navigate = useNavigate();
  const { admin } = useSelector((store) => store.admin);

  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(true);

  const notify = () => {
    toast.success('Record deleted successfully.', {
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

  useEffect(() => {
    const getChildrenList = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/children-list/`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      setData(res.data.data);
    };

    getChildrenList();
  }, [fetch]);

  const deleteChildren = async (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-2xl rounded-lg px-8 py-5">
            <div className="font-semibold text-slate-700 text-lg">
              Are you sure?
            </div>
            <p className="text-sm text-slate-600 mb-3">
              You want to delete this record?
            </p>

            <button
              onClick={async () => {
                const res = await axios.delete(
                  `${import.meta.env.VITE_BACKEND_URL}/children-delete/${id}`,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${admin.token}`,
                    },
                  }
                );

                if (res.status === 200) {
                  notify();
                  console.log(res.data);
                  setFetch(!fetch);
                }

                onClose();
              }}
              className="bg-red-700 px-3 py-1 rounded-lg text-sm text-white border hover:bg-white hover:text-red-700 hover:border-red-700 transition mr-3"
            >
              Yes
            </button>
            <button
              className="bg-slate-700 px-3 py-1 rounded-lg text-sm text-white border hover:bg-white hover:text-slate-700 hover:border-slate-700 transition"
              onClick={onClose}
            >
              No
            </button>
          </div>
        );
      },
    });
  };

  return (
    <>
      <Sidebar />
      <Layout>
        <div className="text-2xl font-medium">Childrens List</div>

        <div className="relative overflow-x-auto table-auto mt-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Date Of Birth
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
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
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((children) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={children.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {children.id}
                  </td>
                  <td className="px-6 py-4">{children.dob}</td>
                  <td className="px-6 py-4">
                    {children.gender === 'M' ? 'Male' : 'Female'}
                  </td>
                  <td className="px-6 py-4">{children.parent_name}</td>
                  <td className="px-6 py-4">{children.parent_email}</td>
                  <td className="px-6 py-4">{children.phone_number}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-green-700 text-white text-sm px-3 py-1 rounded-md"
                      onClick={() =>
                        navigate(`/dashboard/profile/${children.id}`)
                      }
                    >
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-red-700 text-white text-sm px-3 py-1 rounded-md"
                      onClick={() => deleteChildren(children.id)}
                    >
                      Delete
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

export default ListChildrens;
