import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main";
import Home from "./pages/home";
import SecondaryLayout from "./layouts/secondary";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import BuildResume from "./pages/build";
import Resume from "./pages/resume";
import NotFound from "./pages/notFound";
import LightRaysLayout from "./layouts/lightRays";
import Profile from "./pages/profile";
import GoogleCallback from "./pages/auth/google";
import { useUser } from "./lib/store/userState";
import Plans from "./pages/plans";
import PlanDetails from "./pages/detailedPlan";
import Admin from "./pages/admin";
import AdminLayout from "./layouts/admin";
import UpdatePlan from "./pages/admin/child-pages/updatePlan";
import Checkout from "./pages/checkout";
import Cancel from "./pages/cancel";
import AdminPlans from "./pages/admin/child-pages/plans";
import AiChat from "./pages/ai-chat";

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<SecondaryLayout />}>
          <Route
            path="/build"
            element={user ? <BuildResume /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />

          <Route
            path="/google/callback"
            element={user ? <Navigate to="/profile" /> : <GoogleCallback />}
          />
        </Route>

        <Route element={<LightRaysLayout />}>
          <Route
            path="/resume/:id"
            element={user ? <Resume /> : <Navigate to="/login" />}
          />
          <Route
            path="/resume/:id/chat"
            element={user ? <AiChat /> : <Navigate to="/login" />}
          />
          <Route path="/plans" element={<Plans />} />
          <Route
            path="/plans/:id"
            element={user ? <PlanDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="/checkout"
            element={user ? <Checkout /> : <Navigate to="/login" />}
          />

          <Route
            path="/cancel"
            element={user ? <Cancel /> : <Navigate to="/login" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={user?.role === "admin" ? <Admin /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/plans"
            element={
              user?.role === "admin" ? <AdminPlans /> : <Navigate to="/" />
            }
          />
          <Route
            path="/admin/plan/:name"
            element={
              user?.role === "admin" ? <UpdatePlan /> : <Navigate to="/" />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function NotFoundPage() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <NotFound />
    </div>
  );
}

export default App;
