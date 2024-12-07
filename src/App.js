import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        {user && window.location.pathname !== '/dashboard' && <Navbar />}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <footer className="text-center py-4 text-gray-600">
          Created by Ahmet Aydogan
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
