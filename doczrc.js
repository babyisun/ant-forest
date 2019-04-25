import {
    css
} from 'docz-plugin-css';
import theme from './theme'


export default {
    // src: './src',
    dest: './docs',
    base: '/ant-forest',
    // public: './public',
    title: 'Ant Forest',
    description: 'A component library which is growing on ant-design.',
    codeSandbox: false,
    hashRouter: true,
    //   theme:'theme',
    themeConfig: theme,
    plugins: [
        // css(),
        css({
            preprocessor: 'postcss',
            // cssmodules: true,
        }),
        css({
            preprocessor: 'less',
            loaderOpts: {
                javascriptEnabled: true,
            },
        }),
        css({
            preprocessor: 'sass',
            // cssmodules: true,
        }),
    ],
    modifyBabelRc: (babelrc) => {
        babelrc.plugins.unshift([
            'import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true, // 'css'
            },
        ]);
        return babelrc;
    },
    htmlContext: {
        favicon: '/public/favicon.ico',
        // head: {
        //     links: [{
        //         rel: 'stylesheet',
        //         href: '/theme/theme.css',
        //     }, ],
        // },
    },
    sourcemaps: false,
    ignore: [
        '**/button.mdx',
        '**/category.mdx',
    ],
    menu: [
        '快速开始',
        'Cascader 级联选择',
        'CountInput 计数框',
        'Filter 筛选器',
        'Copy 一键复制',
        // 'Category 分类卡片',
        // 'TopProgress 进度条',
      ],
};