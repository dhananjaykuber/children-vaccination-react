import React from 'react';
import { useSelector } from 'react-redux';
import RegisterChildren from './RegisterChildren';
import ListChildrens from './ListChildrens';
import ListVaccinations from './ListVaccinations';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const { active } = useSelector((state) => state.sidebar);

  return (
    <div>
      <Sidebar />
      {active === 'Children Registration' && <RegisterChildren />}
      {active === 'Childrens List' && <ListChildrens />}
      {active === 'Vaccinations' && <ListVaccinations />}
    </div>
  );
};

export default Dashboard;
