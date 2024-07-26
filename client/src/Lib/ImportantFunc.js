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

export const calculateDistance=(lat1, lon1, lat2, lon2)=> {
    const R = 6371; // Earth's radius in kilometers

    const degToRad = (deg) => (deg * Math.PI) / 180;
    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
}
export const ShortListData = (shortlist, data) => {
    const array =[]
    console.log(shortlist,data);
    if (!Array.isArray(shortlist)) {
        return array;
    }

    if (!Array.isArray(data)) {
        return array;
    }

    const shortlistSet = new Set(shortlist); 
    return data.filter(item => shortlistSet.has(item._id)); 
};
