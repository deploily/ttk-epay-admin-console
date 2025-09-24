import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useClaim = () => useSelector((state: RootState) => state.claim);
