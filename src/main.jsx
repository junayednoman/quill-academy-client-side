import { HelmetProvider } from 'react-helmet-async';
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Classes from './pages/classes/Classes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ClassDetails from './pages/class detail/ClassDetails';
import AuthProvider from './auth provider/AuthProvider';
import CategoryWiseClasses from './pages/category wise classes/CategoryWiseClasses';
import PrivateParent from './private parent/PrivateParent';
import TeacherForm from './pages/teacher application form/TeacherForm';
import Dashboard from './dashboard/dashboard/Dashboard';
import TeacherReq from './dashboard/teacher request/TeacherReq';
import Users from './dashboard/users/Users';
import AllClasses from './dashboard/all classes/AllClasses';
import Profile from './dashboard/profile/Profile';
import Payment from './pages/payment/Payment';
import MyEnrolledClasses from './dashboard/enrolled classes/MyEnrolledClasses';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/sign-up',
        element: <SignUp></SignUp>
      },
      {
        path: '/classes',
        element: <Classes></Classes>
      },
      {
        path: '/class/:id',
        element: <PrivateParent><ClassDetails></ClassDetails></PrivateParent>,
        loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`)
      },
      {
        path: '/categories/:category',
        element: <CategoryWiseClasses></CategoryWiseClasses>,
        loader: ({ params }) => fetch(`http://localhost:5000/categories/${params.category}`)
      },
      {
        path: '/tech-on-quillAcademy',
        element: <PrivateParent><TeacherForm></TeacherForm></PrivateParent>
      },
      {
        path: '/payment',
        element: <PrivateParent><Payment></Payment></PrivateParent>
      },
    ]
  },
  // dashboard start here
  {
    path: '/',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard',
        element: ''
      },
      {
        path: '/dashboard/teacher-request',
        element: <TeacherReq></TeacherReq>
      },
      {
        path: '/dashboard/users',
        element: <Users></Users>
      },
      {
        path: '/dashboard/classes',
        element: <AllClasses></AllClasses>
      },
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>
      },

      //  -=-=-=-=-=--=-=-=-=-=- student routes -=-=-=-=-=--=-=-=-=-=-
      {
        path: '/dashboard/my-classes',
        element: <MyEnrolledClasses></MyEnrolledClasses>
      },
    ]
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
