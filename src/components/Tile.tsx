import React, { FC } from "react";

interface TileProps {
    state: string;
}

const Tile: FC<TileProps> = ({ state }) => {
    return <>{state}</>;
};

export default Tile;
