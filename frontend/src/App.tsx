import { Theme } from "@radix-ui/themes";
import "./App.css";
import { useState } from "react";
import Footer from "./components/footer/footer";
import NavBar from "./components/navbar/navbar";
import { Route, Routes } from "react-router";
import Page from "./pages/page";
import SignUp from "./pages/auth/signup/signup";

function App() {
    const [MOD, setThemeMod] = useState<"light" | "dark">("dark");
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
            <NavBar mod={MOD} toggleTheme={toggleTheme} />
            <Routes>
                <Route element={<Page />}>
                    <Route path="/" element={<h1>Home</h1>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<h1>Sign In</h1>} />
                    <Route path="/dashboard" element={<h1>Dashboard</h1>} />
                </Route>
            </Routes>
            <Footer />
        </Theme>
    );
}

export default App;