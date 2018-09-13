const app = require('./app.js');
// const app1 = require('./app1.js');

const server =app.listen('3000','192.168.95.252',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('start');
});

// const server1 =app1.listen('8080','192.168.95.252',(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log('start1');
// });

