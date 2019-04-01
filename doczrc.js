import {
    css
} from 'docz-plugin-css';
import theme from './theme'


export default {
    //   src: './components',
    dest: './doc',
    //   base: '/ant-forest',
    title: 'Ant Forest',
    description: 'A component library growing on ant-design.',
    codeSandbox: false,
    hashRouter: true,
    //   theme:'theme',
    themeConfig: theme,
    plugins: [
        // css(),
        css({
            preprocessor: 'postcss',
            cssmodules: true,
        }),
        css({
            preprocessor: 'less',
            loaderOpts: {
                javascriptEnabled: true,
            },
        }),
        css({
            preprocessor: 'sass',
            //   cssmodules: true,
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
        favicon: '/favicon.ico',
        // head: {
        //     links: [{
        //         rel: 'stylesheet',
        //         href: '/theme/theme.css',
        //     }, ],
        // },
    },
    sourcemaps: false,
};