import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../redux/sidebar/sidebarSlice';
import { useNavigate } from 'react-router-dom';
import { clearAdmin } from '../redux/admin/adminSlice';

const options = [
  {
    name: 'Children Registration',
    link: 'children-registration',
  },
  {
    name: 'Childrens List',
    link: 'children-list',
  },
  {
    name: 'Vaccinations',
    link: 'children-vaccination',
  },
];

const Sidebar = () => {
  const navigete = useNavigate();
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.sidebar);
  const { admin } = useSelector((state) => state.admin);

  return (
    <div className="flex fixed bottom-0 top-0">
      <div className="w-[280px] shadow-lg py-5 px-4 flex flex-col justify-between">
        <div className="overflow-x-auto	no-scrollbar">
          {options.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className={`flex items-center space-x-2 px-3 py-3 rounded-md my-2 cursor-pointer transition ${
                    active === item.name && 'bg-slate-300'
                  }`}
                  onClick={() => {
                    dispatch(setActive({ active: item.name }));
                    navigete(`/dashboard/${item.link}`);
                  }}
                >
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <button
            className="flex items-center space-x-1 cursor-pointer bg-slate-700 px-3 py-3 rounded-lg w-full mb-3"
            onClick={() => {
              localStorage.setItem('childvaccination', '');
              dispatch(clearAdmin());
              navigete('/');
            }}
          >
            <FaSignOutAlt color="white" />
            <p className="font-normal text-sm text-white">Logout</p>
          </button>
          <div className="text-sm font-medium text-slate-700">
            {admin.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
