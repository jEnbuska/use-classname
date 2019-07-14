// config type passed to StyleProvider as scopedStylisConfig and globalStylisConfig
export type StylisOptions = {
    keyframe?: boolean;
    cascade?: boolean;
    compress?: boolean;
    prefix?: boolean | ((key: string, value: string, context: number) => boolean);
    semicolon?: boolean;
    preserve?: boolean;
}

// css meta data format used by useClassName hook
export type CssMetaData = {
    className: string;
    usage: number;
    timeout: any;
    node: any;
    initialized: boolean;
}

// Sheet type passed to StyleProvider which useClassName uses for adding and removing styles
export type Sheet<S = any> = {
    addCss(css: string): S;
    removeCss?(node: S): void;
    willUnmount?(): void;
};

export type Stylisis = {
    global(css: string): string;
    scoped(className: string, css: string): string;
}

// Context type for StyleContext
export type IStyleContext<S = any> = {
    classNamePrefix: string;
    sheet: Sheet<S>;
    stylisis: Stylisis;
    ttl?: number
};