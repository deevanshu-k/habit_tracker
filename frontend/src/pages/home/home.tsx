import { Flex } from "@radix-ui/themes";
import React from "react";

const Home: React.FC = () => {
    return (
        <Flex
            direction="column"
            align={"center"}
            justify={"center"}
            className="py-16 min-h-screen"
        >
            Home Page
        </Flex>
    );
};

export default Home;
