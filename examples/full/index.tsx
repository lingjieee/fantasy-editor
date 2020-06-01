import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
// @ts-ignore
import initValue from './value.json';
import {createEditor, Node} from 'slate';
import {enUS, SlatePlugin} from "fantasy-editor";
import {Slate, withReact} from "slate-react";
import {withHistory} from "slate-history";

import {MENTIONS} from "./mentions";

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
  MentionPlugin,
  pipe,
  SoftBreakPlugin,
  StrikeThroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  TablePlugin,
  TaskListPlugin,
  UnderlinePlugin,
  useMention,
  withFile,
  withImage,
  withInline,
  withMention,
  withShortcuts,
  withTrailingNode,
  withVoid,
  LocaleProvider,
  FullPageProvider,
  Toolbar,
  PluginEditor,
  MentionSelect,
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
  ButtonLink, ButtonImage, ButtonFile, ButtonTable, ButtonHr, ButtonFull, ButtonTaskList
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
];

const FullDemo: FunctionComponent = () => {

  const [value, setValue] = useState<Node[]>(initValue as any);

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
    list.push(TablePlugin());
    list.push(LineHeightPlugin());
    list.push(
      MentionPlugin({
        onClick: value => console.log(`Hello ${value}!`),
      }),
    );
    list.push(TaskListPlugin())

    return list;
  }, []);

  const {onChangeMention, onKeyDownMention, search, index, target, values} = useMention(MENTIONS, {
    maxSuggestions: 10,
    trigger: '@',
  });

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  const [fullPage, setFullPage] = useState(false);

  const onChange = useCallback(
    (value: Node[]) => {
      onChangeMention(editor);
      console.log(value);
      setValue(value);
    },
    [editor, onChangeMention, setValue],
  );

  return (
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
              <ButtonTable/>
              <ButtonHr/>
              <ButtonFull/>
            </Toolbar>
            <div className="fc-content" style={{height: 500}}>
              <PluginEditor plugins={plugins} onKeyDown={[onKeyDownMention]} onKeyDownDeps={[index, search, target]}/>
            </div>
            <MentionSelect at={target} valueIndex={index} options={values}/>
          </Slate>
        </FullPageProvider>
      </LocaleProvider>
    </div>
  );
};

export default FullDemo;
