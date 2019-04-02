// https://github.com/babyisun/docz/tree/master/core/docz-theme-default
const Colors = {
    Primary: '#1badff'
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