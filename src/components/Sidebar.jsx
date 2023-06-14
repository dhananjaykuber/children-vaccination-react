import React, { useState } from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setActive } from '../redux/sidebar/sidebarSlice';

const options = ['Children Registration', 'Childrens List', 'Vaccinations'];

const Sidebar = () => {
  const dispatch = useDispatch();

  const { active } = useSelector((state) => state.sidebar);

  return (
    <div className="flex fixed bottom-0 top-0">
      <div className="w-[280px] shadow-lg py-5 px-4 flex flex-col justify-between">
        <div className="overflow-x-auto	no-scrollbar">
          {options.map((name, index) => {
            return (
              <div key={index}>
                <div
                  className={`flex items-center space-x-2 px-3 py-3 rounded-md my-2 cursor-pointer transition ${
                    active === name && 'bg-slate-300'
                  }`}
                  onClick={() => dispatch(setActive({ active: name }))}
                >
                  <p className="text-sm font-medium">{name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <button
            className="flex items-center space-x-1 cursor-pointer bg-slate-700 px-3 py-3 rounded-lg w-full mb-3"
            // onClick={() => dispatch(clearAdmin())}
          >
            <FaSignOutAlt color="white" />
            <p className="font-normal text-sm text-white">Logout</p>
          </button>
          <div className="text-sm font-medium text-slate-700">
            admin@gmai.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
