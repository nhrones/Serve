
import { serveFile } from "jsr:@std/http@^1.0.8";
import { getFullPath, openWebsite, port } from "./utils.ts";

// Start our server and handle all HTTP requests
Deno.serve({
   onListen() {}
   , port: port }, handler,)
async function handler (req: Request): Promise<Response> {
   // find the file -> get content -> return a response
   const resp = await serveFile(req, getFullPath (req))
   // we don't want to cache the response! See all changes immediately!
   resp.headers.append("Cache-Control", "no-store")
   return resp
}

// if we're not running Deploy, launch our local browser
if (!Deno.env.get("DENO_REGION")) openWebsite(`http://localhost:${port}`)
