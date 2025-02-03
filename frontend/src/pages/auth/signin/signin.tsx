import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Separator,
    Text,
    TextField,
} from "@radix-ui/themes";
import React from "react";
import GoogleIcon from "../../../components/custom-icons/googleicon";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signin, SigninAction } from "../../../store/auth/auth.action";
import { Dispatch } from "redux";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    email: string;
    password: string;
};

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<Dispatch<SigninAction>>();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(signin(data.email, data.password));
    };

    return (
        <Flex
            direction="column"
            align={"center"}
            justify={"center"}
            className="py-16 min-h-screen"
        >
            <Box py="7" mb="6">
                <Heading size={"8"} weight={"bold"} align={"center"}>
                    Welcome back 👋
                </Heading>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="min-w-[420px] p-9">
                    <Button
                        variant="soft"
                        radius="none"
                        className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
                    >
                        <div className="w-[18px]">
                            <GoogleIcon size={48} />
                        </div>
                        <Separator orientation="vertical" ml={"2"} size={"2"} />
                        <div className="flex-1">
                            <Text size={"3"} className="tracking-widest">
                                Sign in with Google
                            </Text>
                        </div>
                    </Button>
                    <Box my={"4"} className="flex align-middle justify-evenly">
                        <Separator mt={"3"} size={"3"} />
                        <Text as="p" align={"center"} className="opacity-40">
                            Or, sign in with your email
                        </Text>
                        <Separator mt={"3"} size={"3"} />
                    </Box>
                    <Box mb="4">
                        <Text
                            as="label"
                            htmlFor="email"
                            size={"3"}
                            mb="1"
                            className="opacity-70"
                        >
                            Email <Text className="text-red-500">*</Text>
                        </Text>
                        <TextField.Root
                            type="email"
                            radius="none"
                            placeholder="abc@example.com"
                            size="3"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <Text
                                as="p"
                                size={"2"}
                                mt="1"
                                className="text-red-500 opacity-70"
                            >
                                {errors.email.message}
                            </Text>
                        )}
                    </Box>
                    <Box mb="4">
                        <Text
                            as="label"
                            htmlFor="password"
                            size={"3"}
                            mb="1"
                            className="opacity-70"
                        >
                            Password <Text className="text-red-500">*</Text>
                        </Text>
                        <TextField.Root
                            type="password"
                            radius="none"
                            placeholder="Your password"
                            size="3"
                            className={errors.password ? "border-red-500" : ""}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 10,
                                    message:
                                        "Password must be at least 10 characters long",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#^+=_]).+$/,
                                    message:
                                        "1 letter, 1 number, and 1 special character is required",
                                },
                            })}
                        />
                        {errors.password && (
                            <Text
                                as="p"
                                size={"2"}
                                mt="1"
                                wrap={"wrap"}
                                className="text-red-500 opacity-70"
                            >
                                {errors.password.message}
                            </Text>
                        )}
                    </Box>
                    <Box>
                        <Text
                            ml="1"
                            color="grass"
                            className="hover:underline cursor-pointer"
                            onClick={() => navigate("/reset-password")}
                        >
                            Forgot Password?
                        </Text>
                    </Box>
                    <Button
                        radius="none"
                        className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
                        size="3"
                        mt="5"
                        type="submit"
                    >
                        Sign in
                    </Button>
                    <Box mt="5" className="flex align-middle justify-center">
                        <Text as="span" align="center" className="opacity-40">
                            Don't have an account?
                        </Text>
                        <Text
                            ml="1"
                            color="grass"
                            onClick={() => navigate("/signup")}
                            className="hover:underline cursor-pointer"
                        >
                            Sign up
                        </Text>
                    </Box>
                </Card>
            </form>
        </Flex>
    );
};

export default SignIn;
