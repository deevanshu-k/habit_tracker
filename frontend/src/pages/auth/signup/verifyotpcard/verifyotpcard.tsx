import { Box, Button, Card, Flex, Text, TextField } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const VerifyOtpCard: React.FC<{ length: number; editSignForm: () => void }> = ({
    length = 6,
    editSignForm,
}) => {
    const [timeLeft, setTimeLeft] = useState(120);

    // Countdown timer
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer); // Cleanup timer on unmount
        }
    }, [timeLeft]);

    // Format the time left as MM:SS
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
            2,
            "0"
        )}`;
    };

    return (
        <Card className="min-w-[420px] p-9">
            <Box mb="4">
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    Email
                </Text>
                <TextField.Root
                    type="text"
                    disabled
                    radius="none"
                    placeholder="Your first name"
                    className="tracking-wider"
                    size="3"
                    value={"abc@example.com"}
                />
            </Box>
            <Box>
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    OTP <Text className="text-red-500">*</Text>
                </Text>
                <TextField.Root
                    size="3"
                    radius="none"
                    type="password"
                    minLength={length}
                    maxLength={length}
                    placeholder={(() => "X".repeat(length))()}
                    className="tracking-widest"
                />
            </Box>
            <Flex justify={"end"} py="1" mb="2">
                {timeLeft == 0 ? (
                    <Text
                        size="2"
                        color="grass"
                        onClick={() => setTimeLeft(120)}
                        className="underline cursor-pointer"
                    >
                        Resend OTP
                    </Text>
                ) : (
                    <>
                        <Text size="2" className="opacity-50">
                            Resend OTP in{" "}
                        </Text>
                        <Text size="2" color="grass" ml="1">
                            {formatTime(timeLeft)}
                        </Text>
                    </>
                )}
            </Flex>
            <Button
                radius="none"
                className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
                size="3"
            >
                Verify OTP
            </Button>
            <Box mt="5" className="flex align-middle justify-center">
                <Text as="span" align="center" className="opacity-40">
                    Entered wrong email?
                </Text>
                <Text
                    ml="1"
                    color="grass"
                    onClick={editSignForm}
                    className="hover:underline cursor-pointer"
                >
                    Change Email
                </Text>
            </Box>
        </Card>
    );
};

export default VerifyOtpCard;
