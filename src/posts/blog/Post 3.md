---
date: 2025-09-16
tags:
  - Deneigement
---

Code de tilemap procedural commence à ressembler à qqchose. Test in-game avec objects.
Prompt AI:

In my Godot 3d city game for desktop:
- I have a chunk system where each chunk is 64x64.
- In total in my world I will have around 32x32 chunks, so 1024 chunks.
- The ground is a tilemap, so 1024 tiles, and each tile is 16x16 pixels.
- The ground tilemap is generated procedurally, even though it doesn't change. It's just for development helping purposes.
- I also use the procedural tilemap generation to position "links" in world to 3D scenes I will instanciate at runtime. For example, when generating streets, I position traffic lights (not actual tiles, but I store a reference and save it as a resource in filesystem), that way I can later on instanciate the actual "traffic_light.tscn" scene at that position. I will call those "sub-scenes".
- There's no runtime chunk modification.

Problems I have with my current approach:
1. Sub-scenes scripts need to run at all time, even though their chunk is inactive.
2. I wonder if my approach is overkill. My world is not that big and I wonder if I even need that complex chunk scene saving logic. But I do need a chunk system anyway, that's for sure (for other features). Is saving 1024+ chunks scenes in filesystem a good approach? It feels wrong.

#### Option 1: Saving static scenes

- Run an editor (dev tool) script that divides the tilemap into 64x64 chunks. 
- For each chunk, create a new PackedScene that I save in filesystem and name it the corresponding chunk coords (ex: 4;-3.tscn).
- Create a new plane mesh (64x64) for chunk ground and add it to scene. Assign it my UV shader material that is responsible for rendering the chunk ground tilemap region. Assign to that shader the tileset.png (that is the same for each chunk ground), and generate the tiledata image (64x64) pixels that uses the red-channel pixel to store tiles atlas.
- Take those 3D scenes references and instanciate the corresponding sub-scene at position in chunk scene.
- Save the chunk scene in filesystem
- At runtime, since the game is soloplayer, I udpate visible chunks list only based on player position. I instanciate/delete chunk scenes.

	Pros
	- Static sub-scenes are pre-backed. Simple and performant to load/unload.
	- Only around 6 max chunks scenes are loaded at a time.
	Cons
	- Some sub-scenes scripts need to run at all time, even when their chunk is inactive.
	- It takes space in the filesystem to have 1024+ chunk scenes (and potentially more).
	- I won't ever be manually editing these scenes in the godot 3D viewport. Having fully editable scenes that I don't need feel dumb. But maybe them being editable is not taking more space.

#### Option 2: Runtime generation

- Render the ground as a single plane (so around 1024x1024 tiles of 16x16 pixels each). Use a UV mapping shader and render only visible area by the player.
- Or not! Maybe keep separate planes (64x64). Need to see.
- On chunk load/unload based on visibility, instanciate/delete sub-scenes.

	Pros
	- Filesystem is clean (no chunk scenes)
	Cons
	- Instanciating/deleting 10-20 sub scenes on chunk load/unload is more complex and could be problematic performance-wise.


#### Option 3: Fuck it, one scene to rule them all

- Render the ground as a single plane, and probably use the same srategy as option 2 (runtime generation)
- Use multimeshes to render same static sub-scenes accross world (because a lot of them will be the same, even though not in same chunk). Toggle sub-scene visibility based on chunk visibility.
- That means everything lives in one scene.

	Pros
	- Simplicity
	- Fixes the problem of sub-scenes that need permmanent scripting.
	- Can emplement off/on screen scripting to improve performance, such as bot and vehicle movement being heavely simplified. Also disabling off-screen physics.
	Cons
	- Massive memory usage. All 1024+ chunks always in memory.


---
gemini: https://gemini.google.com/app/511d86f94084832d
claude: https://claude.ai/chat/9b56c3c0-def2-4be5-8cc5-5969f3492f42
chatgpt: https://chatgpt.com/c/68c9544a-a330-832d-bc1b-33afc3531513

### The Hybrid Data-Driven Approach (Gemini): 

This approach focuses on keeping your world's **state** and **data** always in memory (since it's lightweight), while only instancing the **visuals** for chunks near the player.

##### The Core Idea: Separate Data from Representation

1. **The Data Layer (The "Blueprint"):** Instead of saving 1024 full `.tscn` files, your procedural generator should output a single, lightweight data resource. This file is your world's "source of truth." It would essentially be a dictionary where keys are chunk coordinates (e.g., `"4;-3"`) and values are arrays of sub-scene information for that chunk.
    
    - **Sub-scene Info:** Each item in the array would contain the path to the scene to instance (e.g., `"res://scenes/traffic_light.tscn"`), its position, rotation, and any unique ID.
        
    - **Benefit:** This single file is tiny compared to 1024 scene files and loads instantly at the start of the game. Your file system stays clean.
        
2. **The Logic Layer (Global Managers):** For sub-scenes whose scripts must always run (like a traffic light system), you create a global manager script. You would add this script as an **Autoload (Singleton)** in your project settings.
    
    - **Example: `TrafficManager.gd`:** This script would be responsible for managing the state of _all_ traffic lights in the entire city. It would run a timer and cycle through `RED`, `YELLOW`, `GREEN` states for various intersections. It operates purely on data and doesn't know or care if a specific 3D traffic light model is currently loaded in a chunk.
        
3. **The Visual Layer (On-Demand Chunks):** This is what your chunk loader does at runtime.
    
    - **On Chunk Load:** When a chunk needs to become visible, your `ChunkManager` does the following:
        
        1. Creates a new `Spatial` node to act as the chunk root.
            
        2. Generates the 64x64 ground mesh for that chunk and applies your UV shader.
            
        3. Looks up the chunk's coordinates in your **Data Layer resource**.
            
        4. Loops through the list of sub-scenes for that chunk and instances each one (`traffic_light.tscn`, etc.), parenting it to the chunk root.
            
        5. The script on the newly instanced sub-scene (e.g., `traffic_light.gd`) would, in its `_ready()` function, get a reference to the global `TrafficManager` and ask, "What is my current state?" The manager would reply, "You should be green," and the local script would then update its material to show the green light.
            
    - **On Chunk Unload:** Simply `queue_free()` the entire chunk root node. All the visual instances are destroyed, freeing up memory. The `TrafficManager` keeps running unaffected.
        

---

#### Why This Hybrid Approach Is Better

This model directly solves your main problems:

- **Solves "Always-On Scripts":** Global managers (Autoloads) handle the logic for the entire map, independent of which chunks are loaded. The scripts on the sub-scenes themselves become "dumb," only responsible for making themselves look correct based on the manager's state.
    
- **Solves "Overkill" and Filesystem Clutter:** You replace 1024+ `.tscn` files with a single, clean data file (`world_data.res`). This is far more manageable and efficient.
    
- **Performance:** You avoid the massive memory usage of "Option 3" by only loading visuals for nearby chunks. Instancing a few dozen simple scenes when a chunk loads is very fast in Godot and shouldn't cause noticeable stutter on a desktop, especially if you manage it over a couple of frames or with a thread (though that's likely unnecessary).
    
- **Flexibility:** If you ever decide to have dynamic world elements, this architecture is perfect. You would just modify the central data resource, and the world visuals would update accordingly next time a chunk is loaded.
    

In short, your chunk system isn't overkill, but your proposed implementation of saving every chunk as a packed scene is. By thinking of your world as **data** first and **visuals** second, you can create a system that is both efficient and scalable. 👍
