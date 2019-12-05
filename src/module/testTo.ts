import Module from "../utils/module"
import { notNull, size } from "../decorate/validate"

export default class TestTo extends Module {
 
  @notNull('name不能为空')
  name

  @size('age必须是数字', 10, 20)
  age
}