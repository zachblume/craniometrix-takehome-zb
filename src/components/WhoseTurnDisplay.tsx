import { useContext, Fragment } from "react";
import { BoardContext, WhoseTurnContext } from "../App";
const WhoseTurnDisplay = () => {
    const Board = useContext(BoardContext);
    const whoseTurn = useContext(WhoseTurnContext);
    return (
        <h2 className="WhoseTurnDisplay">
            It's
            {Object.keys(Board).map((p) => (
                <Fragment key={p}>
                    <span className={"player " + (p == whoseTurn ? p : "")}>{p}'s</span>{" "}
                </Fragment>
            ))}{" "}
            turn now!
        </h2>
    );
};
export default WhoseTurnDisplay;
