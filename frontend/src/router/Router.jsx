import { createBrowserRouter } from "react-router-dom";
import Root from "../components/Root";

// root page start
import UserPrivateRoute from "../components/UserPrivateRoute";
import PublicRoute from "../components/PublickRoute";
// close root page

// admin page start
import AdminDashboard from "../page/admin/AdminDashboard";
import AdminLayout from "../page/admin/AdminLayout";
import Products from "../page/admin/Products";
import Users from "../page/admin/Users";
import Order from "../page/admin/Order";
import Setting from "../page/admin/Setting";
import ProductCreate from "../page/admin/ProductCreate";
import AdminPrivateRoute from "../components/AdminPrivateRoute";
import AdminProfile from "../page/admin/AdminProfile";
import AdminBannerDashboard from "../page/admin/AdminBanner";
// close admin page

// user page start
import NotFound from "../page/user/NotFound";
import Home from "../page/user/Home";
import Shop from "../page/user/Shop";
import Register from "../page/user/Register";
import Login from "../page/user/Login";
import Verify from "../page/user/Verify";
import RegisterSuccess from "../page/user/RegisterSuccess";
import Dashboard from "../page/user/Dashboard";
import SingleProduct from "../page/user/SingleProduct";
import Wishlist from "../page/user/Wishlist";
import Cart from "../page/user/Cart";
import Checkout from "../page/user/Checkout";
import ForgotPassword from "../page/user/ForgotPassword";
import AboutUs from "../page/user/AboutUs";
import ContactUs from "../page/user/ContactUs";
import PrivacyPolicy from "../page/user/PrivacyPolicy";
import ReturnPolicy from "../page/user/ReturnPolicy";
import CategoryPage from "../page/user/CategoryPage";
import OAuthSuccess from "../page/user/OAuthSuccess";
import Terms from "../page/user/Trams";
import CustomerChatbot from "../components/CustomerChatbot";
import AdminProductGenerator from "../page/admin/AdminProductGenerator";
import SSLPaymentPage from "../page/user/SSLPaymentPage";
import OrderSuccess from "../page/user/OrderSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/oauth-success",
        element: <OAuthSuccess />,
      },
      {
        path: "/shop/category/:category/:slug",
        element: <SingleProduct />,
      },
      {
        path: "/register-success",
        element: <RegisterSuccess />,
      },
      {
        path: "/auth/verification/:token",
        element: <Verify />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },

      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/chat",
        element: <CustomerChatbot />,
      },
      {
        path: "/ssl",
        element: <SSLPaymentPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccess />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/returns",
        element: <ReturnPolicy />,
      },
      {
        path: "/shop/category/:categoryName",
        element: <CategoryPage />,
      },
    ],
  },

  /// user private routes
  {
    element: <UserPrivateRoute />,
    children: [
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },

  // public routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
    ],
  },

  {
    element: <AdminPrivateRoute />,
    children: [
      {
        path: "/admin-dashboard",
        element: <AdminLayout />, // এই লেআউটের ভেতরেই সব চাইল্ড পেজ লোড হবে
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "product-create",
            element: <ProductCreate />,
          },

          {
            path: "genared-product",
            element: <AdminProductGenerator />,
          },
          {
            path: "orders",
            element: <Order />,
          },
          {
            path: "settings",
            element: <Setting />,
          },
          {
            path: "profile",
            element: <AdminProfile />,
          },
          {
            path: "banner",
            element: <AdminBannerDashboard />,
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
