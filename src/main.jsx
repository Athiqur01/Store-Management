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



const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:'/addItem',
        element:<AddItem></AddItem>,
        
      },
      {
        path:'/updateItem',
        element:<UpdateItem></UpdateItem>
      },
      {
        path:'/requisition',
        element:<Requisition></Requisition>
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
        element:<SIB></SIB>
      },
      {
        path:'/ledger',
        element:<Ledger></Ledger>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
   <StrictMode>
   <AuthProvider>
   <div className='container mx-auto max-w-full bg-[#9C27B0]'>
    <RouterProvider router={router} />
    </div>
   </AuthProvider>
  </StrictMode>
    </QueryClientProvider>


  ,
)
