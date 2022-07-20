# To Do

## Potential Tiles

- Quick links to your favorite websites
- Heart rate (pulled from a smart watch through a phone)
- Live location (same as above)
- Background is animated (boids?)
- Quote of the day
- Emails
- Large stock tile with a graph for performance

## To Do

- [] Come up with more large tile designs
  - [] One stock with a graph over time - large
  - [] Need another small tile idea
- [] Have some way to show a favorite link with an icon?
- [] Drag the tiles around
- [] Write up how to add a new tile type
- [] Write up how to change settings etc
- [] Change Spotify logo to be consistent with Reddit's
- [] fetch current song failed? 
- [] Put a bit in the tutoral about privacy and where the github is
- [] Should you use react-query to query NextJs?
- [] When you type the city in the siebar for weather, you need to click save to get it to go into the tile. I need to review how Weather tiles work with the in memory settings.

- [] Have a transparent bubble around the mouse that you can use as a flashlight to see the startpage behind the blurred filter when previewing??

### Notes

LONG TERM GOALS

- Tab's along the bottom for each theme (like an info theme, art theme etc) 
- Have a US stock one and an art tab / theme (maybe a bookmark manager tab)
- Have a premium version of the app - where you can add more tiles and move them around. You can get better feeds and iFrame's etc
- When you edit the positioning of the tiles, have a “wiggle state”. Similar to moving around apps on a mobile phone. 


### Tiles

- [] Reddit tile
  - [] Allow you to choose how many reddit posts to pull down (or infinite scrolling)
- [] Other tiles
  - [] RSS feed
  - [] Countdown to some event tile
- [] Quote tile
- [] add in a focus panel that blacks out for 120 seconds (somehow have a reference in there to a study before you click 'go'), it should be a circular progress thing
- [] the search bar could be a cute little moonscape where the day progresses (think snoopy moonphase watch)?? Maybe just a line that progresses across the screen for how many horus there are in a day
- [] add a chime when the timer is done

### Settings / Themes

- [] Field to change color of all text
- [] Fix defaults with the custom themes
- [] Field to change three primary colors (which will change the tiles to the defaults)
- [] instead of editing things like the subreddit direct on the tile, it *could* open up the settings sidebar to the option to edit highlighted
- [] allow a background image to a URL

### General

- [] fix the loading flicker for the theme (background should be done SS)
- [] Move over state management to Recoil (:O)
- [] In Windows the select is impossible to read in dark mode (because of Chakrui changing the theme in the CSS)
- [] In Windows fix input color's on stock and city tiles when you're focusing, the background goes white
- [] Have the spotify tile change background depending on album? (Probably would need to be a setting in the sidebar, could change the background of all tiles??)
- [] I need to wrap each tile with an error boundary, that way if any of them error they don't wack out the whole program
- [] I need to wrap the whole program in an error boundary that will tell the user to clear their local settings if things are in a pickle (maybe have a huge pickle svg above the error message lol)
- [] None of the Tile's should be using "inMemorySettings", as it means those tiles need to be re-rendered when anything changes. I should lift that state up to the TileContainer.
