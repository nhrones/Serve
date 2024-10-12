
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { serveFile } from "https://deno.land/std@0.224.0/http/file_server.ts";

const folderArg = Deno.args[0]
const portArg = Deno.args[1]
const folder = (folderArg) ? folderArg : ""
const port = (portArg) ? parseInt(portArg) : 80

// Start the server -> routes all requests to the handler below
Deno.serve({ port: port }, handleRequest )

// Handle all HTTP requests
async function handleRequest(request: Request): Promise<Response> {

   // Get and adjust the requested path name
   let { pathname } = new URL(request.url);
   if (pathname === '/') pathname = '/index.html';

   // build requested full-path
   const fullPath = (folder.length > 1)
      ? join(Deno.cwd() + '\\' + folder + pathname)
      : join(Deno.cwd() + pathname);

   console.log(`Serving ${fullPath}`);
   
   // find the file -> get the content -> return it in a response
   const resp = await serveFile(request, fullPath)
   resp.headers.append("Cache-Control", "no-store")
   return resp  
}

const OnDeploy = !!Deno.env.get("DENO_REGION")

// launch the browser
if (!OnDeploy) { 
   const command = new Deno.Command( "explorer.exe", {
      args: [ `http://localhost:${port}` ],
      stdin: "piped",
      stdout: "piped",
   });
   command.spawn();
}
