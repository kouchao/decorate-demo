// 验证中间件 参数是模型
export const validate = (Module, paramKey?: 'query' | 'body') => (target, propertyName, descriptor) => {
  let method = descriptor.value;
  descriptor.value = function () {
      const mod = new Module()
      const ctx = arguments[0]

      // 根据method设置默认值
      paramKey = paramKey || (ctx.method === 'GET' || ctx.method === 'DELETE' ? 'query' : 'body')
      const {res, data, message} = mod.toJsonAndValid(Module, ctx.request[paramKey])

      if(!res){
        ctx.body = {
          code: -1,
          message
        }
      } else {
        ctx.request[paramKey] = data
        return method.apply(this, arguments);
      }
  }
}

// 创建约束装饰器
const createConstraint = (funName, message, ...arg) => (target: any, propertyKey: string) => {
  if(!target.constraint){
    target.constraint = {}
  }

  if(!target.constraint[propertyKey]){
    target.constraint[propertyKey] = []
  }

  target.constraint[propertyKey].push({
    funName,
    arg,
    message
  })

}


// 约束装饰器
export const notNull = (message = undefined) => createConstraint('NotNull', message)
export const isNull = (message = undefined) => createConstraint('Null', message)
export const isNumber = (message = undefined) => createConstraint('isNumber', message)
export const assertTrue = (message = undefined) => createConstraint('AssertTrue', message)
export const assertFalse = (message = undefined) => createConstraint('AssertFalse', message)


export const min = (message = undefined, min) => createConstraint('Min', message, min)
export const max = (message = undefined, max) => createConstraint('Max', message, max)
export const size = (message = undefined, min, max) => createConstraint('Size', message, min, max)

export const pattern = (message = undefined, pattern) => createConstraint('Pattern', message, pattern)

