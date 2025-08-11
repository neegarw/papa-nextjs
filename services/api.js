import axios from 'axios';

async function getCategory() {
    const res = await axios.get("https://papa-johns-data.vercel.app/category")
    return res.data
}
async function getPapadias() {
    const res = await axios.get("https://papa-johns-data.vercel.app/papadias")
    console.log(res);
    return res.data
}
async function getPizza() {
    const res = await axios.get("https://papa-johns-data.vercel.app/pizza")
    console.log(res);
    return res.data
}
async function getQalyanaltilar() {
    const res = await axios.get("https://papa-johns-data.vercel.app/qalyanaltilar")
    console.log(res);
    return res.data
}
async function getSalat() {
    const res = await axios.get("https://papa-johns-data.vercel.app/salat")
    console.log(res);
    return res.data
}
async function getPasta() {
    const res = await axios.get("https://papa-johns-data.vercel.app/pasta")
    console.log(res);
    return res.data
}
async function getSouses() {
    const res = await axios.get("https://papa-johns-data.vercel.app/souses")
    console.log(res);
    return res.data
}
async function getIcki() {
    const res = await axios.get("https://papa-johns-data.vercel.app/icki")
    console.log(res);
    return res.data
}
async function getDesertlar() {
    const res = await axios.get("https://papa-johns-data.vercel.app/desertlar")
    console.log(res);
    return res.data
}
export{
    getCategory, getPapadias, getPizza,
    getQalyanaltilar, getSalat, 
    getPasta, getSouses, 
    getIcki, getDesertlar
}