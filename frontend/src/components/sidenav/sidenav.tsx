import { Box, Flex, Link, Text } from "@radix-ui/themes";
import React from "react";
import { useNavigate } from "react-router";

const SideNav: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box className="border-r-2 border-[var(--gray-6)] h-full">
            <Flex direction="column" gap="4" className="p-4">
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
        </Box>
    );
};

export default SideNav;
