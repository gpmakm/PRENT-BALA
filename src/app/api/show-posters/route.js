import Templates from '../models/Schema';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

if(!mongoose.connection.readyState){
    mongoose.connect("mongodb://localhost:27017/Card_Templates").then(()=>{
        console.log("Connected to database");
        
    }).catch((e)=>{
        console.log(`Error is ${e}`);
        
    })
}


export async function GET(req) {
    const searchParams=new URL(req.url).searchParams;
    const page=searchParams.get("page")||"1";
    const limit=10;



    try {
        const templates=await Templates.find({cardType:"Poster"}).skip((page-1)*limit).limit(limit);
        return NextResponse.json({templates})
    } catch (error) {
        console.log(`Error is ${error}`);
        
    }
}