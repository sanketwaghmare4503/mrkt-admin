"use client";
import { Notice } from "@atomos_tech/genesis";
import { getAuth } from "@mirats/mirats-auth";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import ProtectedRoute from "./ProtectedRoute";

export interface IUserData {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  avatar?: string;
  country?: string;
  gender?: string;
  DOB?: Date;
  gasID?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NoticeType {
  open: boolean;
  message: string;
  title: string;
  variant: "success" | "error";
  position: "top" | "bottom";
}

interface AppContextType {
  userData: IUserData;
  notice: NoticeType;
  setNotice: React.Dispatch<React.SetStateAction<NoticeType>>;
  userDataLoading: Boolean;
  getUserData: () => void;
  supportModal: Boolean;
  setSupportModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};

const GlobalContext: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<Partial<IUserData>>({});
  const [userDataLoading, setUserDataLoading] = useState(false);
  const [supportModal, setSupportModal] = useState(false);
  const [notice, setNotice] = useState<NoticeType>({
    open: false,
    message: "",
    title: "",
    variant: "success",
    position: "top",
  });
  const getUserData = React.useCallback(async () => {
    if (userDataLoading) return;
    try {
      setUserDataLoading(true);
      const loggedUser = await getAuth();

        setUserData(loggedUser?.currentUser)
    } catch (error) {
      console.log("error in getting admin user=>", error);
      setNotice({
        open: true,
        message: `Unable to get admin user`,
        title: "Logged In Failed !",
        variant: "error",
        position: "bottom",
      });
    } finally {
      setUserDataLoading(false);
    }
  }, [userDataLoading]);


  useEffect(() => {
    if (!userData?._id && !userDataLoading) {
        
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?._id]);

  const value = {
    userData,
    notice,
    setNotice,
    userDataLoading,
    getUserData,
    supportModal,
    setSupportModal,
  };

  return (
    <AppContext.Provider value={value}>
      <ProtectedRoute>{children}</ProtectedRoute>
      <Notice
        open={notice.open}
        setOpen={(open: boolean) => setNotice((prev) => ({ ...prev, open }))}
        variant={notice.variant}
        noticeTitle={notice.title}
        position={notice.position}
      >
        {notice.message}
      </Notice>
    </AppContext.Provider>
  );
};

export default GlobalContext;