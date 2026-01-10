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

function App() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<p>about</p>} />
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
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
