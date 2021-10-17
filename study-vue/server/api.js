// npm i express
const express = require('express');
// 创建下实例
const app = express();

app.get('/api/course',(req,res)=>{
    setTimeout(()=>{
        res.json([{ name: 'web全栈',price: '8999' }, { name: 'web高级',price:8999 }])
    },1000)
})

app.listen(3000);
