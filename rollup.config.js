import path from 'path';
import {
  eslint
} from 'rollup-plugin-eslint';
// import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';
import postcss from 'rollup-plugin-postcss';

// import resolve from 'rollup-plugin-node-resolve';


const {
  NODE_ENV,
  FORMAT
} = process.env;
// const pathResolve = p => path.resolve(__dirname, p);

// console.log(FORMAT, 'ted');

const F = {
  js: 'cjs',
  es: 'es'
}

const config = {
  // input: 'src/index.js',
  // input: ['src/components/Cascader/Cascader.jsx', 'src/components/Filter/Filter.jsx'],
  input: ['src/components/Filter/Filter.jsx'],
  output: { dir: 'es/filter', format: F[FORMAT], indent: false },
  // output: [{
  //     dir: 'es',
  //     format: F[FORMAT],
  //     indent: false,
  //   },
  //   {
  //     // dir: 'es/filter/index.js',
  //     file: 'es/filter/index.js',
  //     format: F[FORMAT],
  //     indent: false
  //   },
  // ],

  external: (id) => {
    // if (peer.includes(id)) return true;
    if (id.includes('antd/') || id.includes('@babel/runtime/')) return true;
  },
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**/*.(js|jsx)'],
      exclude: ['node_modules/**'],
    }),
    // resolve(),
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    sass({
      // insert: true,
      output: true,
      // output: 'es/filter/style/filter.scss',
    }),
    // postcss({
    //   extract: true,
    //   exec: true,
    // }),
    // alias({
    //   '@': pathResolve('src')
    // }),
  ],
};

export default config;