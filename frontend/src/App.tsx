import { Theme } from "@radix-ui/themes";
import "./App.css";
import { useState } from "react";
import Footer from "./components/footer/footer";
import NavBar from "./components/navbar/navbar";
import { Route, Routes } from "react-router";
import Page from "./pages/page";
import SignIn from "./pages/auth/signin/signin";
import SignUp from "./pages/auth/signup/signup";
import ForgotPassword from "./pages/auth/forgotpassword/forgotpassword";
import Home from "./pages/home/home";
import { Provider } from "react-redux";
import store from "./store/store";
import ProtectedRoute from "./components/protectedroute/protectedroute";
import UnProtectedRoute from "./components/unprotectedroute/unprotectedroute";

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

function App() {
    const [MOD, setThemeMod] = useState<"light" | "dark">(getSystemTheme());
    const toggleTheme = () => {
        if (MOD == "dark") setThemeMod("light");
        else setThemeMod("dark");
    };
    return (
        <Provider store={store}>
            <Theme
                accentColor="grass"
                grayColor="sage"
                scaling="90%"
                appearance={MOD}
            >
                <NavBar mod={MOD} toggleTheme={toggleTheme} />
                <Routes>
                    <Route element={<Page />}>
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="/dashboard"
                                element={<h1>Dashboard</h1>}
                            />
                            <Route
                                path="/today"
                                element={<h1>Todays TODO</h1>}
                            />
                            <Route path="/habits" element={<h1>Habits</h1>} />
                        </Route>
                        <Route element={<UnProtectedRoute />}>
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route
                                path="/reset-password"
                                element={<ForgotPassword />}
                            />
                        </Route>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
                <Footer />
            </Theme>
        </Provider>
    );
}

export default App;
