import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import FundList from './components/mutualFund/FundList.jsx';
import UpdateFund from './components/mutualFund/UpdateFund.jsx';
import AddFund from './components/mutualFund/AddFund.jsx';
import BuySell from './components/transaction/BuySell.jsx';
import Profile from './components/profile/Profile.jsx';
import Home from './components/home/Home.jsx';



const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {index: true, element:<Home/>},
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/funds', element:<FundList/>},
      {path: '/update-fund/:id',element: <UpdateFund />},
      { path: '/add-fund', element: <AddFund/>},
      { path: '/buy-sell/:type/:fundId', element: <BuySell/>},
      { path: '/profile', element:<Profile/>}

      // Add other routes like dashboard here later
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={routes} />
  
);
