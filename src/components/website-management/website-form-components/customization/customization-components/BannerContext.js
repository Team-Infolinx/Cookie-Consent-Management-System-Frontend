import React, { createContext, useState } from "react";
const BannerContext = createContext();
const BannerProvider = ({ websiteId, children }) => {
  const [top, setTop] = useState(10);
  const [left, setLeft] = useState(10);
  const [color, setColor] = useState("#eb6c44");
  const [textColor,setTextColor ] = useState("#ffffff");
  const [chosenCont, setChosenCont] = useState("");

  return (
    <BannerContext.Provider
      value={{
        top,
        setTop,
        left,
        setLeft,
        color,
        setColor,
        chosenCont,
        setChosenCont,
        websiteId,
          textColor,
          setTextColor
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export { BannerContext, BannerProvider };
