import { createContext } from 'react';

type MyContextType = {
  worker: {
    id: string,
    office: string,
    department: string,
    name: string,
    email: string,
    language: string,
    notification: number,
    voiceCommand: boolean,
    pounds: boolean,
    screenReader: boolean,
    darkmode: boolean,
    square: boolean,
    fontSize: number,
    workerPhoto: any,
    presentation: boolean
  },
  setWorker: any
};

const UserContext = createContext<MyContextType>({} as MyContextType);

export default UserContext;