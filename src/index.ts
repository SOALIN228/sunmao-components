import { App } from 'vue'

export {
  textDefaultProps, textStylePropNames, TextComponentProps,
} from './defaultProps'

import LText from '@/components/LText'
import FinalPage from '@/components/FinalPage'

const components = [
  LText,
  FinalPage,
]

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name, component)
  })
}

export {
  install,
  LText,
  FinalPage,
}

export default {
  install,
}
