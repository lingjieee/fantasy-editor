import React, { forwardRef, FunctionComponent, MouseEventHandler } from 'react';
import ToolbarButton from './toolbar-button';
import { ReactComponent as CertDown } from '../assets/svg/cert-down.svg';
import classNames from 'classnames';
import './dropdown-button.less';

interface OwnProps {
  width?: number;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onMouseDown?: MouseEventHandler;
}

type Props = OwnProps;

const DropdownButton: FunctionComponent<Props> = forwardRef((props, ref) => {
  const { children, className, width, ...rest } = props;

  return (
    <ToolbarButton style={{ width }} ref={ref as any} className={classNames(className, 'fc-dropdown-btn')} {...rest}>
      {children}
      <CertDown className="fc-dropdown-cert" />
    </ToolbarButton>
  );
});

export default DropdownButton;
