import {
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createHashRouter,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Offers from "./pages/offers/Offers";
import AddOffer from "./pages/offers/AddOffer";
import About from "./pages/about/About";
import Services from "./pages/services/Services";
import Doctors from "./pages/doctors/Doctors";
import AddDoctor from "./pages/doctors/AddDoctor";
import Reserve from "./pages/reserve/Reserve";
import Blog from "./pages/blog/Blog";
import AddBlog from "./pages/blog/AddBlog";
import Login from "./pages/login/Login";
import { useAuthStore } from "./stores/authStore";
import { shallow } from "zustand/shallow";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAbout from "./pages/about/AddAbout";
import Info from "./pages/info/Info";
import AddService from "./pages/services/AddService";
import AddServicesPost from "./pages/services/AddServicesPost";
import AddSubService from "./pages/services/AddSubService";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="h-screen flex-1 p-7">
        <Outlet />
      </div>
    </div>
  );
};
function App() {
  const { checkAuth } = useAuthStore((state) => state, shallow);
  const isAuth = checkAuth();

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/info",
          element: <Info />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/blog/add",
          element: <AddBlog />,
        },
        {
          path: "/offers",
          element: <Offers />,
        },
        {
          path: "/offers/add",
          element: <AddOffer />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/services/add",
          element: <AddService />,
        },
        {
          path: "/services/subservices/add",
          element: <AddSubService />,
        },
        {
          path: "/services/post/add",
          element: <AddServicesPost />,
        },
        {
          path: "/doctors",
          element: <Doctors />,
        },
        {
          path: "/doctors/add",
          element: <AddDoctor />,
        },
        {
          path: "/reserve",
          element: <Reserve />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/about/add",
          element: <AddAbout />,
        },
      ],
    },
  ]);

  const authRouter = createHashRouter([
    {
      path: "/",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={isAuth ? router : authRouter} />
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}

export default App;
