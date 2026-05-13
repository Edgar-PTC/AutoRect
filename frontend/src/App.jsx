import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Nav from "./components/Nav";

import Home from "./pages/Home";
import LogIn from "./pages/LogIn";

const ConLayout = () => (
  <div className="flex flex-row">
    <Nav />
    <Outlet />
  </div>
);

const SinNav = () => (
  <Outlet />
);

function App() {
  return(
    <Router>
      <AuthProvider>
        <Routes>

          <Route element={<ConLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>

          <Route element={<SinNav />}>
            <Route path="/" element={<LogIn />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;