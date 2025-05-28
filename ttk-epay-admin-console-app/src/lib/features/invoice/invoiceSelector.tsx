import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const useInvoice = () => useSelector((state: RootState) => state.invoice);
