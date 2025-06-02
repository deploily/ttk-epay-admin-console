import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const usePayement = () => useSelector((state: RootState) => state.payement);
