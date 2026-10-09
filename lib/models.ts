export const entityNames = ['tasks','categories','members'] as const;
export type Entity = typeof entityNames[number];
export function validEntity(s:string): s is Entity {return (entityNames as readonly string[]).includes(s)}
export function validate(entity:Entity, input:any): string | null {
 if(!input || typeof input !== 'object' || Array.isArray(input)) return 'Invalid body';
 if(entity==='tasks') {
  if(typeof input.title!=='string'||!input.title.trim())return 'Task title required';
  if(!['TODO','DOING','DONE'].includes(input.status))return 'Invalid task status';
  if(input.dueDate && input.startDate && input.dueDate<input.startDate)return 'Due date must not precede start date';
 } else if(typeof input.name!=='string'||!input.name.trim()) return 'Name required';
 return null;
}
export const fields:Record<Entity,string[]>={tasks:['title','description','categoryId','memberId','startDate','dueDate','completedDate','status'],categories:['name','color'],members:['name','email','role']};
export function clean(entity:Entity,body:any){const data:Record<string,any>={};for(const k of fields[entity])if(body[k]!==undefined)data[k]=body[k];return data;}
