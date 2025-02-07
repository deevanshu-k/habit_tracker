import { Flex, Separator, Text } from "@radix-ui/themes";
import React from "react";

const SeperatorWithMiddleText: React.FC<{ txt: string }> = ({ txt }) => {
    return (
        <Flex direction="row" align="center">
            <Separator className="flex-grow" />
            <Text className="mx-3" color="gray">
                {txt}
            </Text>
            <Separator className="flex-grow" />
        </Flex>
    );
};

export default SeperatorWithMiddleText;
