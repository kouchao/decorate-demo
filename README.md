## 验证装饰器

> 本着学习使我快乐的原则，我造轮子了。。 <br>验证装饰器 JSR-303 语法<br>路由装饰器 参考 spring 的用法

## 路由装饰器

### 将这个类作为请求映射
- @requestMapping(path) 参数是你设定的路径 不传则为类名的小写

### 根据被装饰的方法名为路径
- @get
- @post
- @put
- @del

### 映射方法为一个指定路径
参数是你设定的路径 不传则为方法名的小写
- @getMapping(path)
- @postMapping(path)
- @putMapping(path)
- @delMapping(path)

### 示例
```
@requestMapping('/test')
export default class Test {

  @get
  public list(ctx: Context) {
    ...
  }

  @postMapping('list')
  public add(ctx: Context) {
    ...
  }

  @putMapping()
  public update(ctx: Context) {
    ...
  }
}

```

## 验证装饰器

### 验证
- @validate(Mod, method) 参数1是一个模型 参数2是一个方法  post 或者 get

### Mod 模型示例
> 必须继承Module，在字段上添加约束
```
export default class TestTo extends Module {
 
  @notNull('name不能为空')
  name

  @isNumber('number必须是数字')
  number
}
```

### 约束
> 具体文档请参照/src/utils/constraint,当message为空时默认 `${key} 不符合约束 ${funName}`
- notNull(message)
- isNull(message)
- isNumber(message)
- assertTrue(message)
- assertFalse(message)
- min(message, min)
- max(message, max)
- max(message, max)
- size(message, min, max)
- pattern(message, pattern)

