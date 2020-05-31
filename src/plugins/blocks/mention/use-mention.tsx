import { MentionNodeData, UseMentionOptions } from '@/plugins/blocks/mention/types';
import { useCallback, useState } from 'react';
import { Editor, Point, Range, Transforms } from 'slate';
import { insertMention } from '@/plugins/blocks/mention/insert-mentions';

const getNextIndex = (i: number, max: number) => (i >= max ? 0 : i + 1);
const getPreviousIndex = (i: number, max: number) => (i <= 0 ? max : i - 1);

const escapeRegExp = (text: string) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&');
};

const isWordAfterTrigger = (editor: Editor, { at, trigger }: { at: Point; trigger: string }) => {
  // Point at the start of previous word (excluding punctuation)
  const wordBefore = Editor.before(editor, at, { unit: 'word' });

  // Point before wordBefore
  const before = wordBefore && Editor.before(editor, wordBefore);

  // Range from before to start
  const beforeRange = before && Editor.range(editor, before, at);

  // Before text
  const beforeText = beforeRange && Editor.string(editor, beforeRange);

  // Starts with char and ends with word characters
  const escapedTrigger = escapeRegExp(trigger);
  const beforeRegex = new RegExp(`^${escapedTrigger}(\\w+)$`);

  // Match regex on before text
  const match = beforeText && beforeText.match(beforeRegex);

  return {
    range: beforeRange,
    match,
  };
};

// Starts with whitespace char or nothing
const AFTER_MATCH_REGEX = /^(\s|$)/;

const isPointAtWordEnd = (editor: Editor, { at }: { at: Point }) => {
  // Point after at
  const after = Editor.after(editor, at);

  // From at to after
  const afterRange = Editor.range(editor, at, after);
  const afterText = Editor.string(editor, afterRange);

  // Match regex on after text
  return !!afterText.match(AFTER_MATCH_REGEX);
};

export const useMention = (
  data: MentionNodeData[] = [],
  { maxSuggestions = 10, trigger = '@' }: UseMentionOptions = {},
) => {
  const [targetRange, setTargetRange] = useState<Range | null>(null);
  const [valueIndex, setValueIndex] = useState(0);
  const [search, setSearch] = useState('');
  const values = data
    .filter(v => (v.filter || v.value).toLowerCase().includes(search.toLowerCase()))
    .slice(0, maxSuggestions);

  const onKeyDownMention = useCallback(
    (e: any, editor: Editor) => {
      if (targetRange) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          return setValueIndex(getNextIndex(valueIndex, values.length - 1));
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          return setValueIndex(getPreviousIndex(valueIndex, values.length - 1));
        }
        if (e.key === 'Escape') {
          e.preventDefault();
          return setTargetRange(null);
        }
        if (['Tab', 'Enter'].includes(e.key)) {
          e.preventDefault();
          Transforms.select(editor, targetRange);
          insertMention(editor, values[valueIndex]);
          return setTargetRange(null);
        }
      }
    },
    [values, valueIndex, setValueIndex, targetRange, setTargetRange],
  );

  const onChangeMention = useCallback(
    (editor: Editor) => {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const cursor = Range.start(selection);

        const { range, match: beforeMatch } = isWordAfterTrigger(editor, {
          at: cursor,
          trigger,
        });
        if (beforeMatch && isPointAtWordEnd(editor, { at: cursor })) {
          setTargetRange(range as Range);
          const [, word] = beforeMatch;
          setSearch(word);
          setValueIndex(0);
          return;
        }
      }
      setTargetRange(null);
    },
    [setTargetRange, setSearch, setValueIndex, trigger],
  );

  return {
    search,
    index: valueIndex,
    target: targetRange,
    values,
    onChangeMention,
    onKeyDownMention,
  };
};
