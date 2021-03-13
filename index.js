const exrpess = require('express')
const app = exrpess();
app.use("/static",exrpess.static("./static"))

app.listen(3000,()=>{
    console.log("허접하냐 ㅋ")
})