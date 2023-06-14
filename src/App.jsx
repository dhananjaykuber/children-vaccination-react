import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import { useEffect } from 'react';
import { setAdmin } from './redux/admin/adminSlice';

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
        <Route path="/" element={admin ? <Dashboard /> : <Authentication />} />
        <Route
          path="/dashboard"
          element={admin ? <Dashboard /> : <Authentication />}
        />
      </Routes>
    </Router>
  );
}

export default App;
