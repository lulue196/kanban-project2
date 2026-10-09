import {NextRequest,NextResponse} from 'next/server';
import {db} from '../../../lib/db';
import {validEntity,validate,clean} from '../../../lib/models';
export const runtime='nodejs';
export async function GET(_req:NextRequest,{params}:{params:Promise<{entity:string}>}){
 try{const {entity}=await params;if(!validEntity(entity))return NextResponse.json({error:'Unknown entity'},{status:404});const items=await (await db()).collection(entity).find().sort({createdAt:-1}).toArray();return NextResponse.json(items)}catch(e){return NextResponse.json({error:'Database unavailable'},{status:500})}
}
export async function POST(req:NextRequest,{params}:{params:Promise<{entity:string}>}){
 try{const {entity}=await params;if(!validEntity(entity))return NextResponse.json({error:'Unknown entity'},{status:404});const body=await req.json();const error=validate(entity,body);if(error)return NextResponse.json({error},{status:400});const data={...clean(entity,body),createdAt:new Date(),updatedAt:new Date()};const result=await (await db()).collection(entity).insertOne(data);return NextResponse.json({...data,_id:result.insertedId},{status:201})}catch(e){return NextResponse.json({error:'Cannot create item'},{status:500})}
}
