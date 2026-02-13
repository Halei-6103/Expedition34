# Expedition34

Game store app (CS340). Express + EJS. Five tables: Developers, Games, Users, Purchases, Reviews. Home → table hub → Browse / Add / Update / Delete.

**Setup:** All shared CSS and theme (charcoal + burnt orange) live in `views/partials/header.ejs`; edit the `:root` block to change colors. DB config in `db-connector.js`; schema in `DDL.sql`.

**Run:**
```bash
npm install
npm start
```
Port 35571 by default; use `PORT=9124 npm start` to override.

**ENGR:** Copy project to server, `npm install`, then `export PORT=9124` and `npm start`. Submit that URL.
