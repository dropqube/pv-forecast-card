## 🔆 pv-forecast-card
See release notes for new functionality!
A compact and elegant **solar forecast card** for Home Assistant, displaying seven days of PV yield predictions as **animated progress bars**, with **localized weekday labels** and customizable styling.

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
   Die eingebundenen Sensoren müssen gültige Tagesprognosen in kWh liefern (z. B. Solcast).

---

### 📦 Features

- 7-day PV forecast using your preferred integration - you can choose which days to display! (Today and tomorrow remain mandatory)
- Animated bars with customizable colors
- Responsive and localized layout
- Optional remaining energy indicator (bar or marker) with shrinking animation and alert color in bar mode
- **NEW**: Three display modes for day labels:
  - **Weekday mode**: Traditional weekday names (Mon, Tue, etc.)
  - **Date mode**: Short date format (12.6., Jun 12, etc.) - respects your system locale
  - **Relative mode**: Relative day indicators (Today, Tomorrow, +2d, +3d, etc.; optional +1d for tomorrow)
- Customizable remaining indicator label - change "Remaining" to your preferred text
- Fully internationalized error messages using Home Assistant's localization system
- Tooltips with detailed information and last update time

---

### ⚙️ Requirements

- Home Assistant 2024.12 or newer
- Daily forecast sensors (e.g. `sensor.solcast_pv_forecast_prognose_tag_3`)
- Card registered as frontend resource (`clock_pv_forecast_card.js`)
- YAML dashboard configuration

---

### 🧩 Example Configurations

#### Traditional Weekday Display (Default)
```yaml
type: custom:clock-pv-forecast-card
display_mode: weekday        # Shows: Mon, Tue, Wed, etc.
weekday_format: short        # Options: narrow, short, long
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
# ... more entities as needed
```

#### Date Display Mode
```yaml
type: custom:clock-pv-forecast-card
display_mode: date           # Shows dates instead of weekdays
date_format: numeric         # Shows: 12.6. or 6/12 (based on locale)
# date_format: short         # Alternative: 12. Jun or Jun 12
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
# ... more entities as needed
```

#### Relative Day Display Mode
```yaml
type: custom:clock-pv-forecast-card
display_mode: relative       # Shows: Today, Tomorrow, +2d, +3d, etc.
relative_plus_one: true     # Optional: show "+1d" instead of "Tomorrow"
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
# ... more entities as needed
```

#### Full Configuration Example
```yaml
type: custom:clock-pv-forecast-card
display_mode: date
date_format: numeric
remaining_indicator: marker
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
remaining_color_start: "#e67e22"
remaining_color_end: "#f1c40f"
remaining_threshold: 5
remaining_blink: true
remaining_low_color_start: "#ff0000"
remaining_low_color_end: "#ffa500"
remaining_label: "Battery"
max_value: 120
show_tooltips: true
```

---

### 🔧 Configuration Options

| Option                          | Type     | Description                                            |
| ------------------------------- | -------- | ------------------------------------------------------ |
| `entity_today` to `entity_day7` | `sensor` | Daily forecast in kWh / If you have less entities just don't use the respective day |
| `entity_remaining`              | `sensor` | Optional: remaining value today (in kWh)               |
| `display_mode`                  | `string` | **NEW**: Display mode: `weekday`, `date`, or `relative` (default: `weekday`) |
| `weekday_format`                | `string` | For weekday mode: `narrow`, `short`, or `long` (default: `short`) |
| `date_format`                   | `string` | For date mode: `short` (12. Jun) or `numeric` (12.6.) (default: `short`) |
| `remaining_label`               | `string` | Custom label for remaining indicator (default: "Rest") |
| `remaining_indicator`           | `string` | Display style for remaining value: `bar` (default) or `marker` |
| `animation_duration`            | `string` | CSS time (e.g. `0.5s`, `2s`)                           |
| `bar_color_start` / `end`       | `string` | Gradient colors for main bars                          |
| `remaining_color_start` / `end` | `string` | Gradient colors for remaining bar                      |
| `remaining_threshold`           | `number` | If remaining ≤ this, use `low_color_*`                 |
| `remaining_low_color_start`     | `string` | Alert gradient (start)                                 |
| `remaining_low_color_end`       | `string` | Alert gradient (end)                                   |
| `remaining_blink`               | `boolean`| Remaining bar blinks below threshold                   |
| `max_value`                     | `number` | Maximum value to normalize bar width                   |
| `show_tooltips`                 | `boolean`| Show tooltip when hovering the bar                    |
| `relative_plus_one`             | `boolean`| In relative mode show "+1d" instead of "Tomorrow" (default: `false`) |

