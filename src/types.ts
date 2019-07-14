// config type passed to StyleProvider as scopedStylisConfig and globalStylisConfig
export type StylisConfig = {
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
    initialize?: () => void; // called once on during first render
    addCss(css: string): S; // called every when a new css is defined
    removeCss?(node: S): void; // called when css is no longer user, after ttl duration
    willUnmount?(): void; // called during StyleProvider unmount
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