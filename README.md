## 🔆 clock-pv-forecast-card
A compact and elegant **solar forecast card** for Home Assistant, displaying five days of PV yield predictions as **animated progress bars**, with **localized weekday labels** and customizable styling.

A "Clock Weather Card" inspired solar forecast card for visualizing the forecast
Eine Karte mit PV-Prognose für die nächsten Tage

Heavily inspired by https://github.com/pkissling/clock-weather-card

![image](https://github.com/user-attachments/assets/0b4fa0bc-5e63-40c8-be15-165816b01de4)


**For GERMAN readme scroll down / für DEUTSCHE Anleitung nach unten scrollen**

**Installation instructions are at the top for further information scroll down / Installationsanleitung steht oben, für mehr Infos weiter nach unten scrollen*

### 🇬🇧 Installation of `clock-pv-forecast-card` in Home Assistant

1. **Place the JavaScript file**
   Download or create the file `clock_pv_forecast_card.js` and save it to:

   ```
   /config/www/
   ```

2. **Register the resource**
   Go to:
   `Settings → Dashboards → ⋮ → Resources`
   Add a new JavaScript module:

   ```text
   URL: /local/clock_pv_forecast_card.js
   Resource type: JavaScript Module
   ```

3. **Restart (recommended)**
   Restart Home Assistant or just reload the dashboard to ensure the file is loaded. You might need to clear your browser cache.

4. **Add the card to a dashboard**
   Use the YAML mode and set the card type to - for options see below

   ```yaml
   type: custom:clock-pv-forecast-card
   ```

5. **Ensure your forecast entities exist**
   The required sensors must return forecasted kWh values (e.g. from Solcast or other PV integrations).
---
### 🇩🇪 Installation der `clock-pv-forecast-card` in Home Assistant

1. **Datei speichern**
   Lade die Datei `clock_pv_forecast_card.js` herunter oder erstelle sie selbst aus dem Code.
   Lege sie im Verzeichnis `/config/www/` deines Home Assistant-Systems ab.

2. **Frontend-Ressource einbinden**
   Gehe in Home Assistant zu:
   `Einstellungen → Dashboard → Drei Punkte oben rechts → Ressourcen`
   Füge dort eine neue Ressource hinzu:

   ```text
   URL: /local/clock_pv_forecast_card.js
   Ressourcentyp: JavaScript-Modul
   ```

3. **Neustart (optional, aber empfohlen)**
   Starte Home Assistant komplett neu oder reloade  das Dashboard, um sicherzugehen, dass die Karte geladen wird. Es kann sein, dass du deinen Browser Cache leeren musst.

4. **Karte im Dashboard verwenden**
   Füge im Dashboard-Editor (YAML-Modus) manuell eine Karte hinzu mit dem Typ `custom:clock-pv-forecast-card`.
   Siehe Beispiel-Konfiguration weiter unten.

5. **Sicherstellen, dass die Entitäten vorhanden sind**
   Die Sensoren müssen gültige kWh-Prognosewerte liefern (z. B. von Solcast, DWD, PVOutput etc.).

---
---

### 📦 Features

* 5-day forecast using your preferred PV sensors (e.g. from Solcast)
* Responsive layout with animated horizontal bars
* Fully localized weekday labels (based on Home Assistant's language setting)
* Configurable bar colors and animation speed
* Auto-sized weekday label column (based on chosen format)

---

### ⚙️ Requirements

* Home Assistant 2024.12 or newer
* Sensors providing kWh forecast per day (I use Solcast) (e.g. `sensor.solcast_pv_forecast_prognose_tag_3`)
* Card JS file registered as a frontend resource (`clock_pv_forecast_card.js`)
* Custom card type: `custom:clock-pv-forecast-card`

---

### 🧩 Example Configuration

```yaml
type: custom:clock-pv-forecast-card
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
entity_day4: sensor.solcast_pv_forecast_prognose_tag_4
entity_day5: sensor.solcast_pv_forecast_prognose_tag_5
animation_duration: 1.5s # Set this to 0 if you don't want animated bars
bar_color_start: '#ffaa00'
bar_color_end: '#00cc66'
weekday_format: long
```

---

### 🔧 Configuration Options

| Option                          | Type     | Description                                            |
| ------------------------------- | -------- | ------------------------------------------------------ |
| `entity_today` to `entity_day5` | `sensor` | Sensors providing daily kWh forecast                   |
| `animation_duration`            | `string` | Animation time (e.g. `0.5s`, `2s`)                     |
| `bar_color_start`               | `string` | Gradient start color (hex, RGB, or CSS var)            |
| `bar_color_end`                 | `string` | Gradient end color                                     |
| `weekday_format`                | `string` | Format of weekday labels: `narrow`, `short`, or `long` |

The `weekday_format` automatically adjusts the label column width:

* `narrow`: M, T, W
* `short`: Mon, Tue
* `long`: Monday, Tuesday

---

### 💡 Tip

This card works great in `vertical-stack` or `grid` layouts. Use custom themes and color vars like `var(--primary-color)` to adapt the visuals to your dashboard.
If you don't know hex color codes, just use the one provided by google: https://www.google.com/search?q=hex+color+picker
----------------------------------------
GERMAN

Die Karte zeigt **PV-Erzeugungsprognosen** für die nächsten 5 Tage als **animierte Balken** mit Wochentagsanzeige. Die Darstellung ist kompakt, lokalisiert und konfigurierbar.

### 🔧 Voraussetzungen

* Home Assistant (mind. 2024.12)
* Integration wie Solcast o. ä. mit täglichen kWh-Vorhersagen als Sensoren (siehe entity_today usw.)
* Das JS-File muss eingebunden sein (`clock_pv_forecast_card.js`)
* Karte über Ressourcen registriert (z. B. via `resources:` oder HACS `Lovelace → Ressourcen`)

### 🧩 Beispielkonfiguration (YAML)

```yaml
type: custom:clock-pv-forecast-card
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
entity_day4: sensor.solcast_pv_forecast_prognose_tag_4
entity_day5: sensor.solcast_pv_forecast_prognose_tag_5
animation_duration: 1.5s #Auf 0 setzen wenn keine Animation erwünscht ist
bar_color_start: '#ffaa00'
bar_color_end: '#66cc00'
weekday_format: short
```

### 🔍 Parameterübersicht

| Parameter                        | Typ      | Beschreibung                             |
| -------------------------------- | -------- | ---------------------------------------- |
| `entity_today` bis `entity_day5` | `sensor` | Sensoren mit kWh-Vorhersage              |
| `animation_duration`             | `string` | CSS-Zeitangabe (z. B. `1s`, `2s`)        |
| `bar_color_start`                | `string` | Hex oder RGB-Startfarbe                  |
| `bar_color_end`                  | `string` | Hex oder RGB-Endfarbe                    |
| `weekday_format`                 | `string` | Anzeigeformat: `narrow`, `short`, `long` |

* Die Tagesnamen orientieren sich an der Home Assistant-Lokalisierung.
* Die Spaltenbreite passt sich automatisch dem Format an.
* Wenn dir HEX Codes nichts sagen, einfach das hier benutzen: https://www.google.com/search?q=hex+color+picker

### 🧪 Hinweise

* `weekday_format: long` zeigt z. B. „Montag“ (de) oder „Monday“ (en)
* `narrow` eignet sich für sehr kompakte Layouts
* Du kannst die Farben auch in Theme-Farben einbinden (z. B. mit `var(--primary-color)`)
