import {NextRequest,NextResponse} from 'next/server';
import {ObjectId} from 'mongodb';
import {db} from '../../../../lib/db';
import {validEntity,validate,clean} from '../../../../lib/models';
export const runtime='nodejs';
type Ctx={params:Promise<{entity:string,id:string}>};
async function parse(ctx:Ctx){const {entity,id}=await ctx.params;return validEntity(entity)&&ObjectId.isValid(id)?{entity,id:new ObjectId(id)}:null}
export async function GET(_req:NextRequest,ctx:Ctx){try{const p=await parse(ctx);if(!p)return NextResponse.json({error:'Invalid resource'},{status:404});const doc=await(await db()).collection(p.entity).findOne({_id:p.id});return doc?NextResponse.json(doc):NextResponse.json({error:'Not found'},{status:404})}catch{return NextResponse.json({error:'Database unavailable'},{status:500})}}
export async function PUT(req:NextRequest,ctx:Ctx){try{const p=await parse(ctx);if(!p)return NextResponse.json({error:'Invalid resource'},{status:404});const body=await req.json();const error=validate(p.entity,body);if(error)return NextResponse.json({error},{status:400});const result=await(await db()).collection(p.entity).findOneAndUpdate({_id:p.id},{$set:{...clean(p.entity,body),updatedAt:new Date()}},{returnDocument:'after'});return result?NextResponse.json(result):NextResponse.json({error:'Not found'},{status:404})}catch{return NextResponse.json({error:'Update failed'},{status:500})}}
export async function DELETE(_req:NextRequest,ctx:Ctx){try{const p=await parse(ctx);if(!p)return NextResponse.json({error:'Invalid resource'},{status:404});const result=await(await db()).collection(p.entity).deleteOne({_id:p.id});return NextResponse.json({deleted:result.deletedCount===1},{status:result.deletedCount?200:404})}catch{return NextResponse.json({error:'Delete failed'},{status:500})}}
