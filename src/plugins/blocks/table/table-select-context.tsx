import React from 'react';

interface ContextProps {
  select: boolean,
  selected: boolean,
  selectRange: {x1:number, x2:number, y1:number, y2:number},
  startSelect: (x:number, y:number) => void;
  moveSelect: (x:number, y:number) => void;
  stopSelect: (x:number, y:number) => void;
}

const TableSelectContext = React.createContext<ContextProps>({
  select: false,
  selected: false,
  selectRange: {x1:-1,x2:-1,y1:-1, y2:-1},
  startSelect: ()=>{},
  moveSelect: ()=>{},
  stopSelect: ()=>{}
});

export const TableSelectProvider:React.FC<ContextProps> = ({children, ...rest}) => {
  return(
    <TableSelectContext.Provider value={rest}>
      {children}
    </TableSelectContext.Provider>
  )
}

export function useTableSelect():ContextProps{
  return React.useContext(TableSelectContext);
}