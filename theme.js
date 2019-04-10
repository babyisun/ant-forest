// https://github.com/babyisun/docz/tree/master/core/docz-theme-default
const Colors = {
    Primary: '#1badff', // 主色调
    Secondary:'#e2f6ff', // 辅色调
    Error: '#f74052', // 错误提示
    Title: 'rgba(0, 0, 0, 0.85)', // 标题或较深label
    Text: '#666', // 文字或正文
};

export default {
    logo: {
        src: '/public/logo.png',
        width :66,
        title: 'Ant',
    },
    colors: {
        primary: Colors.Primary,
    },
    styles: {
        body: {
            '& .css-pccrlp > div:last-child':{
                display: 'none',
            },
            '& .css-pccrlp > div:first-of-type a':{
                // display:'block',
                // width:'150px',
                '&::after':{
                    content: '\'Ant Forest\'',
                    color: Colors.Title,
                    fontSize: '2em',
                    fontWeight: 'bold',
                    padding: 10,
                    marginTop: 6,
                    position: 'absolute',
                    // display: 'block',
                    // width: '150px',
                },
            },
            '& .react-live > div:first-of-type':{
                position: 'inherit',
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