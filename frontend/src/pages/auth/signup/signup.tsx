import React, { useState } from "react";
import { useNavigate } from "react-router";
import authService from "../../../api/auth.api";
import SignUpCard from "./signupcard/signupcard";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import VerifyOtpCard from "./verifyotpcard/verifyotpcard";

export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigate = useNavigate();
    const [verify, setVerifyOtp] = useState<boolean>(false);
    const [signingUp, setSigningUp] = useState<boolean>(false);
    const [verifyingOtp, setVerifyingOtp] = useState<boolean>(false);
    const [reSendingOtp, setReSendingOtp] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>({
        email: "astroboiscosmos@gmail.com",
        first_name: "",
        last_name: "",
        password: "",
    });

    const signUpUser = (data: User) => {
        // Get data in parent
        setUser(data);
        // Signing
        setSigningUp(true);
        // Call register api
        authService
            .signup(data.first_name, data.last_name, data.email, data.password)
            .then((res) => {
                setVerifyOtp(true);
                alert(res.data.message);
                setSigningUp(false);
            })
            .catch((e) => {
                alert(e.response.data.message);
                setSigningUp(false);
            });
    };
    const verifyOtp = (email: string, otp: string) => {
        // Verifying
        setVerifyingOtp(true);
        // Call verifying api
        authService
            .signupVerifyOtp(email, otp)
            .then((res) => {
                setVerifyingOtp(false);
                alert(res.data.message);
                navigate("/signin");
            })
            .catch((e) => {
                alert(e.response.data.message);
                setVerifyingOtp(false);
            });
    };
    const resendOtp = () => {
        if (!user) return;
        // Resending
        setReSendingOtp(true);
        // Call resend api
        authService
            .signup(user.first_name, user.last_name, user.email, user.password)
            .then((res) => {
                setReSendingOtp(false);
                alert(res.data.message);
            })
            .catch((e) => {
                alert(e.response.data.message);
                setReSendingOtp(false);
            });
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
                    verify={verifyOtp}
                    loading={verifyingOtp}
                    reSendOtp={resendOtp}
                    resending={reSendingOtp}
                />
            ) : (
                <SignUpCard signUpUser={signUpUser} loading={signingUp} />
            )}
        </Flex>
    );
};

export default SignUp;
