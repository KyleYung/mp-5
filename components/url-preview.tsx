import { URL } from "@/types";
import { Button } from "@mui/material";

export default function UrlPreview({post}: {post:URL}){
    return (
        <div className ="bg-blue-300 text-center w-full max-w-md p-6 m-4">
            <h2 className="font-bold text-xl mb-2 text-black">URL Successfully Created!</h2>
                <p className="text-black mb-4"> {post.shortendUrl} </p>
                <a href={`/${post.alias}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="contained">Visit</Button>
                </a>      
        </div>

    );
} 