import Module from "../utils/module"
import { notNull, isNumber } from "../decorate/validate"

export default class TestTo extends Module {
 
  @notNull('name不能为空')
  name

  // @isNumber('number必须是数字')
  // number
}