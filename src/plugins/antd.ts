import { App } from 'vue'
import {
  ConfigProvider,
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table,
  Drawer,
  Switch,
  Upload,
  Modal,
  Icon
} from 'ant-design-vue'

export const components = [
  ConfigProvider,
  Menu,
  Button,
  Card,
  Form,
  Select,
  Input,
  Breadcrumb,
  Dropdown,
  Layout,
  Table,
  Drawer,
  Switch,
  Upload,
  Modal,
  Icon
]

export default {
  install: (app: App) => {
    components.forEach(component => {
      app.use(component)
    })
  }
}
