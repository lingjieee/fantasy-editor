import React, { FunctionComponent } from 'react';
import { enUS, LocaleDefinition } from '../locale';
import merge from 'lodash/merge';

const LocaleContext = React.createContext<LocaleDefinition>(enUS);

interface OwnProps {
  locale?: LocaleDefinition;
}

type Props = OwnProps;

export const LocaleProvider: FunctionComponent<Props> = ({ locale, children }) => {
  const mergeLocal = merge(enUS, locale || {});
  return <LocaleContext.Provider value={mergeLocal}>{children}</LocaleContext.Provider>;
};

export function useLocale(): LocaleDefinition {
  return React.useContext(LocaleContext);
}
