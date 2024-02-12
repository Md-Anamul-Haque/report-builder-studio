export const getCodeToValue=(data:any,code_of_getCodeToValue:string,i:number):string=>{
    try {
        data=data&&Array.isArray(data)?data?.[i]:data;
        if(!data&&!code_of_getCodeToValue)return'';
        let resultOfCode;
        if(code_of_getCodeToValue.match(/\breturn\b/g)){
         resultOfCode= eval(`(()=>{${code_of_getCodeToValue}})()`);
    }else{
        resultOfCode= eval(code_of_getCodeToValue);
    }
console.log(resultOfCode);

if (typeof resultOfCode=='string') {
    return(resultOfCode)
} else {
    return(JSON.stringify(resultOfCode))
}
    } catch (error:any) {
        // alert(error?.message)
        console.log(error);
        return ''
    }
}
