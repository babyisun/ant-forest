import { red } from "ansi-colors";

const Colors = {
    Primary: '#1badff'
};

export default {
    colors: {
        primary: Colors.Primary,
    },
    styles: {
        h1: {
            borderBottom: `3px solid ${Colors.Primary}`,
            fontSize: '2em',
            position:'inherit',
            '&:before':{
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