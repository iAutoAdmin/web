import Vue from 'vue'
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Table,
  TableColumn,
  Pagination,
  Tabs,
  TabPane,
  Message,
  MessageBox,
  Button,
  Loading,
  Dialog,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Checkbox,
  Switch,
  Select,
  Option,
  DatePicker,
  Tree,
  CheckboxGroup,
  Row,
  Upload,
  Collapse,
  CollapseItem,
  Cascader,
  Progress
} from 'element-ui'
import locale from 'element-ui/lib/locale'
import lang from './zh-CN'
locale.use(lang)
const components = [
  Cascader,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Scrollbar,
  Table,
  TableColumn,
  Pagination,
  Tabs,
  TabPane,
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  RadioGroup,
  Radio,
  Checkbox,
  Switch,
  Select,
  Option,
  DatePicker,
  Tree,
  CheckboxGroup,
  Row,
  Upload,
  Collapse,
  CollapseItem,
  Progress
]
components.forEach(component => {
  Vue.use(component)
})
Vue.use(Loading.directive)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
