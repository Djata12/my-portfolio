import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./components/ProtectedRoute";
import Saved from "./pages/Saved";
import Hashtag from "./pages/Hashtag";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Jobs from "./pages/Jobs";
import SavedJobs from "./pages/SavedJobs";
import MyApplications from "./pages/MyApplications";
import RecruiterApplications from "./pages/RecruiterApplications";

import Home from "./pages/Home";

import InventoryFlow from "./projects/InventoryFlow";
import MoMoBridge from "./projects/MoMoBridge";
import GhanaTechHub from "./projects/GhanaTechHub";

import KwameAsante from "./developers/KwameAsante";
import NaaDedeiLamptey from "./developers/NaaDedeiLamptey";
import RichardOwusu from "./developers/RichardOwusu";
import EnyonamAgbeko from "./developers/EnyonamAgbeko";
import DanielNortey from "./developers/DanielNortey";
import EsiHammond from "./developers/EsiHammond";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        

        <Route
          path="/"
          element={<Home />}
        />

        <Route 
          path="/register" 
          element={<Register />} 
        />
        
        <Route 
          path="/login" 
          element={<Login />} 
        />
        
        <Route
          path="/verify-email/:token"
          element={<VerifyEmail />}
        />
        
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/profile/:username" 
          element={<Profile />} 
        />
        
        
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              <SavedJobs />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/my-applications"
          element={
              <ProtectedRoute>
                  <MyApplications />
              </ProtectedRoute>
          }
      />
      
      <Route
          path="/recruiter/applications"
          element={
              <ProtectedRoute>
                  <RecruiterApplications />
              </ProtectedRoute>
          }
      />
        
        <Route
        path="/hashtag/:tag"
        element={
          <ProtectedRoute>
            <Hashtag />
          </ProtectedRoute>
        }
      />

        <Route
          path="/projects/inventoryflow"
          element={<InventoryFlow />}
        />

        <Route
          path="/projects/momobridge"
          element={<MoMoBridge />}
        />

        <Route
          path="/projects/ghanatechhub"
          element={<GhanaTechHub />}
        />
        
        <Route
          path="/developers/kwame-asante"
          element={<KwameAsante />}
        />
        
        <Route
          path="/developers/naa-dedei-lamptey"
          element={<NaaDedeiLamptey />}
        />
        
        <Route
          path="/developers/richard-owusu"
          element={<RichardOwusu />}
        />
        
        <Route
          path="/developers/enyonam-agbeko"
          element={<EnyonamAgbeko />}
        />
        
        <Route
          path="/developers/daniel-nortey"
          element={<DanielNortey />}
        />
        
        <Route
          path="/developers/esi-hammond"
          element={<EsiHammond />}
        />

      </Routes>
      
      <ThemeToggle />
      
    </BrowserRouter>
  );
}