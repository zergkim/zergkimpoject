const express = require('express')
const fs = require('fs/promises');

const path = require('path')
const app = express();
app.use(express.json());
app.use(express.text());
app.use("/static",express.static("./static"))
app.use("/static", (req,res)=>{
    console.log(path.join(__dirname,"view"))
    res.sendFile("index.html",{root:path.join(__dirname,"view")})
})
app.use("/main",async(req,res)=>{
    //res.end("Dfdf")
    console.log(req.query)
    let paths = await fs.readdir(`./static${req.url}`)
    let narr=[]
    for(let v of paths){
        let d = await fs.lstat(path.join("./static",req.url,v))
        
        narr.push({main : path.join("/static",req.url,v),directory: d.isDirectory(),size:d.size})
    }
    console.log(paths,narr)
    res.json(narr)
})

app.listen(80,()=>{
    console.log("허접하냐 ㅋ")
})
"SDsff"
"WEFw"
"Sfdsf"