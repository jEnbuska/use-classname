import {createContext} from "react";
import {IStyleContext} from "types";

export default createContext<IStyleContext | undefined>(undefined);