
import { eslint } from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import sass from 'rollup-plugin-sass';

const { NODE_ENV } = process.env;

const F ={
    js:'cjs',
    es:'es'
}

const config = {
  input: 'src/index.js',
  output: { format: F[NODE_ENV], indent: false },
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
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
    }),
    sass({
      insert: true,
    }),
  ],
};

export default config;