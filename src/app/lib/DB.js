import { connect } from "mongoose";

const mongoURL = process.env.MONGODB_URL;

if(!mongoURL){
    console.log("Mongo DB URL not Found");
}

let cache = global.mongoose
if(!cache)
{
    cache = global.mongoose = { conn:null, Promise:null}
}

export const connectDB = async () =>{
    if(cache.conn)
    {
        return cache.conn;
    }

    if(!cache.Promise){
        cache.Promise = connect(mongoURL).then((c)=>{c.connection})
    }
    
    try {
        cache.conn = await cache.Promise;
   } catch (error) {
    console.log(error)        
    }
    return cache.conn;
}

