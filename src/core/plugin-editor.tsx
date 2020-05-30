import React, { useCallback } from 'react';
import { Decorate, OnDOMBeforeInput, OnKeyDown, RenderElement, RenderLeaf, SlatePlugin } from '@/common/types';
import { Editable, useSlate } from 'slate-react';
import { decoratePlugins } from '@/utils/decorate-plugins';
import { onDOMBeforeInputPlugins } from '@/utils/on-dom-before-input-plugins';
import { renderElementPlugins } from '@/utils/render-element-plugins';
import { renderLeafPlugins } from '@/utils/render-leaf-plugins';
import { onKeydownPlugins } from '@/utils/on-keydown-plugins';
import { useLocale } from '@/common/locale-provider';

export interface PluginEditorProps {
  [key: string]: any;
  placeholder?: string;
  readOnly?: boolean;
  role?: string;
  style?: React.CSSProperties;
  plugins?: SlatePlugin[];
  decorate?: Decorate[];
  decorateDeps?: any[];
  renderElement?: RenderElement[];
  renderElementDeps?: any[];
  renderLeaf?: RenderLeaf[];
  renderLeafDeps?: any[];
  onDOMBeforeInput?: OnDOMBeforeInput[];
  onDOMBeforeInputDeps?: any[];
  onKeyDown?: OnKeyDown[];
  onKeyDownDeps?: any[];
}

const PluginEditor: React.FC<PluginEditorProps> = ({
  plugins = [],
  decorate: decorateList = [],
  decorateDeps = [],
  renderElement: renderElementList = [],
  renderElementDeps = [],
  renderLeaf: renderLeafList = [],
  renderLeafDeps = [],
  onDOMBeforeInput: onDOMBeforeInputList = [],
  onDOMBeforeInputDeps = [],
  onKeyDown: onKeyDownList = [],
  onKeyDownDeps = [],
  ...rest
}) => {
  const editor = useSlate();
  let {
    editor: { placeholder },
  } = useLocale();
  return (
    <Editable
      decorate={useCallback(decoratePlugins(editor, plugins, decorateList), decorateDeps)}
      onDOMBeforeInput={useCallback(
        onDOMBeforeInputPlugins(editor, plugins, onDOMBeforeInputList),
        onDOMBeforeInputDeps,
      )}
      renderElement={useCallback(renderElementPlugins(plugins, renderElementList), renderElementDeps)}
      renderLeaf={useCallback(renderLeafPlugins(plugins, renderLeafList), renderLeafDeps)}
      onKeyDown={useCallback(onKeydownPlugins(editor, plugins, onKeyDownList), onKeyDownDeps)}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export { PluginEditor };
