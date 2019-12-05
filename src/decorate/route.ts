import * as glob from 'glob'
import { Middleware } from 'koa'
import * as KoaRouter from 'koa-router'
const router = new KoaRouter()


type LoadOptions = {

  /**
   * 扩展名
   */
  extname?: string;
}
// 映射请求
export const requestMapping = (base?: string): ClassDecorator => (
  target: any
) => {
  // 不传则为类名
  base = base || `/${target.name.toLocaleLowerCase()}`

  const maps = target.prototype.maps
  if (maps) {
    console.log(' ------ 生成路由 ------ ')
    Object.keys(maps).forEach(keys => {
      const { method, path } = maps[keys]
      console.log(`${method} ${base}/${path}`)
      router[method](`${base}/${path}`, target.prototype[keys])
    })
    console.log(' ---------------------- ')
  }
}

// 创建方法
const createMethod = method => (target, property) => {
  if (!target.maps) {
    target.maps = {}
  }
  target.maps[property] = {
    method,
    path: property.toLocaleLowerCase()
  }
}

// 创建方法映射
const createMethodMapping = method => path => (target, property) => {
  path = path || `/${property.toLocaleLowerCase()}`

  if (!target.maps) {
    target.maps = {}
  }
  target.maps[property] = {
    method,
    path
  }
}

export const get = createMethod('get')
export const post = createMethod('post')
export const put = createMethod('put')
export const del = createMethod('del')

export const getMapping = createMethodMapping('get')
export const postMapping = createMethodMapping('post')
export const putMapping = createMethodMapping('put')
export const delMapping = createMethodMapping('del')


// 加载路由
export const load = (folder:string, options?: LoadOptions): KoaRouter => {
  const extname = options && options.extname || '.{js,ts}'
  
  glob
    .sync(require('path').join(folder, `./**/*${extname}`))
    .forEach(item => {
      console.log(item)
      require(item)
    })
  return router
}