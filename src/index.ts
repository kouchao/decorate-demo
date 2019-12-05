import * as Koa from 'koa'
import * as koaBody from 'koa-body'
import { load } from './decorate/route'
import {resolve} from 'path'

const app = new Koa()

app.use(
  koaBody({
    multipart: true
  })
)

app.use(load(resolve(__dirname, './api')).routes())

app.listen(3000, () => {
  console.log('启动服务 http://localhost:3000')
})
