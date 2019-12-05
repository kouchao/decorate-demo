import * as constraint from './constraint'

// 模型
export default class Module {

  /**
   * 转成json并且验证
   * @param Mod 根据模型进行校验
   * @param obj 要校验的数据
   * @return 
   *  res: 结果
   *  data: 符合模型的数据
   *  message： 错误信息
   */
  toJsonAndValid(Mod, obj = {}) {
    const data = {}
    let resMessage = ''
    let res = true


    // 属性在模型中存在的进行遍历
    Object.getOwnPropertyNames(Mod.prototype.constraint).forEach((key) => {
      const val = data[key] = obj[key]

      // 取出当前key的约束条件 是个数组
      const curConstraints = Mod.prototype.constraint[key]


      // 约束存在则开始验证
      if(curConstraints){

        // 存在任意约束没有通过则认为检查不通过
        res = !curConstraints.some(({funName, arg, message}) => {

          // 调用约束进行校验
          if(!constraint[funName](val, ...arg)){
            resMessage = message || `${key} 不符合约束 ${funName}`
            return true
          }
          return false
        })
      }
      
    })


    return {
      res,
      data,
      message: resMessage
    }
  }
}