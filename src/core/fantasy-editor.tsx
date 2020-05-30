import { LocaleProvider } from '@/common/locale-provider';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PluginEditor } from './plugin-editor';
import { pipe } from '@/common/pipe';
import { withHistory } from 'slate-history';
import { Slate, withReact } from 'slate-react';
import { createEditor, Node } from 'slate';
import { LocaleDefinition } from '@/locale';
import { Config } from '..';
import { SlatePlugin } from '..';
import { BoldPlugin } from '@/plugins/marks/bold';
import Toolbar from '../components/toolbar';
import './fantasy-editor.less';
import { HeadingPlugin } from '@/plugins/blocks/heading';
import { ItalicPlugin } from '@/plugins/marks/italic';
import { UnderlinePlugin } from '@/plugins/marks/underline';
import { StrikeThroughPlugin } from '@/plugins/marks/strike-through';
import { BlockQuotePlugin } from '@/plugins/blocks/blockquote';
import { SubscriptPlugin } from '@/plugins/marks/subscript';
import { SuperscriptPlugin } from '@/plugins/marks/superscript';
import { FontColorPlugin } from '@/plugins/marks/font-color';
import { BgColorPlugin } from '@/plugins/marks/bg-color';
import { AlignPlugin } from '@/plugins/blocks/align';
import { CodePlugin } from '@/plugins/marks/code';
import { CodeBlockPlugin } from '@/plugins/blocks/code-block';
import { ListPlugin } from '@/plugins/blocks/list';
import { IdentPlugin } from '@/plugins/blocks/ident';
import { LinkPlugin } from '@/plugins/blocks/link';
import { withInline } from '@/plugins/with-inline';
import { BLOCK_FILE, BLOCK_HR, BLOCK_LINK } from '@/plugins/types';
import { ImagePlugin, withImage } from '../plugins/blocks/image';
import { withTrailingNode } from '@/plugins/with-trailing-node';
import { withVoid } from '@/plugins/with-void';
import { HrPlugin } from '@/plugins/blocks/hr';
import { FilePlugin, withFile } from '../plugins/blocks/file';
import { FontSizePlugin } from '@/plugins/marks/font-size';
import { TablePlugin } from '@/plugins/blocks/table';
import { LineHeightPlugin } from '@/plugins/marks/line-height';
import { FullPageProvider } from './context/full-page';
import classNames from 'classnames';
import { withShortcuts } from '@/plugins/with-shortcuts';

interface OwnProps {
  locale?: LocaleDefinition;
  config?: Config;
  value?: Node[];
  defaultValue?: Node[];
  onChange?: (value: Node[]) => void;
}

type Props = OwnProps;

const withPlugins = [
  withReact,
  withHistory,
  withInline([BLOCK_LINK, BLOCK_FILE]),
  withImage(),
  withFile(),
  withTrailingNode(),
  withVoid([BLOCK_HR]),
  withShortcuts(),
];

const FantasyEditor: React.FC<Props> = props => {
  const { locale, config, value: propValue, defaultValue, onChange } = props;

  const editorConfig = config?.editor || {};
  const pluginConfig = config?.plugin || {};

  const plugins: SlatePlugin[] = useMemo(() => {
    const list: SlatePlugin[] = [];
    if (pluginConfig.heading) {
      list.push(HeadingPlugin());
    }
    if (pluginConfig.fontSize) {
      list.push(FontSizePlugin());
    }
    if (pluginConfig.bold) {
      list.push(BoldPlugin());
    }
    if (pluginConfig.italic) {
      list.push(ItalicPlugin());
    }
    if (pluginConfig.underline) {
      list.push(UnderlinePlugin());
    }
    if (pluginConfig.strikeThrough) {
      list.push(StrikeThroughPlugin());
    }
    if (pluginConfig.blockquote) {
      list.push(BlockQuotePlugin());
    }
    if (pluginConfig.subscript) {
      list.push(SubscriptPlugin());
    }
    if (pluginConfig.superscript) {
      list.push(SuperscriptPlugin());
    }
    if (pluginConfig.fontColor) {
      list.push(FontColorPlugin());
    }
    if (pluginConfig.backgroundColor) {
      list.push(BgColorPlugin());
    }
    if (pluginConfig.align) {
      list.push(AlignPlugin());
    }
    if (pluginConfig.code) {
      list.push(CodePlugin());
    }
    if (pluginConfig.codeBlock) {
      list.push(CodeBlockPlugin());
    }
    if (pluginConfig.list) {
      list.push(ListPlugin());
    }
    if (pluginConfig.ident) {
      list.push(IdentPlugin());
    }
    if (pluginConfig.link) {
      list.push(LinkPlugin());
    }
    if (pluginConfig.image) {
      list.push(ImagePlugin());
    }
    if (pluginConfig.hr) {
      list.push(HrPlugin());
    }
    if (pluginConfig.file) {
      list.push(FilePlugin());
    }
    if (pluginConfig.table) {
      list.push(TablePlugin());
    }
    if (pluginConfig.lineHeight) {
      list.push(LineHeightPlugin());
    }
    return list;
  }, [pluginConfig]);

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  const [value, setValue] = useState<Node[]>(defaultValue || []);
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (propValue) {
      setValue(propValue);
    }
  }, [propValue]);

  let handleChange = useCallback(
    (value: Node[]) => {
      setValue(value);
      onChange?.(value);
    },
    [onChange],
  );

  return (
    <div className={classNames('fc-editor', { full })}>
      <LocaleProvider locale={locale}>
        <FullPageProvider full={full} setFull={setFull}>
          <Slate editor={editor} value={value} onChange={handleChange}>
            <Toolbar config={config} />
            <div className="fc-content" style={{ height: editorConfig.height || 500 }}>
              <PluginEditor plugins={plugins} />
            </div>
          </Slate>
        </FullPageProvider>
      </LocaleProvider>
    </div>
  );
};

export { FantasyEditor };
