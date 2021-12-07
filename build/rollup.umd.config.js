import basicConfig, { file } from './rollup.config'

export default {
  ...basicConfig,
  output: {
    name: 'SunMaoComponents',
    file: file('umd'),
    format: 'umd',
    // 设置依赖的全局变量名称
    globals: {
      'vue': 'Vue',
      'lodash-es': '_'
    },
    // 设置类库导出时，umd全局变量名称，取name属性
    exports: 'named'
  }
}
