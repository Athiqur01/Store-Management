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
        element:<AddItem></AddItem>
      },
      {
        path:'/updateItem',
        element:<UpdateItem></UpdateItem>
      },
      {
        path:'/requisition',
        element:<Requisition></Requisition>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
   <StrictMode>
    <div className='container mx-auto bg-[#9C27B0]'>
    <RouterProvider router={router} />
    </div>
  </StrictMode>
    </QueryClientProvider>


  ,
)
