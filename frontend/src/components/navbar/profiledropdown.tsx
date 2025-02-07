import { Avatar, DropdownMenu } from "@radix-ui/themes";
import React from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { useNavigate } from "react-router";
import {
    LogoutUserAction,
    logoutUserAction,
} from "../../store/user/user.action";

const ProfileDropDown: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<Dispatch<LogoutUserAction>>();

    const signOut = () => {
        dispatch(logoutUserAction());
        navigate("/signin");
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <div>
                    <Avatar
                        radius="full"
                        fallback="A"
                        size={"2"}
                        className="cursor-pointer"
                    >
                        <DropdownMenu.TriggerIcon />
                    </Avatar>
                </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content size="2">
                <DropdownMenu.Item>Setting</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => navigate("/today")}>
                    Todays todo
                </DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => navigate("/habits")}>
                    Habits
                </DropdownMenu.Item>
                <DropdownMenu.Item>Setting</DropdownMenu.Item>
                <DropdownMenu.Item color="red" onClick={() => signOut()}>
                    Sign Out
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default ProfileDropDown;
