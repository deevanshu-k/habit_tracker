import { Spinner } from "@radix-ui/themes";
import React from "react";

const LoadingScreen: React.FC = () => {
    return (
        <div className="fixed flex justify-center items-center w-[100vw] h-[100vh] z-50 top-0 bg-gray-800 bg-opacity-50">
            <Spinner size={"3"} />
        </div>
    );
};

export default LoadingScreen;
