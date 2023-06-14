import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import axios from 'axios';

const ListChildrens = () => {
  const { admin } = useSelector((store) => store.admin);

  const [data, setData] = useState([]);

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
  }, []);

  return (
    <Layout>
      <div className="relative overflow-x-auto table-auto">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default ListChildrens;
