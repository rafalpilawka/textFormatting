console.log("asbdkjbvjksd")

const makeAdjectifier=(adjective)=>{
return (string)=>{return adjective + ' ' + string }
}
const  coolifier= makeAdjectifier("cool")
console.log(coolifier("conferance")); 