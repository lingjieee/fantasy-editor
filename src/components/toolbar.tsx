import React, { FunctionComponent } from 'react';
import { Config } from '..';
import './toolbar.less';
import ButtonUndo from './buttons/button-undo';
import ButtonRedo from './buttons/button-redo';
import ButtonHeading from './buttons/button-heading';
import ButtonBold from './buttons/button-bold';
import ButtonItalic from './buttons/button-italic';
import ButtonUnderline from './buttons/button-underline';
import ButtonStrikeThrough from './buttons/button-strike-through';
import ButtonBlockQuote from './buttons/button-blockquote';
import ButtonSubscript from './buttons/button-subscript';
import ButtonSuperscript from './buttons/button-superscript';
import ButtonFontColor from './buttons/button-font-color';
import ButtonBgColor from './buttons/button-bg-color';
import ButtonAlign from './buttons/button-align';
import ButtonCode from './buttons/button-code';
import ButtonCodeBlock from './buttons/button-code-block';
import ButtonNumberedList from './buttons/button-numbered-list';
import ButtonBulletedList from './buttons/button-bulleted-list';
import ButtonIdentInc from './buttons/button-ident-inc';
import ButtonIdentDec from './buttons/button-ident-dec';
import ButtonLink from './buttons/button-link';
import ButtonImage from './buttons/button-image';
import ButtonHr from './buttons/button-hr';
import ButtonFontSize from './buttons/button-font-size';
import ButtonFile from './buttons/button-file';
import ButtonTable from './buttons/talbe/button-table';
import ButtonLineHeight from './buttons/button-line-height';
import ButtonFull from './buttons/button-full';
import ButtonTasklist from "./buttons/button-tasklist";

interface OwnProps {
  config?: Config;
}

type Props = OwnProps;

const Toolbar: FunctionComponent<Props> = props => {
  const { plugin = {} } = props.config || {};

  return (
    <div className="fc-toolbar">
      {plugin.undo && <ButtonUndo />}
      {plugin.redo && <ButtonRedo />}
      {plugin.heading && <ButtonHeading />}
      {plugin.fontSize && <ButtonFontSize />}
      {plugin.bold && <ButtonBold />}
      {plugin.italic && <ButtonItalic />}
      {plugin.underline && <ButtonUnderline />}
      {plugin.strikeThrough && <ButtonStrikeThrough />}
      {plugin.blockquote && <ButtonBlockQuote />}
      {plugin.subscript && <ButtonSubscript />}
      {plugin.superscript && <ButtonSuperscript />}
      {plugin.fontColor && <ButtonFontColor />}
      {plugin.backgroundColor && <ButtonBgColor />}
      {plugin.align && <ButtonAlign />}
      {plugin.code && <ButtonCode />}
      {plugin.codeBlock && <ButtonCodeBlock />}
      {plugin.list && <ButtonNumberedList />}
      {plugin.list && <ButtonBulletedList />}
      {plugin.tasklist && <ButtonTasklist/>}
      {plugin.ident && <ButtonIdentInc />}
      {plugin.ident && <ButtonIdentDec />}
      {plugin.lineHeight && <ButtonLineHeight />}
      {plugin.link && <ButtonLink />}
      {plugin.image && <ButtonImage />}
      {plugin.file && <ButtonFile />}
      {plugin.table && <ButtonTable />}
      {plugin.hr && <ButtonHr />}
      {plugin.full && <ButtonFull />}
    </div>
  );
};

export default Toolbar;
