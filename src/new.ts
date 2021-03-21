function string(j){
    let c = j.match(/\"[a-zA-Z가-힣0-9]+\"/)
    if(c) return j.match(/[a-zA-Z가-힣0-9]+/g)[0];
    else return false;
}
function obj(name, thing){
    if(thing[0]=='"')thing = thing.split('"').join("");
    else if(thing === "false")thing = false;
    else if (thing ==="true")thing = true;
    else if(thing ==="NaN")thing = NaN;
    else if (thing === "null")thing = null;
    else if (thing[0] =="{"||thing[0] =="[")thing =parse(thing);    
    else if(thing.match(/[0-9]+\.?[0-9]+/)==thing)thing = Number(thing.match(/[0-9]+\.?[0-9]+/));
    else thing = undefined;
    name = name.slice(1,name.length-1)
    return [name,thing]
}

function arr_parse(){
    return false;
}
function parse (e){
    let braket_compiler=1;
    for(let i=0;i<e.length;i++){
        if(e[i]=="{") braket_compiler*=2;
        else if(e[i]=="[")braket_compiler*=3;
        else if(e[i]=="}")braket_compiler/=2;
        else if (e[i]=="]")braket_compiler/=3;
        if(braket_compiler!==Math.floor(braket_compiler)){
            braket_compiler=false;
            break;
        }
    }
    if(!braket_compiler)return braket_compiler;
    e = e.trim()
    if(e[0]=="[")return arr_parse(e);
    else e = e.slice(1,e.length-1);
    let d ={}
    d.obj = e.match(/"[a-zA-Z0-9]+"[:]\{.*\}/g)
    if(d.obj){
        d.obj.forEach(v=>{
            let ind = e.search(v)
            let are =[];
            are.push(e.slice(0,ind))
            are.push(e.slice(ind+v.length))
            e = are.join("")
        })
    }
    d.other = e.match(/"[a-zA-Z0-9]+"[:][0-9a-zA-Z]+/g)
    d.text = e.match(/"[a-zA-Z0-9]+"[:]".+"/g)
    let oe = {};
    let arr=[]
    if(d.text){
        d.text.forEach(v=>{
            v = v.split(":")
            arr.push([v[0],v[1]])
        })
    }
    if(d.obj){
        d.obj.forEach(v=>{
            let idx = v.indexOf(":");
            let arer=[];
            arer.push(v.slice(0,idx))
            arer.push(v.slice(idx+1))
            arr.push(arer)
        })
    }
    if(d.other){
        d.other.forEach(v=>{
            v = v.split(":")
            arr.push([v[0],v[1]])
        })
    }
    
    arr.forEach(v=>{
        let dj =obj(v[0],v[1])
        console.log(dj)
        oe[dj[0]]=dj[1]
    })
    return oe
}
const banbok=(e)=>{
    const regex = /([a-zA-Z]+?)\1+/g
    return e.match(regex)
}
//parse('{"dfdf":165645,"dfdfd":"8989"}')
let df = {od :NaN,df:"dfdf",fwefwf:{fwe:55,fwfef:{dfdf:"weff",wfewfwf:{wefwf:{efefe:{wefwf:{dfdef:88,dfdf:99}}}}}}}
console.log('결과!!!!:',parse(JSON.stringify(df)).fwefwf.fwfef.wfewfwf.wefwf.efefe)