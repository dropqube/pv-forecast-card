import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from '@rollup/plugin-terser';

export default {
  input: 'src/clock_pv_forecast_card.js',
  output: {
    file: 'clock_pv_forecast_card.js',
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    terser()
  ]
};
