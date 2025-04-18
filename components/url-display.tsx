"use client";

import UrlPreview from "./url-preview";
import UrlForm from "./url-form";
import { useState } from "react";
import { URL } from "@/types";

export default function UrlDisplay() {
    const [post, setPost] = useState <URL| null> (null);

    function append(newPost : URL){
        setPost(newPost);
    }

    return (
        <div className = "flex flex-col items-center">
            <UrlForm append={append} />
            {post && <UrlPreview key={post.id} post={post} />}   
        </div>
    );
}