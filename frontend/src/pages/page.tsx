import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router";
import { Flex } from "@radix-ui/themes";
import { StoreState } from "../store/store.type";
import SideNav from "../components/sidenav/sidenav";
import { Dispatch } from "redux";
import { fetchUserAction, FetchUserAction } from "../store/user/user.action";
import { useEffect } from "react";
function Page() {
    const dispatch = useDispatch<Dispatch<FetchUserAction>>();
    const user = useSelector((state: StoreState) => state.user.data);

    useEffect(() => {
        dispatch(fetchUserAction());
    }, []);

    return (
        <>
            {user ? (
                <Flex direction="row">
                    <aside className="hidden md:block w-[180px]">
                        <SideNav />
                    </aside>
                    <div className="min-h-svh w-full md:w-[calc(100%-180px)] pb-20 pt-4">
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
