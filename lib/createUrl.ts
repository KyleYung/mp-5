"use server";

import type { URL } from "@/types";
import getCollection, { URL_COLLECTION } from "@/db";

export default async function createUrl(url: string, alias: string): Promise<{success: boolean; data?: URL; error?: string}> {

    const baseUrl = "https://mp-5-nine.vercel.app";

    const shortendUrl = `${baseUrl}/${alias}`;

    if (!url || url.trim() === "") {
        return { success: false, error: "ERROR: Please enter a URL" };
    }

    try {
        const parsed = new URL(url);

        if (!["http:", "https:"].includes(parsed.protocol)) {
            return { success: false, error: "ERROR: URL must start with http:// or https://" };
        }

    } catch {
        return { 
            success: false, error: "ERROR: Invalid URL Format" 
        };
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
            return {
                success: false, error: "ERROR: Unable to reach target site"
            };
        }

    } catch {
        return {
            success: false, error: "ERROR: Unable to reach target domain"
        };
    }

    const urlCollection = await getCollection(URL_COLLECTION);

    const existing = await urlCollection.findOne({ alias });

    if (existing) {
        return { success: false, error: "Alias already exists. Please choose a different one." };
    }

    const res = await urlCollection.insertOne({ url, alias, shortendUrl });

    if (!res.acknowledged) {
        return { success: false, error: "DB insert failed" };
    }

    return {
        success: true, data: { url, alias, shortendUrl, id: res.insertedId.toHexString() }
    };
}