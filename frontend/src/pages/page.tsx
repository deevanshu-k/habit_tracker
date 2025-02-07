import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { UnknownAction } from "redux";
import { fetchUserAction } from "../store/user/user.action";
import { Flex } from "@radix-ui/themes";
import { StoreState } from "../store/store.type";
import SideNav from "../components/sidenav/sidenav";
function Page() {
    const dispatch = useDispatch();
    const user = useSelector((state: StoreState) => state.user.data);

    useEffect(() => {
        dispatch(fetchUserAction() as UnknownAction);
    }, []);

    return (
        <>
            {user ? (
                <Flex direction="row">
                    <aside className="w-[180px]">
                        <SideNav />
                    </aside>
                    <div className="flex-grow min-h-svh pb-20 px-4 pt-4">
                        <Outlet />
                    </div>
                </Flex>
            ) : (
                <Outlet />
            )}
        </>
    );
}

export default Page;
