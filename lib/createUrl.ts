"use server";

import getCollection, { URL_COLLECTION } from "@/db";
import type { URL } from "@/types";

export default async function createUrl(url: string, alias: string): Promise<URL> {

    const baseUrl = "http://localhost:3000";
    const shortendUrl = `${baseUrl}/${alias}`;

    const p = {
        url: url,
        alias: alias,
        shortendUrl: shortendUrl,
    };

    if (!url || url.trim() === "") {
        throw new Error("ERROR: URL is required.");
    }

    try {
        const parsed = new URL(url);

        if (!["http:", "https:"].includes(parsed.protocol)) {
            throw new Error("ERROR: URL must start with http:// or https://");
        }

    } catch (e) {
        console.error("[createUrl] Invalid URL:", e);
        
        throw new Error("ERROR: Invalid URL Format");
    }

    try {
        const response = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
            headers: {
              "User-Agent": "Mozilla/5.0"
            }
        });
          
        if (!response.ok) {
            console.warn("[createUrl] Target responded with:", response.status);

            throw new Error("ERROR: Target site is unreachable");
        }

    } catch (e) {
        console.error("[createUrl] Fetch failed:", e);

        throw new Error("ERROR: Couldn't reach target domain");
    }

    const urlCollection = await getCollection(URL_COLLECTION);

    const existing = await urlCollection.findOne({alias});

    if (existing) {
        throw new Error("ERROR: Alias already exists");
    }

    const res = await urlCollection.insertOne({...p});

    if (!res.acknowledged) {
        throw new Error("DB insert failed");
    }

    return { ...p, id: res.insertedId.toHexString() };
}