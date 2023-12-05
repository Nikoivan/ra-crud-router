import { createContext } from "react";

export type ContextProps = {
  currentId: number;
  setId(arg: number): void;
  baseUrl: string;
};

const Context = createContext<ContextProps>({});

export default Context;