#### Display Mode Options Explained

**`display_mode: weekday`** (Default)
- Shows traditional weekday names
- Requires: `weekday_format` option
- Example output: "Mon", "Tue", "Wed" (short format)

**`display_mode: date`**
- Shows actual dates instead of weekday names
- Requires: `date_format` option
- Respects your Home Assistant locale settings
- Example output: "12.6." (German), "6/12" (US), "Jun 12" (short format)

**`display_mode: relative`**
- Shows relative day indicators
- Optional: set `relative_plus_one: true` to display "+1d" instead of "Tomorrow"
- Example output: "Today", "Tomorrow", "+2d", "+3d", "+4d", "+5d", "+6d"

---

### 🌍 Internationalization

The card now uses Home Assistant's built-in localization system for all error messages and labels. This means:

- Error messages like "Unavailable" and "Unknown" will appear in your Home Assistant language
- Weekday names are automatically localized based on your Home Assistant locale
- Date formats respect your system locale (German: "12.6.", US: "6/12", etc.)
- Tooltip text for "Forecast" and "Last updated" will use your system language
- Fallback to English if a translation is not available

**Supported languages**: All languages supported by Home Assistant's core localization system.

---

### 💡 Tips

- Use `vertical-stack` or `grid` layouts for better integration
- Colors can use `var(--theme-color)` from your HA theme
- Try [Google's color picker](https://www.google.com/search?q=hex+color+picker)
- Customize the remaining indicator label with `remaining_label` to match your use case (e.g., "Battery", "Available", "Remaining")
- Enable tooltips with `show_tooltips: true` for detailed information when hovering over bars
- Column width automatically adjusts based on your chosen display mode
- Date mode is perfect for weekly planning, relative mode for quick at-a-glance information (use `relative_plus_one` for "+1d" tomorrow)

---

### 🇩🇪 Deutsche Dokumentation

### 📦 Funktionen

- 7-Tage PV-Prognose mit wählbaren Tagen
- Animierte Balken mit anpassbaren Farben
- Responsive und lokalisierte Darstellung
- Optionaler Verbrauchsindikator (Balken oder Marker) mit Warnfunktion (Balkenmodus)
- **NEU**: Drei Anzeigemodi für Tageslabels:
  - **Wochentag-Modus**: Traditionelle Wochentagsnamen (Mo, Di, etc.)
  - **Datums-Modus**: Kurzes Datumsformat (12.6., 12. Jun, etc.) - respektiert die Systemsprache
  - **Relativer Modus**: Relative Tagesangaben (Heute, Morgen, +2d, +3d, etc.; optional +1d für Morgen)
- Anpassbares Label für Verbrauchsindikator
- Vollständig internationalisierte Fehlermeldungen
- Tooltips mit detaillierten Informationen

---

### 🧩 Beispielkonfigurationen

#### Traditionelle Wochentagsanzeige (Standard)
```yaml
type: custom:clock-pv-forecast-card
display_mode: weekday        # Zeigt: Mo, Di, Mi, etc.
weekday_format: short        # Optionen: narrow, short, long
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
# ... weitere Entitäten nach Bedarf
```

#### Datums-Anzeigemodus
```yaml
type: custom:clock-pv-forecast-card
display_mode: date           # Zeigt Daten statt Wochentage
date_format: numeric         # Zeigt: 12.6. (Deutschland) oder 6/12 (USA)
# date_format: short         # Alternative: 12. Jun
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
# ... weitere Entitäten nach Bedarf
```

#### Relativer Tage-Anzeigemodus
```yaml
type: custom:clock-pv-forecast-card
display_mode: relative       # Zeigt: Heute, Morgen, +2d, +3d, etc.
relative_plus_one: true     # Optional: "+1d" statt "Morgen" anzeigen
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
# ... weitere Entitäten nach Bedarf
```

#### Vollständige Beispielkonfiguration
```yaml
type: custom:clock-pv-forecast-card
display_mode: date
date_format: numeric
remaining_indicator: marker
entity_remaining: sensor.solcast_pv_forecast_prognose_verbleibende_leistung_heute
entity_today: sensor.solcast_pv_forecast_prognose_heute
entity_tomorrow: sensor.solcast_pv_forecast_prognose_morgen
entity_day3: sensor.solcast_pv_forecast_prognose_tag_3
entity_day4: sensor.solcast_pv_forecast_prognose_tag_4
entity_day5: sensor.solcast_pv_forecast_prognose_tag_5
entity_day6: sensor.solcast_pv_forecast_prognose_tag_6
entity_day7: ser.solcast_pv_forecast_prognose_tag_7
animation_duration: 5s
bar_color_start: "#ffcc00"
bar_color_end: "#00cc66"
remaining_color_start: "#e67e22"
remaining_color_end: "#f1c40f"
remaining_threshold: 5
remaining_blink: true
remaining_low_color_start: "#ff0000"
remaining_low_color_end: "#ffa500"
remaining_label: "Batterie"
max_value: 120
show_tooltips: true
```

---

### 🔧 Konfigurationsoptionen (Deutsch)

| Option                          | Typ      | Beschreibung                                           |
| ------------------------------- | -------- | ------------------------------------------------------ |
| `entity_today` bis `entity_day7`| `sensor` | Tagesprognose in kWh / Nicht benötigte Tage einfach weglassen |
| `entity_remaining`              | `sensor` | Optional: Verbleibender Wert heute (in kWh)           |
| `display_mode`                  | `string` | **NEU**: Anzeigemodus: `weekday`, `date`, oder `relative` (Standard: `weekday`) |
| `weekday_format`                | `string` | Für Wochentag-Modus: `narrow`, `short`, oder `long` (Standard: `short`) |
| `date_format`                   | `string` | Für Datums-Modus: `short` (12. Jun) oder `numeric` (12.6.) (Standard: `short`) |
| `remaining_label`               | `string` | Angepasstes Label für Verbrauchsindikator (Standard: "Rest") |
| `remaining_indicator`           | `string` | Anzeige des verbleibenden Werts: `bar` (Standard) oder `marker` |
| `animation_duration`            | `string` | CSS-Zeit (z.B. `0.5s`, `2s`)                          |
| `bar_color_start` / `end`       | `string` | Verlaufsfarben für Hauptbalken                        |
| `remaining_color_start` / `end` | `string` | Verlaufsfarben für Verbrauchsbalken                   |
| `remaining_threshold`           | `number` | Bei verbleibendem Wert ≤ diesem, nutze `low_color_*`   |
| `remaining_low_color_start`     | `string` | Alarm-Verlauf (Start)                                  |
| `remaining_low_color_end`       | `string` | Alarm-Verlauf (Ende)                                   |
| `remaining_blink`               | `boolean`| Verbrauchsbalken blinkt unter Schwellwert             |
| `max_value`                     | `number` | Maximalwert für Balkennormalisierung                   |
| `show_tooltips`                 | `boolean`| Tooltip beim Hover über Balken anzeigen               |
| `relative_plus_one`             | `boolean`| Im relativen Modus "+1d" statt "Morgen" anzeigen (Standard: `false`) |

#### Anzeigemodus-Optionen erklärt

**`display_mode: weekday`** (Standard)
- Zeigt traditionelle Wochentagsnamen
- Benötigt: `weekday_format` Option
- Beispielausgabe: "Mo", "Di", "Mi" (short Format)

**`display_mode: date`**
- Zeigt echte Daten statt Wochentagsnamen
- Benötigt: `date_format` Option
- Respektiert Home Assistant Locale-Einstellungen
- Beispielausgabe: "12.6." (Deutsch), "6/12" (USA), "12. Jun" (short Format)

**`display_mode: relative`**
- Zeigt relative Tagesangaben
- Optional kannst du mit `relative_plus_one: true` statt "Morgen" "+1d" anzeigen
- Beispielausgabe: "Heute", "Morgen", "+2d", "+3d", "+4d", "+5d", "+6d"

---

### 💡 Tipps (Deutsch)

- Nutze `vertical-stack` oder `grid` Layouts für bessere Integration
- Farben können `var(--theme-color)` aus deinem HA-Theme verwenden
- Probiere [Google's Farbwähler](https://www.google.com/search?q=hex+color+picker) aus
- Passe das Verbrauchsindikator-Label mit `remaining_label` an deinen Anwendungsfall an (z.B. "Batterie", "Verfügbar", "Rest")
- Aktiviere Tooltips mit `show_tooltips: true` für detaillierte Informationen beim Hover über Balken
- Die Spaltenbreite passt sich automatisch an den gewählten Anzeigemodus an
- Datums-Modus ist perfekt für Wochenplanung, relativer Modus für schnelle Übersichtsinformationen (nutze `relative_plus_one` für "+1d" morgen)

**Wichtige Konfigurationshinweise:**
- Bei `display_mode: weekday` muss `weekday_format` gesetzt werden
- Bei `display_mode: date` muss `date_format` gesetzt werden
- Bei `display_mode: relative` kannst du optional `relative_plus_one: true` setzen, um "+1d" für Morgen anzuzeigen
- Die Karte ist vollständig rückwärtskompatibel - bestehende Konfigurationen funktionieren weiterhin ohne Änderungen
