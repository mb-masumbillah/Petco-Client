import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/LogIn/Login";
import Signup from "../Pages/Signup/Signup";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../Pages/AdminDashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import PetListing from "../Pages/PetListing/PetListing";
import PetListingDetails from "../Pages/PetListing/PetListingDetails";
import AddAPet from "../Pages/UserDashboard/AddAPet";
import MyAddedPets from "../Pages/UserDashboard/MyAddedPets";
import PetUpdate from "../Pages/UserDashboard/PetUpdate";
import CreateDonationCampaign from "../Pages/UserDashboard/CreateDonationCampaign";
import MyDonationCampings from "../Pages/UserDashboard/MyDonationCampings";
import DonationCampaign from "../Pages/DonationCampaign/DonationCampaign";
import DonationCampaignDetails from "../Pages/DonationCampaign/DonationCampaignDetails";
import DonationUpdate from "../Pages/UserDashboard/DonationUpdate";
import MyDonations from "../Pages/UserDashboard/MyDonations";
import AdoptionRequest from "../Pages/UserDashboard/AdoptionRequest";
import AllPets from "../Pages/AdminDashboard/AllPets";
import AllDonation from "../Pages/AdminDashboard/AllDonation";
import AdminRoute from "./AdminRoute";
import ContactUs from "../Pages/ContactUs/ContactUs";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "petListing",
        element: <PetListing></PetListing>,
      },
      {
        path: "/petListing/:id",
        element: (
          <PrivateRoute>
            <PetListingDetails></PetListingDetails>
          </PrivateRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`https://b9a12-assignment-server-site.vercel.app/petListing/${params.id}`),
      },
      {
        path: "donationCampaign",
        element: <DonationCampaign></DonationCampaign>,
      },
      {
        path: "/petDonation/:id",
        element: <DonationCampaignDetails></DonationCampaignDetails>,
        // loader: ({ params }) =>
        //   fetch(`https://b9a12-assignment-server-site.vercel.app/petDonation/${params.id}`),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "contact",
        element: <ContactUs></ContactUs>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "addpet",
        element: <AddAPet></AddAPet>,
      },
      {
        path: "addpet",
        element: <AddAPet></AddAPet>,
      },
      {
        path: "myaddedpets",
        element: <MyAddedPets></MyAddedPets>,
      },
      {
        path: "/dashboard/petUpdate/:id",
        element: <PetUpdate></PetUpdate>,
        loader: ({ params }) =>
          fetch(`https://b9a12-assignment-server-site.vercel.app/petListing/${params.id}`),
      },
      {
        path: "/dashboard/createDonation",
        element: <CreateDonationCampaign></CreateDonationCampaign>,
      },
      {
        path: "/dashboard/myDonationCampign",
        element: <MyDonationCampings></MyDonationCampings>,
      },
      {
        path: "/dashboard/donationEdit/:id",
        element: <DonationUpdate></DonationUpdate>,
        loader: ({ params }) =>
          fetch(`https://b9a12-assignment-server-site.vercel.app/petDonation/${params.id}`),
      },
      {
        path: "/dashboard/myDonation",
        element: <MyDonations></MyDonations>,
      },
      {
        path: "/dashboard/adoptionRequest",
        element: <AdoptionRequest></AdoptionRequest>,
      },

      // Admin related
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "allPets",
        element: (
          <AdminRoute>
            <AllPets></AllPets>
          </AdminRoute>
        ),
      },
      {
        path: "allDonation",
        element: (
          <AdminRoute>
            <AllDonation></AllDonation>
          </AdminRoute>
        ),
      },
    ],
  },
]);
