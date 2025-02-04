import { Avatar, DropdownMenu } from "@radix-ui/themes";
import React from "react";
import { useNavigate } from "react-router";

const ProfileDropDown: React.FC = () => {
    const navigate = useNavigate();

    const signOut = () => {
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
                <DropdownMenu.Item color="red" onClick={() => signOut()}>
                    Sign Out
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default ProfileDropDown;
