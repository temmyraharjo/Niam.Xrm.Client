import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json';

export default {
  input: {
    employee: 'src/employee/index.ts'
  },
  output: {
    dir: 'dist',
    format: 'umd',
    globals: {
      '@niam/xrm-client': 'niam.xrm'
    },
    name: 'My.Company'
  },
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript() 
  ]
}