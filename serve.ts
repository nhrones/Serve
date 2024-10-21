
import { serveFile } from "jsr:@std/http@^1.0.8";
import { launchBrowser, getFullPath, port } from "./utils.ts";

// Start our server and handle all HTTP requests
Deno.serve(
   {onListen() {}, port: port },  
   async (req: Request): Promise<Response> => {
   // find the file -> get content -> return a response
   const resp = await serveFile(req, getFullPath(req))
   // we don't want to cache the response! See all changes immediately!
   resp.headers.append("Cache-Control", "no-store")
   return resp
})

//launch our local browser
launchBrowser()