
export const DEV = true;
export let folder = "";
export let port = 80;

// get command line args to set folder and port
if (Deno.args.length == 2) {
   folder = Deno.args[0]
   port = parseInt(Deno.args[1])

} else if (Deno.args.length == 1) {

   if (parseInt(Deno.args[0]) > 0) {
      port = parseInt(Deno.args[0])

   } else {
      folder = Deno.args[0]
   }
}

// get the full path for this request
export function getFullPath (request: Request): string {
      // Get and adjust the requested path name
      let { pathname } = new URL(request.url);
      if (pathname === '/') pathname = '/index.html';
   
      // build requested full-path
      const fullPath = (folder.length > 1)
         ? `./${folder}${pathname}`
         : `./${pathname}`
   
      if (DEV) console.log(`Serving ${fullPath}`);
   return fullPath
}

/**
 * Get a browser open command based on the OS
 * @returns an appropriate string for the command to be spawned
 */
export async function getBrowserCmd(): Promise<string> {
   switch (Deno.build.os) {
      case "windows":
         return "explorer.exe";
      case "darwin":
         return "open";
      case "linux":
         if (
            (await Deno.permissions.query({ name: "env" })) 
            && Deno.env.get("WSL_DISTRO_NAME")
         ) {
            // is WSL
            return "explorer.exe";
         } else {
            return "xdg-open";
         }
      default:
         return "Unknown os" 
    }
}

/**
 * Opens a website in the default browser (any OS)
 * @param url  - the url to be opened in the browser
 * @example await openWebsite('https://Deno.com:8080')
 */
export async function openWebsite(url: string) {
   return new Deno.Command(await getBrowserCmd(), 
   { args: [url] }).outputSync();
}

/** 
 * launch the default browser (Windows only)  
 */
export function launchBrowser() {
   if (!Deno.env.get("DENO_REGION")) { // not in Deploy
      // Windows only command
      new Deno.Command("cmd", { args: ["/C", "start", `http://localhost:${port}`] })
         .outputSync()
   }
}