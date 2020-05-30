import { defineConfig } from 'dumi';

export default defineConfig({
    mode: 'site',
    logo: 'https://cdn-blog.jieee.xyz/img/fe-128.png',
    title: 'Fantasy Editor',
    favicon: 'https://cdn-blog.jieee.xyz/img/fe-24.ico',
    navs: [
        null,
        {
            title: 'GitHub',
            path: 'https://github.com/lingjieee/fantasy-editor',
        },
        {
            title: 'Changelog',
            path: 'https://github.com/lingjieee/fantasy-editor/blob/master/CHANGELOG.md',
        },
    ],
    exportStatic: {},
    styles: [],
    scripts: [],
    externals: {},
});