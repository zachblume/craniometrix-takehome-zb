import React, { FC } from "react";

interface ButtonProps {
    label: string;
    onClick: () => MouseEvent | undefined | void;
}

const Button: FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button type="button" onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;
