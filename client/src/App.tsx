import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Layout from "./components/app/Layout";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import OnboardingPage from "./pages/OnboardingPage";
import MySessionsPage from "./pages/MySessionsPage";
import FocusSessionPage from "./pages/FocusSessionPage";
import LogDistractionPage from "./pages/LogDistractionPage";
import AIIntelligencePage from "./pages/AIIntelligencePage";
import StreaksRewardsPage from "./pages/StreaksRewardsPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DistractionPage from "./pages/DistractionsPage";
import { useFetchUserInfo } from "./hooks/useFetchUserInfo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="focus-session" element={<FocusSessionPage />} />
        <Route path="log-distraction" element={<LogDistractionPage />} />
        <Route path="distraction" element={<DistractionPage />} />
        <Route path="insights" element={<AIIntelligencePage />} />
        <Route path="rewards" element={<StreaksRewardsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="sessions" element={<MySessionsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
    </>
  )
);

function App() {
  useFetchUserInfo();

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
