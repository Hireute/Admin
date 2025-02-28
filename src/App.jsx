import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ArtistPanel from "./component/ArtistPanel/ArtistPanel";
import Navbar from "./component/Auth/Navbar";
import SignIn from "./component/Auth/SignIn";
import Otp from "./component/Auth/Otp";
import ChangePassword from "./component/Auth/ChangePassword";
import ForgetPassword from "./component/Auth/ForgetPassword";
import ResetPassword from "./component/Auth/ResetPassword";
import ProtectedRoute from "./component/utils/ProtectedRoute";
import Dashboard from "./component/ArtistPanel/Dashboard/Dashboard";
import store from "./store/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { setup } from "./services/axios";

function App() {
  setup();
  const queryClient = new QueryClient();
  const isLoggedIn = false;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster position="top-right" />

        <Router>
          <Navbar />
          <Routes>
            {/* Public routes */}
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected routes */}

            <Route
              path="/*"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  component={ArtistPanel}
                />
              }
            />

            {/* <Route
          path="/*"
          element={
            <ArtistPanel/>
          }
        /> */}
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
