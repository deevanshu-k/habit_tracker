import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import { useNavigate } from "react-router";

type PropType = {
    mod: "light" | "dark";
    toggleTheme: () => void;
};

const NavBar: React.FC<PropType> = ({ mod, toggleTheme }) => {
    const navigate = useNavigate();

    return (
        <nav
            className="p-3"
            style={{ borderBottom: "2px solid var(--gray-5)" }}
        >
            <Flex direction={"row"} justify={"between"}>
                <Box>
                    <Heading
                        className="cursor-pointer"
                        onClick={() => navigate("/")}
                        children="Habit Tracker"
                        color="grass"
                    />
                </Box>
                <Flex direction={"row"} align={"center"} gap={"2"}>
                    <Button
                        className="cursor-pointer"
                        variant="soft"
                        onClick={toggleTheme}
                    >
                        {mod == "dark" ? <SunIcon /> : <MoonIcon />}
                    </Button>
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
                </Flex>
            </Flex>
        </nav>
    );
};

export default NavBar;
