// https://github.com/babyisun/docz/tree/master/core/docz-theme-default
const Colors = {
    Primary: '#1badff', // 主色调
    Secondary:'#e2f6ff', // 辅色调
    Error: '#f74052', // 错误提示
    Title: '#333', // 标题或较深label
    Text: '#666', // 文字或正文

};

export default {
    colors: {
        primary: Colors.Primary,
    },
    styles: {
        body: {
            '& .css-pccrlp > div:last-child':{
            display: 'none',
            }
        },
        h1: {
            borderBottom: `3px solid ${Colors.Primary}`,
            fontSize: '2em',
            position:'inherit',
            '&::before':{
                display: 'none',
            },
        },
        h2: '',
        h3: '',
        h4: '',
        h5: '',
        h6: '',
    },

};