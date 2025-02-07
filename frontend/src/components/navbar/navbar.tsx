import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading, Link } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { StoreState } from "../../store/store.type";
import ProfileDropDown from "./profiledropdown";

type PropType = {
    mod: "light" | "dark";
    toggleTheme: () => void;
};

const NavBar: React.FC<PropType> = ({ mod, toggleTheme }) => {
    const navigate = useNavigate();
    const user = useSelector((state: StoreState) => state.user.data);

    return (
        <nav
            className="p-3"
            style={{ borderBottom: "2px solid var(--gray-5)" }}
        >
            <Flex direction={"row"} justify={"between"}>
                {user ? (
                    <Box>
                        <Heading
                            className="cursor-pointer text-[var(--accent-10)]"
                            onClick={() => navigate("/")}
                            children="Habit Tracker"
                        />
                    </Box>
                ) : (
                    ""
                )}
                {/* {user ? (
                    <Flex direction={"row"} align={"center"} gap={"9"}>
                        <Link
                            onClick={() => navigate("/dashboard")}
                            className="hover:underline cursor-pointer"
                        >
                            Dashboard
                        </Link>
                        <Link
                            onClick={() => navigate("/today")}
                            className="hover:underline cursor-pointer"
                        >
                            Todays TODO
                        </Link>
                        <Link
                            onClick={() => navigate("/habits")}
                            className="hover:underline cursor-pointer"
                        >
                            Habits
                        </Link>
                    </Flex>
                ) : (
                    ""
                )} */}
                <Flex direction={"row"} align={"center"} gap={"2"}>
                    <Button
                        className="cursor-pointer"
                        variant="soft"
                        onClick={toggleTheme}
                    >
                        {mod == "dark" ? <SunIcon /> : <MoonIcon />}
                    </Button>
                    {user ? (
                        <ProfileDropDown />
                    ) : (
                        <>
                            <Button
                                className="cursor-pointer"
                                variant="outline"
                                onClick={() => navigate("/signin")}
                            >
                                Sign in
                            </Button>
                            <Button
                                className="cursor-pointer"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </Button>
                        </>
                    )}
                </Flex>
            </Flex>
        </nav>
    );
};

export default NavBar;
