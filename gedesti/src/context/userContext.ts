import { createContext } from 'react';

type MyContextType = {
  worker: {
    id: string,
    office: string,
    name: string,
    email: string,
  },
  setWorker: any
};

const UserContext = createContext<MyContextType>({} as MyContextType);

export default UserContext;