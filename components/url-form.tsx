"use client";

import {useState} from "react";
import createUrl from "@/lib/createUrl";
import { URL } from "@/types";
import {Button, TextField}from "@mui/material";
import {Textarea} from "@mui/joy";

export default function UrlForm({append}: {append: (post: URL) => void}) {
    const [url, setUrl] = useState("");

    const [alias, setAlias] = useState("");

    const [err, setError] = useState("");

    return (
        <>
            <form className="flex flex-col items-center" onSubmit={async (e) => {
                e.preventDefault();

                setError("");
        
                const result = await createUrl(url, alias);
        
                if (!result.success) {
                    setError(result.error || "Something went wrong.");
                    return;
                }
        
                if (result.data) {
                    append(result.data);
                }

                }}>

                <TextField className="w-[600px] bg-white border rounded-lg" variant="filled" label="URL" value={url} onChange={(e) => setUrl(e.target.value)} required/>
                <Textarea className="w-[600px] mt-5 " placeholder="Alias" value={alias} onChange={(e) => setAlias(e.target.value)} required />

                <div className="flex flex-col items-center p-5">
                    <Button className="w-full" type="submit" variant="contained"><strong>SHORTEN</strong></Button>
                    {err && (<div className="text-center text-red-600 m-5">{err}</div>)}
                </div>
            </form>
        </>
    );
}