import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useRegistration = () => useSelector((state: RootState) => state.registration);