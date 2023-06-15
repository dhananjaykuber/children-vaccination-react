import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ChildrenDetail = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const { admin } = useSelector((store) => store.admin);

  useEffect(() => {
    const getChildrenDetail = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/children-detail/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${admin.token}`,
          },
        }
      );

      if (res.status === 200) {
        setData(res.data.data.data);
        console.log(res.data.data.data);
      }
    };

    getChildrenDetail();
  }, [fetch]);
  return (
    <>
      <Sidebar />
      <Layout>
        <div className="text-xl font-medium">Children Detail</div>
        <div className="relative overflow-x-auto table-auto mt-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-14">
            <thead className="text-md font-normal text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  {data.id}
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Parent Name
                </th>
                <th scope="col" className="px-6 py-3">
                  {data.parent_name}
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  {data.phone_number}
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  {data.parent_email}
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Date Of Birth
                </th>
                <th scope="col" className="px-6 py-3">
                  {data.dob}
                </th>
              </tr>
              <tr>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  {data.gender === 'F' ? 'Female' : 'Male'}
                </th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="text-xl font-medium">Vaccination Table</div>
        <div className="relative overflow-x-auto table-auto mt-8">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
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
              {data?.vaccines?.map((vaccine) => (
                <tr key={vaccine.id}>
                  <td className="px-6 py-4">{vaccine.id}</td>
                  <td className="px-6 py-4">{vaccine.vaccine_name}</td>
                  <td className="px-6 py-4">{vaccine.date}</td>
                  <td className="px-6 py-4">{vaccine.taken ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export default ChildrenDetail;
