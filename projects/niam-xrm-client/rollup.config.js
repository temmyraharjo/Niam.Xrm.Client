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
    input: 'src/main.ts',
    output: {
      dir: 'dist',
      format: 'umd',
      name: 'niam.xrm'
    },
    plugins
  };
}