import {
     createBrowserRouter,
   } from "react-router-dom";
 
   import LoginPage from "./features/auth/loginPage";
   import RegisterPage from "./features/auth/registerPage";
   import DashboardPages from "./routes/dashboard";
   import Home from "./features/auth/home";
   import AddContact from "./features/contact/AddContact";
   import ListContact from "./features/contact/ListContact";
   import EditContactPage from "./features/contact/EditContact";
   import Profile from "./features/auth/user";
   import Logout from "./features/auth/deconnexion";
   import DashboardComponent from "./features/auth/dashboard";
 
 
  export const router = createBrowserRouter([
     {
       path: "/login",
       element: <LoginPage />,
     },
     {
          path: "/",
          element: <Home />,
        },
     {
          path: "/register",
          element: <RegisterPage />,

     },
  
     {
        path: "/addContact",
        element: <AddContact />,

   },
     
     {
         path: "/dashboard",
         element: <DashboardPages />,
         children: [
             {
                 path: "",
                 element: <DashboardComponent/>,
             },
             {
                 path: "Profile",
                 element: <Profile />,
             },
             {
                 path: "contacts",
                 element: <ListContact />,
             },
             {
                path: "contacts/updateContact/:id",
                element: <EditContactPage />,
        
           },
           {
            path: "Logout",
            element: <Logout />,
    
       },
           {
    
       },


             
         ]
     }
   ]);