import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Authentication = () => {
  const [form, setForm] = useState('login');

  return (
    <div>
      {form === 'login' ? <Login /> : <Register />}

      {form === 'login' ? (
        <p
          className="text-sm text-slate-600 mb-3 text-center cursor-pointer"
          onClick={() => setForm('register')}
        >
          Don't have an account? Signup here
        </p>
      ) : (
        <p
          className="text-sm text-slate-600 mb-3 text-center cursor-pointer"
          onClick={() => setForm('login')}
        >
          Already have an account? Login here
        </p>
      )}
    </div>
  );
};

export default Authentication;
