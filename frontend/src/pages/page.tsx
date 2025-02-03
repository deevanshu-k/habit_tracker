import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { fetchUserDetail } from "../store/auth/auth.action";
import { UnknownAction } from "redux";
function Page() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserDetail() as UnknownAction);
    }, []);

    return (
        <div>
            <Outlet />
        </div>
    );
}

export default Page;
