import React, { useState } from "react";

const TodoBodyInput: React.FC = ({}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <input
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="px-4 w-full h-[50px]"
            style={{
                borderWidth: "1px",
                borderColor: isFocused ? "transparent" : "var(--gray-7)",
                outlineWidth: "2px",
                outlineStyle: "solid",
                outlineColor: isFocused ? "var(--accent-7)" : "transparent",
            }}
            placeholder="Enter todo here"
        />
    );
};

export default TodoBodyInput;
