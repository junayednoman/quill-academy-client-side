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
import AdminParent from './private parent/admin parent/AdminParent';
import StudentParent from './private parent/student parent/StudentParent';
import MyClasses from './dashboard/my classes/MyClasses';
import AddClass from './dashboard/add class/AddClass';
import TeacherParent from './private parent/teacher parent/TeacherParent';
import UpdateClass from './dashboard/update class/UpdateClass';

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
    element: <PrivateParent><Dashboard /></PrivateParent>,
    children: [
      {
        path: '/dashboard',
        element: ''
      },

      //  -=-=-=-=-=--=-=-=-=-=- these routes aer only for admin -=-=-=-=-=--=-=-=-=-=-
      {
        path: '/dashboard/teacher-request',
        element: <AdminParent><TeacherReq></TeacherReq></AdminParent>
      },
      {
        path: '/dashboard/users',
        element: <AdminParent><Users></Users></AdminParent>
      },
      {
        path: '/dashboard/classes',
        element: <AdminParent><AllClasses></AllClasses></AdminParent>
      },

      //  -=-=-=-=-=--=-=-=-=-=- common for all type of users -=-=-=-=-=--=-=-=-=-=-
      {
        path: '/dashboard/profile',
        element: <PrivateParent><Profile></Profile></PrivateParent>
      },

      //  -=-=-=-=-=--=-=-=-=-=- student routes -=-=-=-=-=--=-=-=-=-=-
      {
        path: '/dashboard/my-enrolled-classes',
        element: <StudentParent><MyEnrolledClasses></MyEnrolledClasses></StudentParent>
      },

      //  -=-=-=-=-=--=-=-=-=-=- Teacher's routes -=-=-=-=-=--=-=-=-=-=-
      {
        path: '/dashboard/my-classes',
        element: <MyClasses></MyClasses>
      },
      {
        path: '/dashboard/add-class',
        element: <TeacherParent><AddClass></AddClass></TeacherParent>
      },
      {
        path: '/dashboard/update-class/:id',
        element: <TeacherParent><UpdateClass></UpdateClass></TeacherParent>,
        loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`)
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
