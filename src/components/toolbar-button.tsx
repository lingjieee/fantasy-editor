import React, { FunctionComponent, MouseEventHandler, forwardRef, CSSProperties } from 'react';
import classNames from 'classnames';
import './toolbar-button.less';

interface OwnProps {
  style?: CSSProperties;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  onMouseDown?: MouseEventHandler;
  ref?: any;
}

type Props = OwnProps;

const ToolbarButton: FunctionComponent<Props> = forwardRef((props, ref) => {
  const { children, active = false, disabled = false, style, onMouseDown, className } = props;

  const handleMouseDown: MouseEventHandler = event => {
    event.preventDefault();
    onMouseDown?.(event);
  };

  return (
    <button
      disabled={disabled}
      style={style}
      className={classNames('fc-toolbar-btn', disabled ? 'disable' : active ? 'active' : null, className)}
      ref={ref as any}
      onMouseDown={handleMouseDown}>
      {children}
    </button>
  );
});

export default ToolbarButton;
