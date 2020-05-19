import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default commandLineArgs => {
  let plugins = commandLineArgs.prod === true
    ? [
      typescript({ module: 'es2015' }),
      terser()
    ]
    : [
      typescript({ module: 'es2015' })
    ]
  
  return {
    input: {
      'my.company.employee': 'src/employee/main.ts'
    },
    output: {
      dir: 'dist',
      format: 'umd',
      globals: {
        '@niam/xrm-client': 'Niam.Xrm'
      },
      name: 'My.Company'
    },
    external: [
      '@niam/xrm-client'
    ],
    plugins
  };
}
