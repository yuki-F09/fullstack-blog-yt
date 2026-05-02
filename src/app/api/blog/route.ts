import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

//ブログの全記事取得用

export async function main (){
  try{
    await prisma.$connect();
  }catch (err){
    return Error("dbの接続に失敗しました");
  }
}

export const GET = async (req:Request, res:NextResponse)=>{
  try{
    await main();
    const posts = await prisma.post.findMany();
    return NextResponse.json({message: "success", posts}, {status:200})

  } catch(err){
    return NextResponse.json({message:"Error", err}, {status:500})

  } finally{
    // 成功しても失敗してもprismaから接続を外す
    await prisma.$disconnect();
  }
};


// ブログ投稿用
export const POST = async (req:Request, res:NextResponse)=>{
  try{
    const {title, description} = await req.json();
    await main();
    const post = await prisma.post.create({data:{title, description}})
    return NextResponse.json({message: "post success", post}, {status:201})

  } catch(err){
    return NextResponse.json({message:"Error", err}, {status:500})

  } finally{
    // 成功しても失敗してもprismaから接続を外す
    await prisma.$disconnect();
  }
};