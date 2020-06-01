import React, { FunctionComponent } from 'react';
import './toolbar.less';

const Toolbar: FunctionComponent = ({children}) => {

  return (
    <div className="fc-toolbar">
      {children}
    </div>
  );
};

export {Toolbar};
