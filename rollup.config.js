import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';

const input = "src/pagebar.vue";
export default [
  // UMD build for Browser
  {
    external: ['vue'],
    input: input,
    output: {
      format: 'umd',
      name: pkg.name,
      globals: { 'vue': 'Vue' },
      file: pkg.browser,
    },
    plugins: [
      json(),
      resolve({ modulesOnly: true, only: [/^simter-vue-.*$/] }),
      commonjs(),
      vue(),
      babel({
        exclude: 'node_modules/**',
        babelrc: false,
        presets: [["@babel/env", { "modules": false }]]
      })
    ]
  },

  // CommonJS build for Node.
  // And ES module build for bundlers.
  {
    external: ['vue', 'simter-vue-utils'],
    input: input,
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' }
    ],
    plugins: [
      json(),
      commonjs(),
      vue(),
      babel({ exclude: 'node_modules/**' })
    ]
  }
];