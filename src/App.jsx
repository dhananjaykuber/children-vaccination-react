import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Authentication from './pages/Authentication';
import { useEffect } from 'react';
import { setAdmin } from './redux/admin/adminSlice';
import ChildrenDetail from './pages/ChildrenDetail';
import RegisterChildren from './pages/RegisterChildren';
import ListChildrens from './pages/ListChildrens';
import ListVaccinations from './pages/ListVaccinations';

function App() {
  const dispatch = useDispatch();

  const { admin } = useSelector((state) => state.admin);

  useEffect(() => {
    const json = JSON.parse(localStorage.getItem('childvaccination'));

    if (json) {
      dispatch(setAdmin(json));
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={admin ? <Navigate to="/dashboard" /> : <Authentication />}
        />
        <Route
          path="/dashboard"
          element={admin ? <RegisterChildren /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/children-registration"
          element={admin ? <RegisterChildren /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/children-list"
          element={admin ? <ListChildrens /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/children-vaccination"
          element={admin ? <ListVaccinations /> : <Navigate to="/" />}
        />
        <Route
          path="/dashboard/profile/:id"
          element={admin ? <ChildrenDetail /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
