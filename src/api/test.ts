import { Context } from 'koa'
import { get, getMapping, requestMapping, postMapping } from '../decorate/route'

import TestTo from '../module/testTo'
import { validate } from '../decorate/validate'
const testData = [
  { name: '111', age: 1 },
  { name: '111', age: 1 }
]

@requestMapping('/test')
export default class Test {

  @get
  @validate(TestTo)
  public list(ctx: Context) {
    ctx.body = { code: 0, data: testData, form: 'list', query: ctx.query }
  }

  @postMapping('list')
  @validate(TestTo, 'body')
  public add(ctx: Context) {
    ctx.body = { code: 0, data: testData, form: 'test222', query: ctx.query }
  }
}
