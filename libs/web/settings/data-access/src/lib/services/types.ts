export interface Layout {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
    /** Whether to fold menu */
    collapsed: boolean;
    /** Current language */
    lang: string;

    fixed: boolean;
  }