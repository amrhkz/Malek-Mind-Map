"use client";
import { createContext, useContext, useState, useCallback } from "react";
import NotifBox from "../notif-box/notif-box";

const OscarContext = createContext();

export function OscarProvider({ children }) {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const showOscar = useCallback((msg) => {
    setMessage(msg);
    setShow(true);
  }, []);

  const closeOscar = useCallback(() => {
    setShow(false);
    setMessage("");
  }, []);

  return (
    <OscarContext.Provider value={{ showOscar }}>
      {children}

      <NotifBox 
        show={show} 
        message={message} 
        onClose={closeOscar} 
      />
    </OscarContext.Provider>
  );
}

export function useOscar() {
  return useContext(OscarContext);
}
