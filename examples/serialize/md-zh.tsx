import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
// @ts-ignore
import initValue from './value.json';
import {createEditor, Node} from 'slate';
import {enUS, SlatePlugin} from "fantasy-editor";
import {Slate, withReact} from "slate-react";
import {withHistory} from "slate-history";
import {Button} from 'antd';
import 'antd/lib/button/style';

import classNames from 'classnames';

import './index.less';
import {
  AlignPlugin,
  BgColorPlugin,
  BlockQuotePlugin,
  BoldPlugin,
  CodeBlockPlugin,
  CodePlugin,
  FilePlugin,
  FontColorPlugin,
  FontSizePlugin,
  HeadingPlugin,
  HrPlugin,
  IdentPlugin,
  ImagePlugin,
  ItalicPlugin,
  LineHeightPlugin,
  LinkPlugin,
  ListPlugin,
  pipe,
  SoftBreakPlugin,
  StrikeThroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  TaskListPlugin,
  UnderlinePlugin,
  withFile,
  withImage,
  withInline,
  withMention,
  withShortcuts,
  withTrailingNode,
  withTable,
  withVoid,
  LocaleProvider,
  FullPageProvider,
  Toolbar,
  PluginEditor,
  ButtonUndo,
  BLOCK_LINK,
  BLOCK_FILE,
  BLOCK_HR,
  ButtonRedo,
  ButtonHeading,
  ButtonFontSize,
  ButtonBold,
  ButtonItalic,
  ButtonUnderline,
  ButtonStrikeThrough,
  ButtonBlockQuote,
  ButtonSubscript,
  ButtonSuperscript,
  ButtonFontColor,
  ButtonBgColor,
  ButtonAlign,
  ButtonCode,
  ButtonCodeBlock,
  ButtonNumberedList,
  ButtonBulletedList,
  ButtonIdentInc,
  ButtonIdentDec,
  ButtonLineHeight,
  ButtonLink, ButtonImage, ButtonFile, ButtonHr, ButtonFull, ButtonTaskList,
  serializeMarkdown
} from "fantasy-editor";

const withPlugins = [
  withReact,
  withHistory,
  withInline([BLOCK_LINK, BLOCK_FILE]),
  withImage(),
  withFile(),
  withTrailingNode(),
  withVoid([BLOCK_HR]),
  withShortcuts(),
  withMention(),
  withTable(),
];

const FullDemo: FunctionComponent = () => {

  const [value, setValue] = useState<Node[]>(initValue as any);
  const [md, setMd] = useState('');

  const plugins: SlatePlugin[] = useMemo(() => {
    const list: SlatePlugin[] = [];
    list.push(SoftBreakPlugin());
    list.push(HeadingPlugin());
    list.push(FontSizePlugin());
    list.push(BoldPlugin());
    list.push(ItalicPlugin());
    list.push(UnderlinePlugin());
    list.push(StrikeThroughPlugin());
    list.push(BlockQuotePlugin());
    list.push(SubscriptPlugin());
    list.push(SuperscriptPlugin());
    list.push(FontColorPlugin());
    list.push(BgColorPlugin());
    list.push(AlignPlugin());
    list.push(CodePlugin());
    list.push(CodeBlockPlugin());
    list.push(ListPlugin());
    list.push(IdentPlugin());
    list.push(LinkPlugin());
    list.push(ImagePlugin());
    list.push(HrPlugin());
    list.push(FilePlugin());
    list.push(LineHeightPlugin());
    list.push(TaskListPlugin())

    return list;
  }, []);


  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  const [fullPage, setFullPage] = useState(false);

  const onChange = useCallback(
    (value: Node[]) => {
      setValue(value);
    },
    [editor, setValue],
  );

  const serialize = () => {
    setMd(serializeMarkdown(value));
  };

  return (
    <div>
      <div className={classNames('fc-editor', {'full-page': fullPage})}>
        <LocaleProvider locale={enUS}>
          <FullPageProvider full={fullPage} setFull={setFullPage}>
            <Slate
              editor={editor}
              value={value}
              onChange={onChange}
            >
              <Toolbar>
                <ButtonUndo/>
                <ButtonRedo/>
                <ButtonHeading/>
                <ButtonFontSize/>
                <ButtonBold/>
                <ButtonItalic/>
                <ButtonUnderline/>
                <ButtonStrikeThrough/>
                <ButtonBlockQuote/>
                <ButtonSubscript/>
                <ButtonSuperscript/>
                <ButtonFontColor/>
                <ButtonBgColor/>
                <ButtonAlign/>
                <ButtonCode/>
                <ButtonCodeBlock/>
                <ButtonNumberedList/>
                <ButtonBulletedList/>
                <ButtonTaskList/>
                <ButtonIdentInc/>
                <ButtonIdentDec/>
                <ButtonLineHeight/>
                <ButtonLink/>
                <ButtonImage/>
                <ButtonFile/>
                <ButtonHr/>
                <ButtonFull/>
              </Toolbar>
              <div className="fc-content" style={{height: 500}}>
                <PluginEditor plugins={plugins}/>
              </div>
            </Slate>
          </FullPageProvider>
        </LocaleProvider>
      </div>
      <div style={{padding: 16}}>
        <Button onClick={serialize} type="primary">生成Markdown</Button>
      </div>
      {md&&(
        <div className="content-display">
          {md}
        </div>
      )}
    </div>
  );
};

export default FullDemo;
