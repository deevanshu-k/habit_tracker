import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import VerifyOtpCard from "./verifyotpcard/verifyotpcard";
import SignUpCard from "./signupcard/signupcard";
import authService from "../../../api/auth.api";

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [verify, setVerifyOtp] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [signingUp, setSigningUp] = useState<boolean>(false);

    const signUpUser = (data: User) => {
        // Get data in parent
        setUser(data);
        // Signing
        setSigningUp(true);
        // Call register api
        authService
            .signup(data.first_name, data.last_name, data.email, data.password)
            .then(() => {
                setVerifyOtp(true);
                setSigningUp(false);
            })
            .catch((e) => {
                alert(e.response.data.message);
                setSigningUp(false);
            });
    };
    const resendOtp = async () => {
        if (!user) return setVerifyOtp(false);
        authService.signup(
            user.first_name,
            user.last_name,
            user.email,
            user.password
        );
    };

    return (
        <Flex
            direction="column"
            align={"center"}
            justify={"center"}
            className="py-16 min-h-screen"
        >
            <Box pb="7" mb="2">
                <Heading size={"8"} weight={"bold"} align={"center"}>
                    {verify
                        ? "🔐 Verify your email!"
                        : "Transform Your Life, One Habit at a Time 🌟"}
                </Heading>
                <Text
                    as="p"
                    size={"5"}
                    color="gray"
                    weight="medium"
                    align={"center"}
                    mt="2"
                >
                    {verify
                        ? "One Time Password (OTP) has been sent via Email"
                        : "Small Steps, Big Changes 🚀 Start Your Journey Today!"}
                </Text>
            </Box>
            {verify && user ? (
                <VerifyOtpCard
                    editSignForm={() => setVerifyOtp(false)}
                    email={user.email}
                    length={6}
                    reSendOtp={resendOtp}
                />
            ) : (
                <SignUpCard signUpUser={signUpUser} loading={signingUp} />
            )}
        </Flex>
    );
};

export default SignUp;
