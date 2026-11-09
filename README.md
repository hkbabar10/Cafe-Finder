# StudyCafe — OpenStreetMap edition

Run python3 -m http.server 8000 in this folder and open http://localhost:8000.
Click Use my location and allow location access. No API key or billing account is required.
Try demo works with fictional places. The slider controls 1–10 km.
Live searches run on button click. Filters apply locally. Search requests have a
15-second cooldown and identical searches reuse results in memory for five minutes.

## Install or update
Replace the application files, including config.js, and include ui.js and the assets folder.
For GitHub Pages upload the files inside this folder to the repository root.
Select Settings → Pages → Deploy from a branch → main → / (root).
Use the HTTPS address shown by GitHub. Location needs HTTPS or localhost.

## Services and limits
Leaflet 1.9.4 displays OpenStreetMap standard tiles. Overpass retrieves cafes and restaurants.
Results are sorted by straight-line distance. OSM coverage varies. Google ratings
and review counts are unavailable. Internet access is shown only when recorded in OSM.
Noise, outlets and study suitability are unverified.
Coordinates are sent to Overpass on search; tile requests reveal the viewed area
to OpenStreetMap. Results are cached only in page memory.

Public services are best-effort and can throttle or block traffic. This is suitable
for modest portfolio usage, not an unlimited traffic guarantee. Keep attribution,
normal browser caching and referrers. No tile prefetching or bulk downloads.
For growing traffic choose another provider or host services, which may cost money.
Update endpoint settings in config.js when changing providers.
Policies:
https://operations.osmfoundation.org/policies/tiles/
https://dev.overpass-api.de/overpass-doc/en/preface/commons.html

## Design update

Warm cream and espresso surfaces, amber actions, sage study tags and teal highlights.
DM Sans and Fraunces load from Google Fonts with system fallbacks. All palette values
are CSS tokens. Dark mode follows the device preference until toggled, then saves
the selection locally. Text uses darker/lighter companions to the supplied accents
where required for contrast. Amber actions use espresso text.

New presentation-only features:
- 1–10 km search slider and prominent location action
- Card and pin hover/focus synchronization
- Split, list and map views
- Favorites stored as place IDs in localStorage (session fallback if unavailable)
- Saved-only filter applies to the current results, not all previously saved locations
- Wi-Fi filtering uses existing internet_access=wlan data
- All six filters use locally saved study notes; Wi-Fi also uses recorded OSM wireless access
- Unknown ratings, hours and Study Scores explicitly remain unavailable
- Lazy loaded, local illustrative card artwork, not venue photos
- Skeletons while searching, small animations and reduced-motion support

Files
- index.html — semantic page and controls
- styles.css — tokens, themes, responsive layout and motion
- ui.js — cards, favorites, themes and presentation preferences
- app.js — existing search pipeline connected to the new UI
- config.js — original OSM tile and Overpass endpoints
- assets/cafe-scene.svg — local illustration

Replace all application files and add ui.js and the assets folder. No build step.

The existing geolocation, distance calculation, Overpass query, data mapping,
cooldown and cache logic are preserved. Results are still ordered by distance.
UI filters work locally. No new API requests are introduced.

Future improvements
- Collect verified noise, seating, outlet and Wi-Fi reports before calculating a Study Score.
- Add licensed venue photos and verified opening schedules.
- Add accounts and a backend if favorites should sync across devices.

## Location fallback and study filters
Click Choose an area on the map, pan/zoom to your area, then Search this map area.
The first map view is Toronto for orientation, not an inferred user location.
A failed browser location request automatically opens this picker. Manual searches
bypass geolocation. Search distance is measured from the selected map center.

Add / edit study notes on any card records Yes, No or Unknown for the six features.
Notes are stored only in this browser. Selected chips combine with AND and exclude
unknown features. Open late means after 9 pm according to your note, not a computed
opening-hours schedule. Clear study filters shows places again. These are personal
observations, not independently verified community information.

## Venue details and photos
Click a place name to open details showing website, phone, cuisine and opening hours
where recorded in OSM. Existing Overpass responses already contain these tags.
Opening hours are displayed as supplied, not evaluated as an Open now claim.
Ratings and reviews are not supplied by OSM.

details.js fetches a linked Wikimedia Commons File only for the selected venue.
It supports OSM wikimedia_commons File tags and Commons File links in image tags.
Category links and arbitrary image URLs do not produce embedded photos.
Author, credit, license and source links accompany photos. Missing or unsupported
license metadata falls back to a source link. Card artwork stays illustrative.
Photo metadata requests time out after 10 seconds, are deduplicated and cached in
page memory for five minutes, and never block the search results.
Upload details.js with the other files. No API key is needed.
