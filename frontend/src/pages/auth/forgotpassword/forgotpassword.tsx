import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import ResetPasswordForm from "./resetpasswordform/resetpasswordform";
import EnterEmailForm from "./enteremailform/enteremailform";

const ForgotPassword: React.FC = () => {
    const [oobcode, setOobCode] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        // Get query parameters from the URL using window.location.search
        const queryParams = new URLSearchParams(window.location.search);
        setOobCode(queryParams.get("oobcode"));
        setEmail(queryParams.get("email"));
    }, []);

    return (
        <Flex
            direction="column"
            align={"center"}
            justify={"center"}
            className="py-16 min-h-screen"
        >
            <Box pb="7" mb="2">
                <Heading size={"9"} weight={"bold"} align={"center"}>
                    {oobcode && email
                        ? "Reset your password"
                        : "Forgot your password?"}
                </Heading>
                <Text
                    as="div"
                    mt="4"
                    size={"6"}
                    color="gray"
                    weight="medium"
                    align={"center"}
                >
                    {oobcode && email
                        ? `for ${email}`
                        : "We'll email you a link to reset it"}
                </Text>
            </Box>
            {oobcode && email ? <ResetPasswordForm /> : <EnterEmailForm />}
        </Flex>
    );
};

export default ForgotPassword;
