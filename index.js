import express from "express"
import {createRequire} from 'module'
import fs from "fs"

const require = createRequire(import.meta.url);
let bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port =process.env.PORT || 4000;
const users = require('./MOCK_DATA.json');


app.use(express.urlencoded({extended:false}));
app.use(express.json());
// Routes
app.get('/api/users', (req,res)=>{
    return res.json(users);
})

app.route('/api/users/:id')
.get((req,res)=>{
    const id= Number(req.params.id);
    const banda = users.find((user) => user.id === id);
    return res.send(`<h1>${banda.Name}</h1>`);
}).delete((req,res)=>{
    return res.json({status:"pending"});
}).patch((req,res)=>{
    return res.json({status:"pending"});
});


app.get('/users', (req,res)=>{
    const HTML = `<ul>
    ${users.map((user) => 
        `<li>${user.Name}</li>`
    ).join('')}
    </ul>`;
    res.send(HTML);
})
// Post request
app.post('/api/users',(req,res)=>{
    
const info = req.body;
console.log(info);
let len = users.length+1;
users.push({ ...info, id:len});
fs.writeFile('./MOCK_DATA.json', JSON.stringify(users),(err,data)=>{
    if(err)
    {
        console.error(err);
        return res.status(500).json({status:'error'});
    }
    return res.json({status:'pending'});
})
return res.json({status:"pending"});

});


app.listen(port,()=>{
    console.log(`Listening`);
})

