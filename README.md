## 🔆 clock-pv-forecast-card
See release notes for new functionality!
A compact and elegant **solar forecast card** for Home Assistant, displaying five days of PV yield predictions as **animated progress bars**, with **localized weekday labels** and customizable styling.

Heavily inspired by [Clock Weather Card](https://github.com/pkissling/clock-weather-card)

![screengif_pvforecast](https://github.com/user-attachments/assets/54056e14-29ba-4e0b-95ca-0795044ea784)

---

**For 🇩🇪 GERMAN README scroll down**  
**Installation instructions (manual) are at the top**

---

### 🇬🇧 MANUAL Installation of `clock-pv-forecast-card` in Home Assistant

> 💡 This section refers to **manual installation** (not via HACS).

1. **Place the JavaScript file**  
   Download or create the file `clock_pv_forecast_card.js` and save it to:

   ```
   /config/www/
   ```

2. **Register the resource**  
   Go to:  
   `Settings → Dashboards → ⋮ (three dots) → Resources`  
   Add a new JavaScript module:

   ```
   URL: /local/clock_pv_forecast_card.js
   Resource type: JavaScript Module
   ```

3. **Restart Home Assistant (recommended)**  
   Or reload your dashboard and clear your browser cache if needed.

4. **Add the card to a dashboard (YAML)**  
   Use the YAML editor and set:

   ```yaml
   type: custom:clock-pv-forecast-card
   ```

5. **Ensure the required forecast entities exist**  
   The sensors should return daily kWh values (e.g., from Solcast, DWD, etc.)

---

### 🇩🇪 Manuelle Installation der `clock-pv-forecast-card` in Home Assistant

> 💡 Diese Anleitung gilt für die **manuelle Installation** (nicht über HACS).

1. **JavaScript-Datei speichern**  
   Lade `clock_pv_forecast_card.js` herunter oder erstelle sie selbst.  
   Lege sie in folgendem Ordner ab:

   ```
   /config/www/
   ```

2. **Ressource registrieren**  
   Gehe in Home Assistant zu:  
   `Einstellungen → Dashboards → ⋮ (drei Punkte) → Ressourcen`  
   Neue Ressource hinzufügen:

   ```
   URL: /local/clock_pv_forecast_card.js
   Ressourcentyp: JavaScript-Modul
   ```

3. **Neustart empfohlen**  
   Starte Home Assistant neu oder lade das Dashboard neu (evtl. Cache löschen).

4. **Karte im Dashboard einfügen (YAML-Modus)**

   ```yaml
   type: custom:clock-pv-forecast-card
   ```

5. **Sensoren prüfen**  
   Die eingebundenen Sensoren müssen gültige Tagesprognosen in kWh liefern (z. B. Solcast).

---

### 📦 Features

- 7-day PV forecast using your preferred integration - you can choose which days to display! (Today and tomorrow remain mandatory)
- Animated bars with customizable colors
- Responsive and localized layout
- Optional remaining energy bar (with shrinking animation and alert color)

---

### ⚙️ Requirements

- Home Assistant 2024.12 or newer
- Daily forecast sensors (e.g. `sensor.solcast_pv_forecast_prognose_tag_3`)
- Card registered as frontend resource (`clock_pv_forecast_card.js`)
- YAML dashboard configuration

---

### 🧩 Example Configuration

If you have no use for a day entity - just don't use the line :) you choose what you want to display! same goes for the "Rest" (remaining) bar

```yaml
type: custom:clock-pv-forecast-card
entity_remaining: sensor.solcast_pv_forecast_prognose_verbleibende_leistung_heute
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
entity_day4: sensor.solcast_pv_forecast_prognose_tag_4
entity_day5: sensor.solcast_pv_forecast_prognose_tag_5
entity_day6: sensor.solcast_pv_forecast_prognose_tag_6
entity_day7: sensor.solcast_pv_forecast_prognose_tag_7
animation_duration: 5s
bar_color_start: "#ffcc00"
bar_color_end: "#00cc66"
weekday_format: short
remaining_color_start: "#e67e22"
remaining_color_end: "#f1c40f"
remaining_threshold: 5
remaining_blink: true
remaining_low_color_start: "#ff0000"
remaining_low_color_end: "#ffa500"
max_value: 120
show_tooltips: true
```

---

### 🔧 Configuration Options

| Option                          | Type     | Description                                            |
| ------------------------------- | -------- | ------------------------------------------------------ |
| `entity_today` to `entity_day7` | `sensor` | Daily forecast in kWh / If you have less entities just don't use the respective day |
| `entity_remaining`              | `sensor` | Optional: remaining value today (in kWh)               |
| `animation_duration`            | `string` | CSS time (e.g. `0.5s`, `2s`)                           |
| `bar_color_start` / `end`       | `string` | Gradient colors for main bars                          |
| `remaining_color_start` / `end` | `string` | Gradient colors for remaining bar                      |
| `remaining_threshold`           | `number` | If remaining ≤ this, use `low_color_*`                 |
| `remaining_low_color_start`     | `string` | Alert gradient (start)                                 |
| `remaining_low_color_end`       | `string` | Alert gradient (end)                                   |
| `max_value`                     | `number` | Maximum value to normalize bar width                   |
| `weekday_format`                | `string` | `narrow`, `short`, or `long`                           |
| `show_tooltips`                 | `string` | `true`, `false` Show tooltip when hovering the bar     |
| `remain_blink`                  | `string` | `true`, `false` "Rest" bar blinks below threshold      |

---

### 💡 Tips

- Use `vertical-stack` or `grid` layouts for better integration
- Colors can use `var(--theme-color)` from your HA theme
- Try [Google's color picker](https://www.google.com/search?q=hex+color+picker)---

### 🧩 Beispielkonfiguration (Deutsch)

Werte siehe oben

In diesem Beispiel:
- `entity_remaining` zeigt den Rest-Energiebedarf für den Tag.
- `weekday_format` steuert die Darstellung der Wochentage (`short` → z. B. „Mo“).
- Die Farben und Balkenanimationen lassen sich individuell anpassen.
- `max_value` legt den Referenzwert für die volle Balkenbreite fest.
- Ab einem Schwellwert (`remaining_threshold`) ändern sich die Farben für „Rest“.
- Die "Rest" Anzeige kann blinken wenn sie unter den Schwellwert sinkt (`remaining_blink`)
- `show_tooltips` - wenn man möchte können Tooltips angezeigt werden, sobald man mit der Maus über den Balken fährt
