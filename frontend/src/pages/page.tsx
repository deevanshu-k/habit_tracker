import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { UnknownAction } from "redux";
import { fetchUserAction } from "../store/user/user.action";
function Page() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserAction() as UnknownAction);
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Page;
