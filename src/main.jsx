import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './Component/Root/Root';
import Home from './Component/Home/Home';
import AddItem from './Component/AddItem/AddItem';
import UpdateItem from './Component/UpdateItem/UpdateItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Requisition from './Component/Requisition/Requisition';
import Request from './Component/Request/Request';
import RequestDetail from './Component/RequestDetail/RequestDetail';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import AuthProvider from './Provider/AuthProvider/AuthProvider';
import SIB from './Component/SIB/SIB';
import Ledger from './Component/Ledger/Ledger';
import LedgerDetail from './Component/LedgerDetail/LedgerDetail';
import SRB from './Component/SRB/SRB';
import RequisitionRegister from './Component/RequisitionRegister/RequisitionRegister';
import DownloadRequisition from './Component/DownloadRequisition/DownloadRequisition';
import ItemCatalog from './Component/ItemCatalog/ItemCatalog';
import Deshboard from './Component/Deshboard/Deshboard';
import Profile from './Component/Profile/Profile';
import UserManagement from './Component/userManagement/UserManagement';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import MyRequisition from './Component/MyRequisition/MyRequisition';
import Error from './Component/Error/Error';



const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    errorElement:<Error></Error>,
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:'/addItem',
        element:<PrivateRoute><AddItem></AddItem></PrivateRoute>,
        
      },
      {
        path:'/updateItem',
        element:<PrivateRoute><UpdateItem></UpdateItem></PrivateRoute>
      },
      {
        path:'/requisition',
        element:<PrivateRoute><Requisition></Requisition></PrivateRoute>
      },
      {
        path:"/request",
        element:<Request></Request>
      },
      {
        path:"/request/:id",
        element:<RequestDetail></RequestDetail>
      }, 
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/sib',
        element:<PrivateRoute><SIB></SIB></PrivateRoute>
      },
      {
        path:'/ledger',
        element:<PrivateRoute><Ledger></Ledger></PrivateRoute>
      },
      {
        path:'/ledger/:name',
        element:<LedgerDetail></LedgerDetail>
      },
      {
        path:'/srb',
        element:<PrivateRoute><SRB></SRB></PrivateRoute>
      },
      {
        path:'/reqregester',
        element:<RequisitionRegister></RequisitionRegister>
      },
      {
        path:'/download/:id',
        element:<DownloadRequisition></DownloadRequisition>
      },
      {
        path:'/catalog',
        element:<PrivateRoute><ItemCatalog></ItemCatalog></PrivateRoute>
      },
    ]
  },

  {
    path:'/deshboard',
    element:<Deshboard></Deshboard>,
    children:[
      {
        path:'/deshboard/profile',
        element:<Profile></Profile>
      },
      {
        path:'/deshboard/user',
        element:<UserManagement></UserManagement>
      },
      {
        path:'/deshboard/requisition',
        element:<MyRequisition></MyRequisition>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
   <StrictMode>
   <AuthProvider>
   <div className='container mx-auto max-w-[1400px] bg-[#9C27B0]'>
    <RouterProvider router={router} />
    </div>
   </AuthProvider>
  </StrictMode>
    </QueryClientProvider>


  ,
)
