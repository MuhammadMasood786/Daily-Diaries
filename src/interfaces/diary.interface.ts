export interface Diary {
    id?:string;
    title:string;
    typeof:'private'| 'public';
    content:string;
    createdAt?:string;
    updatedAt?:string;
    userId?:string;
    entryIds:string[] | null
}