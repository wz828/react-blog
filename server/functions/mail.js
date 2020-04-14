'use strict';

const nodemailer = require('nodemailer');
class Mail {
    constructor(){
        this.transporter = nodemailer.createTransport({
            // host: 'smtp.ethereal.email',
            service: 'QQ', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            // service: '163', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            port: 465, // SMTP 端口
            secureConnection: true, // 使用了 SSL
            auth: {
                user: 'reactlearn@qq.com',
                pass: 'yhlunirtlkotdhfb',
            }
        });
    }

    mail(opts){
        return new Promise((rs,rj)=>{
            console.log('opts:', opts)
            let mailOptions = {
                from: 'reactlearn <reactlearn@qq.com>', // sender address
                to: opts.target, // list of receivers
                subject: '来自博客的邮件', // Subject line
                text: `博客留言通知邮件`, // plaintext body
                html: `<p>这是一封来自react课程团队的邮件，有人给您的博客留言：</p>
                       <p>昵称：${opts.content.nickname}</p> 
                       <p>来自：${opts.content.mail}</p> 
                       <p>标题：${opts.content.title}</p> 
                       <p>内容：${opts.content.detail}</p> 
                ` // html body
            };

            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    // return console.log(error);
                    rj()
                    // 也可以把return console.log(error);写这里，总之rj()之后就要结束，否则会崩溃导致进程结束
                }else{
                    console.log('Message sent: %s', info.messageId);
                    rs(info.messageId)
                }
            });
        })
    }
}

// let mymail = new Mail()
// mymail.mail({
//     target:'onlythen@yeah.net'
// })

module.exports = Mail;