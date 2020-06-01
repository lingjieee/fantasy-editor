export interface MentionRenderElementProps {
  prefix?: string;
  onClick?: (value: any) => void;
}

export interface MentionPluginOptions {
  prefix?: string;
  onClick?: (value: any) => void;
}

export interface MentionNodeData {
  value: string;
  filter?: string;
  [key: string]: any;
}

export interface UseMentionOptions {
  trigger?: string;
  maxSuggestions?: number;
}
