import getCollection, {URL_COLLECTION} from "@/db";
import {URL} from "@/types";

export default async function getURL() : Promise< URL[] > {
    const postsCollection = await getCollection(URL_COLLECTION);

    const data = await postsCollection.find().toArray();

    const posts: URL[] = data.map ((p) => ({
        id: p._id.toHexString(),
        url: p.url,
        alias: p.alias,
        shortendUrl: p.shortendUrl,
    }));
    
    return posts.reverse();
}