# Easy Hire taxi landing page

A responsive React + Vite landing page for Easy Hire's driver-included airport transfers and outstation cab enquiries from Mysore.

## Run locally

```sh
cd frontend
npm install
npm run dev
```

Create a production build with `npm run build`. Run the code linter with `npm run lint`.

## Business configuration

Customer-facing business data and editable content live in `frontend/src/data/siteConfig.js`:

- Contact number, WhatsApp number, email, address, city and state
- Main SEO title/description, page copy, navigation and social links
- Services, quick routes, destination cards, estimated distances/times, fares
- Fleet specifications, process steps, trust points, FAQ answers and review visibility

A 10-digit number in `siteConfig.whatsapp` is treated as an Indian mobile number and prefixed with country code `91`. Use a complete international number to avoid automatic prefixing.

The map embed and directions link are built from `siteConfig.address`, `siteConfig.city`, and `siteConfig.state` in the footer. Update those fields if the pickup/office address changes.

## WhatsApp trip enquiry

The header, route chips, service cards, route cards, fleet cards, hero contact card, final CTA and mobile action bar open the trip enquiry modal. It validates an Indian 10-digit mobile number and travel dates, formats trip/contact details, then opens a WhatsApp link with a pre-filled message. The customer still has to tap **Send** in WhatsApp; a website `wa.me` link cannot send the message silently. The success state explains this.

## Owner confirmation checklist — do before publishing

### Contact and location

- Confirm the current phone and WhatsApp numbers, email, full address, map pin and directions link.
- Confirm the WhatsApp account can receive enquiries at the number in `siteConfig.whatsapp`.
- Social links are empty and therefore hidden until real profile URLs are added.

### Vehicles and claims

- Add approved Easy Hire vehicle images to `frontend/src/assets/cars/` and replace the neutral placeholder in `Fleet`. No stock car photos are used in the fleet.
- Confirm each vehicle's AC availability, passenger capacity and approximate luggage capacity; the current AC labels are deliberately shown as “confirm availability”.
- Confirm the listed vehicles are available with a driver and the “Best for” descriptions match actual vehicle condition and luggage space.
- Confirm the service descriptions and trip process copy are accurate for current operations.
- The page currently uses a neutral remote scenery image in the hero, not a car photo.

### Approximate route distances and drive times

These are planning estimates only. City-centre, airport-terminal, destination-area, road choice, traffic, weather, and stops change both figures. Confirm route endpoints and times with Easy Hire before publishing/promoting them.

| Route | Current estimate | Reference to check | Owner action |
| --- | --- | --- | --- |
| Mysore ↔ Bengaluru International Airport | Approx. 170 km; around 3–4 hours | [Mysuru District — How to Reach](https://mysore.nic.in/en/how-to-reach/) lists Bengaluru International Airport at 170 km from Mysuru. | Confirm terminal pickup point, route and realistic time range. |
| Mysore ↔ Ooty | Approx. 150 km; around 4–5 hours | [MakeMyTrip route planner](https://www.makemytrip.com/routeplanner/mysore-ooty-distance.html) gives a road-distance range; [Mysore–Ooty Road](https://en.wikipedia.org/wiki/Mysore-Ooty_Road) describes a 124 km route. | Confirm the preferred route, distance and time. |
| Mysore ↔ Wayanad (Kalpetta) | Approx. 140 km; around 3–4 hours | [Rome2Rio route](https://www.rome2rio.com/s/Mysuru/Wayanad) and [Mysore–Wayanad road estimate](https://www.kalqlater.com/road-trip-cost/mysore-to-wayanad) show route estimates around 138–139 km. | Confirm the endpoint in Wayanad and the route/time that can be offered. |
| Mysore ↔ Coorg (Madikeri) | Approx. 120 km; around 3–4 hours | [Mysore to Coorg road guide](https://www.mysoretravelo.com/blog/mysore-to-coorg-distance-by-road-all-routes/) gives a route estimate near 118–120 km. | Confirm destination endpoint and drive-time range. |
| Mysore ↔ Bandipur | Approx. 80 km; around 1.5–2.5 hours | [Karnataka Tourism — Mysuru to Bandipur](https://karnatakatourism.org/en/experiences/mysuru-to-bandipur-forest-highway-drive/) gives approximately 80 km. | Confirm pickup/destination and any travel-time restrictions relevant to the offered ride. |
| Mysore ↔ Kabini | Approx. 80 km; around 2–2.5 hours | [Kabini Kaanana route note](https://www.kabinikaanana.com/blogs/mysore-to-kabini-drive) describes an approximately 80 km drive. | Confirm the specific resort/jetty destination; “Kabini” covers multiple endpoints. |
| Mysore ↔ Bengaluru City | Approx. 145 km; around 2.5–3.5 hours | General route estimate; not tied to a specific Bengaluru address. | Confirm endpoints, route, distance and time. |

### Prices, policies, reviews and optional features

- No prices are invented. Route prices are `null`, so cards show “Get a quote on WhatsApp”. Add a numeric `price` only after Easy Hire confirms a starting fare and its inclusions.
- Every FAQ answer currently includes **[CONFIRM WITH OWNER]**. Confirm and edit answers for: airport flight tracking/waiting time; tolls and parking; driver allowance/night charges; Kerala and Tamil Nadu entry/permit charges; payment methods/timing; cancellation; luggage limits; and child seats.
- `showReviews` is `false` and the reviews array is empty. Add only real, approved reviews, then switch the flag on.
- The copy “Your driver arrives on time” is the requested process-step heading. Confirm Easy Hire can stand behind that service promise before publishing.
- Kannada language toggle was optional and is not included.

## Logo

`frontend/src/assets/easy-hire-logo-transparent.png` is a background-removed version of the supplied logo image. If a clean original transparent brand file becomes available, replace it and keep the same import path.
