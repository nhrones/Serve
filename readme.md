
# Simple Deno Dev-Server Example

Used as a dev tool for running static html sites.     

This simple html server will serve an index.html file and any requests that it generates (style.css, app.js, ...).

## Usage
First, install by running:
```
deno install --global -Af serve.ts
```
This will install it in the .deno folder.
### Usage:
You can then simply type `serve` on the commandline in a folder with an index.html file.

Use command line args to serve from a folder and/or from a port:
If the first arg is a number, it will be used as a port number and will serve the root folder using that port.

If the first arg is a string, then this will indicate the folder to be served.
Note that any second arg should only be a number and will be used as the port.

```bash
$ serve // serves the root folder 
$ serve 8080 // serves the root folder using port 8080 
$ serve dist // serves the ./dist/ folder
$ serve dist 3000 // serve the ./dist/ folder using port 3000 
```