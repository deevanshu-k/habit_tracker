import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import React from "react";

const TodoHeader: React.FC = ({}) => {
    return (
        <Box className="p-5">
            <Flex direction="row" justify="between">
                <Heading weight="light">Todays Todo</Heading>
                <Text size="6">3 / 8</Text>
            </Flex>
            <Separator className="w-full mt-4" />
        </Box>
    );
};

export default TodoHeader;
