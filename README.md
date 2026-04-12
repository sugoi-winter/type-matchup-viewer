# Type Matchup Viewer

An interactive, browser-based Pokémon type matchup viewer with full single and dual-type support, advanced filtering, and a clean UI. 

I was having a hard time understanding type matchups, so I made a tool that does it for 
you.

## Live Demo

Visit the live site here:

**https://sugoi-winter.github.io/type-matchup-viewer/**

## Features

- Full outgoing damage tables for all 18 Pokémon types  
- Automatic generation of all 153 dual-type combinations  
- Real-time search with:
  - Partial matches (`fly` → Flying, Dragon/Flying, etc.)
  - Multiple terms (`fire, steel`)
  - Negative terms (`!rock`)
  - Dual-type matching in any order (`fairy/flying` matches `Flying/Fairy`)
  - Space-friendly input (`dragon / steel`)
- Color-coded effectiveness values
- Lightweight, fast, and framework-free

## Project Structure

.gitignore 
index.html app.js damage.js styles.css 
Outgoing/ 
	normal-out.json fire-out.json ... fairy-out.json
package.json README.md LICENSE

## Running Locally

If you want to run the project on your own machine, serve the `public/` folder with any simple HTTP server.

Example using Python:
python -m http.server 8000


Then open:
http://localhost:8000


## Hosting on GitHub Pages

1. Push this repository to GitHub.  
2. Go to **Settings → Pages**.  
3. Set the source to the `main` branch and the `/public` folder.  
4. Save.  
5. GitHub Pages will publish your site automatically.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Author

Created by **Vellis**.
