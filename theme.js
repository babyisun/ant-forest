// https://github.com/babyisun/docz/tree/master/core/docz-theme-default
const Colors = {
    Primary: '#1badff', // 主色调
    Secondary:'#e2f6ff', // 辅色调
    Error: '#f74052', // 错误提示
    Title: 'rgba(0, 0, 0, 0.85)', // 标题或较深label
    Text: '#666', // 文字或正文
};

const { NODE_ENV } = process.env;
const F ={
    development:'',
    production:'/ant-forest'
}

export default {
    logo: {
        src: `${F[NODE_ENV]}/public/logo.png`,
        width :56,
    },
    colors: {
        primary: Colors.Primary,
        sidebarText: Colors.Text,
    },
    styles: {
        body: {
            '& .css-pccrlp' :{
                '& > div:last-child': {
                display: 'none',
                },
                '& nav':{
                    '& a, & dl > dt a': {
                    fontSize: '1.1em',
                    },
                    // '& dl > dt a': {
                    //     fontSize: '1.1em',
                    // },
                },   
            },
            '& .css-pccrlp > div:first-of-type a': {
                '&::after':{
                    content: '\'Ant Forest\'',
                    color: Colors.Title,
                    fontSize: '2.5em',
                    fontWeight: 'bold',
                    padding: '0 8px',
                    marginTop: 6,
                    position: 'absolute',
                },
            },
            // '& .css-pccrlp > div:first-of-type a': {
            //     '&::after':{
            //         content: '\'Ant Forest\'',
            //         color: Colors.Title,
            //         fontSize: '2.5em',
            //         fontWeight: 'bold',
            //         padding: '0 8px',
            //         marginTop: 6,
            //         position: 'absolute',
            //     },
            // },
            '& .react-live > div:first-of-type': {
                position: 'inherit',
            },
            '& .css-wwgiek + div + div > div': {
                width: 'calc(100% - 40px)',
                // '@media (min-width: 1024px)': {
                //     width: '1024px',
                // },
                // '@media (min-width: 1400px)': {
                //     width: '1400px',
                // }
            },
        },
        h1: {
            borderBottom: `3px solid ${Colors.Primary}`,
            fontSize: '1.6em',
            position:'inherit',
            '&::before':{
                display: 'none',
            },
        },
        h2: {
            fontSize: '1.2em',
            fontWeight: 'bold',
        },
        h3: {
            fontSize: '1em',
        },
        h4: {
            fontSize: '0.8em',
        },
        h5: {
            fontSize: '0.6em',
        },
        h6: {
            fontSize: '0.5em',
        },
        // p标记
        paragraph: {
            fontSize: '16px',
            lineHeight: 1,
        },
        ul: {
            fontSize: '16px',
            '& li':{
                lineHeight: 2,
            }
        }
    },

};