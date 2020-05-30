import React from 'react';

interface ContextProps {
  full: boolean;
  setFull: (full: boolean) => void;
}

const FullPageContext = React.createContext<ContextProps>({
  full: false,
  setFull: () => {},
});

export const FullPageProvider: React.FC<ContextProps> = ({ children, full, setFull }) => {
  return <FullPageContext.Provider value={{ full, setFull }}>{children}</FullPageContext.Provider>;
};

export function useFullPage(): ContextProps {
  return React.useContext(FullPageContext);
}
