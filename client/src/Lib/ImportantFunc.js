export const numTowords=(num)=>{
    if(Math.floor(num/10000000)==num/10000000&&num!=0){
        return `${num/10000000} Cr`;
    }
    else if(Math.floor(num/100000)==num/100000 && num<9999999){
        return `${num/100000} Lakhs`;
    }
    else if(Math.floor(num/1000)==num/1000 && num<99999){
        return `${num/1000} Thousand`;
    }
    else{
        const numberToDisplay = new Intl.NumberFormat().format(num);
        return numberToDisplay;
    }
}
export const numFormat =(num)=>{
    const numberToDisplay = new Intl.NumberFormat().format(num);
    return numberToDisplay;
}