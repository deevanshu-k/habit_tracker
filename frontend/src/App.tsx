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
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/protectedroute/protectedroute";
import UnProtectedRoute from "./components/unprotectedroute/unprotectedroute";
import LoadingScreen from "./components/loading-screen/loadingscreen";
import { StoreState } from "./store/store.type";
import Habit from "./pages/habit/habit";
import Todo from "./pages/todo/todo";

const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

function App() {
    const [MOD, setThemeMod] = useState<"light" | "dark">(getSystemTheme());
    const globalLoading: number = useSelector(
        (store: StoreState) => store.global.loading
    );

    const toggleTheme = () => {
        if (MOD == "dark") setThemeMod("light");
        else setThemeMod("dark");
    };
    return (
        <Theme
            accentColor="grass"
            grayColor="sage"
            scaling="90%"
            appearance={MOD}
        >
            {globalLoading > 0 && <LoadingScreen />}
            <NavBar mod={MOD} toggleTheme={toggleTheme} />
            <Routes>
                <Route element={<Page />}>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/today" element={<Todo />} />
                        <Route path="/habits" element={<Habit />} />
                    </Route>
                    <Route element={<UnProtectedRoute />}>
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route
                            path="/reset-password"
                            element={<ForgotPassword />}
                        />
                    </Route>
                </Route>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
            <Footer />
        </Theme>
    );
}

export default App;
