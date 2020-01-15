export interface MovieDetail{
    name?: string;
    movieId: number;
    language?:any;
    overview?:string;
    tagLine?: string;
    rating?:number;
    releaseDate?: any;
    imagePath: string;
    runtime?:number;
    images?:string[];
    categories?: string[]
}