import bcryptjs from "bcryptjs";


async function hash(password){
    const result = await bcryptjs.hash(password,10);
    return result;
}
async function compare(password,hash){
    const result = await bcryptjs.compare(password,hash)
    return result;
}

export {
    hash,
    compare
}