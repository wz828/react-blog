const fs = require('fs-extra')
const Koa = require('koa');
const serve = require('koa-static');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');

const getList = require('./functions/getList').getList
const getCertain = require('./functions/getList').getCertain

const config = require('./config')
const Mail = require('./functions/mail');

router.get('/', async (ctx, next) => {
    ctx.body = `
            hello koa
        `
});

router.get('/list', (ctx, next) => {
    ctx.body = JSON.stringify(getList());
})

router.get('/post', (ctx, next) => {
    ctx.body = getCertain(ctx.request.query.pathName);
})

router.post('/mail', async (ctx, next) => {
    console.log("ctx.request.body:",ctx.request.body);
    let mymail = new Mail()
    let result = await mymail.mail({
        target: config.mail,
        content:ctx.request.body.info
    })
    if(result) {
        ctx.body = JSON.stringify({
            success: true
        });
    } else {
        ctx.body = JSON.stringify({
            success: false
        });
    }
})

app
    .use(serve('blog/imgs'))
    .use(bodyParser())
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods());

console.log('Begin Listening...');

app.listen(config.port);
