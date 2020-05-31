import React, { FunctionComponent } from 'react';
import { useFullPage } from '@/core/context/full-page';
import ToolbarButton from '../toolbar-button';
import { ReactComponent as IconFull } from '../../assets/svg/full.svg';
import { ReactComponent as IconExist } from '../../assets/svg/exist-full.svg';

interface OwnProps {}

type Props = OwnProps;

const ButtonFull: FunctionComponent<Props> = props => {
  const { full, setFull } = useFullPage();

  const handleSwitch = () => {
    setFull(!full);
  };

  return <ToolbarButton onMouseDown={handleSwitch}>{full ? <IconExist /> : <IconFull />}</ToolbarButton>;
};

export default ButtonFull;
