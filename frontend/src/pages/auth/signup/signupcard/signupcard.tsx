import {
    Box,
    Button,
    Card,
    Separator,
    Spinner,
    Text,
    TextField,
} from "@radix-ui/themes";
import React from "react";
import GoogleIcon from "../../../../components/custom-icons/googleicon";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../signup";

type Inputs = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

const SignUpCard: React.FC<{
    signUpUser: (user: User) => void;
    loading: boolean;
}> = ({ signUpUser, loading }) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        signUpUser(data);
    };

    return (
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
                            Sign up with Google
                        </Text>
                    </div>
                </Button>
                <Box my={"4"} className="flex align-middle justify-evenly">
                    <Separator mt={"3"} size={"3"} />
                    <Text as="p" align={"center"} className="opacity-40">
                        Or, register with your email
                    </Text>
                    <Separator mt={"3"} size={"3"} />
                </Box>
                <Box mb="4">
                    <Text as="p" size={"3"} mb="1" className="opacity-70">
                        First name <Text className="text-red-500">*</Text>
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="none"
                        placeholder="Your first name"
                        size="3"
                        {...register("first_name", {
                            required: "First name is required",
                            disabled: loading,
                        })}
                    />
                    {errors.first_name && (
                        <Text
                            as="p"
                            size={"2"}
                            mt="1"
                            className="text-red-500 opacity-70"
                        >
                            {errors.first_name.message}
                        </Text>
                    )}
                </Box>
                <Box mb="4">
                    <Text as="p" size={"3"} mb="1" className="opacity-70">
                        Last name <Text className="text-red-500">*</Text>
                    </Text>
                    <TextField.Root
                        type="text"
                        radius="none"
                        placeholder="Your last name"
                        size="3"
                        {...register("last_name", {
                            required: "Last name is required",
                            disabled: loading,
                        })}
                    />
                    {errors.last_name && (
                        <Text
                            as="p"
                            size={"2"}
                            mt="1"
                            className="text-red-500 opacity-70"
                        >
                            {errors.last_name.message}
                        </Text>
                    )}
                </Box>
                <Box mb="4">
                    <Text as="p" size={"3"} mb="1" className="opacity-70">
                        Email <Text className="text-red-500">*</Text>
                    </Text>
                    <TextField.Root
                        type="email"
                        radius="none"
                        placeholder="abc@example.com"
                        size="3"
                        {...register("email", {
                            required: "Email is required",
                            disabled: loading,
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
                    <Text as="p" size={"3"} mb="1" className="opacity-70">
                        Password <Text className="text-red-500">*</Text>
                    </Text>
                    <TextField.Root
                        type="password"
                        radius="none"
                        placeholder="Your password"
                        size="3"
                        {...register("password", {
                            required: "Password is required",
                            disabled: loading,
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
                <Button
                    disabled={loading}
                    radius="none"
                    className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
                    size="3"
                    mt="5"
                    type="submit"
                >
                    {loading ? <Spinner /> : "Sign up"}
                </Button>
                <Box mt="5" className="flex align-middle justify-center">
                    <Text as="span" align="center" className="opacity-40">
                        Already have an account?
                    </Text>
                    <Text
                        ml="1"
                        color="grass"
                        onClick={() => navigate("/signin")}
                        className="hover:underline cursor-pointer"
                    >
                        Sign in
                    </Text>
                </Box>
            </Card>
        </form>
    );
};

export default SignUpCard;
