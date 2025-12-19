Hier ist der vollständige Inhalt für die `README.md` als ein einziger, kopierfähiger Markdown-Codeblock:

```markdown
## 🔆 pv-forecast-card
A compact and elegant **solar forecast card** for Home Assistant, displaying seven days of PV yield predictions as **animated progress bars**, with **localized weekday labels** and customizable styling.

Heavily inspired by [Clock Weather Card](https://github.com/pkissling/clock-weather-card)

![screengif_pvforecast](https://github.com/user-attachments/assets/54056e14-29ba-4e0b-95ca-0795044ea784)

---

**For 🇩🇪 GERMAN README scroll down** **Installation instructions (manual) are at the top**

---

### 🇬🇧 MANUAL Installation of `clock-pv-forecast-card` in Home Assistant

1. **Place the JavaScript file** Download or create the file `clock_pv_forecast_card.js` and save it to:

```

/config/www/

```

2. **Register the resource** Go to: `Settings → Dashboards → ⋮ (three dots) → Resources`  
Add a new JavaScript module:

```

URL: /local/clock_pv_forecast_card.js
Resource type: JavaScript Module

```

3. **Add the card to a dashboard (YAML)**
```yaml
type: custom:clock-pv-forecast-card
entity_today: sensor.energy_production_today

```

---

### ⚙️ Configuration Options (English)

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `entity_today` | string | **Required** | Sensor for today's forecast. |
| `entity_tomorrow` | string | Optional | Sensor for tomorrow's forecast. |
| `entity_day3` to `day7` | string | Optional | Sensors for the following days. |
| `entity_remaining` | string | Optional | Sensor for remaining energy today. |
| `bar_style` | string | `gradient` | **New:** `gradient` (default) or `solid` (threshold-based colors). |
| `color_thresholds` | list | (default) | **New:** Define custom thresholds for `solid` mode. |
| `gradient_fixed` | boolean | `false` | **New:** If `true`, the gradient is fixed to full width (0-100%). |
| `remaining_indicator` | string | `bar` | **New:** `bar` for a separate row, `marker` for a dot inside today's bar. |
| `max_value` | number | `100` | Maximum value for 100% bar width. |
| `display_mode` | string | `weekday` | `weekday`, `date`, or `relative`. |
| `show_tooltips` | boolean | `false` | Shows detailed info and "last updated" on hover. |

#### Example: Threshold-based Colors (Solid Mode)

```yaml
type: custom:clock-pv-forecast-card
entity_today: sensor.energy_production_today
bar_style: solid
color_thresholds:
  - value: 20
    color: "#2ecc71" # Green
  - value: 10
    color: "#f1c40f" # Yellow
  - value: 0
    color: "#e74c3c" # Red

```

---

## 🇩🇪 Installation (Manuell)

1. **Datei speichern**: `clock_pv_forecast_card.js` nach `/config/www/` kopieren.
2. **Ressource registrieren**: Unter `Einstellungen → Dashboards → Ressourcen` die URL `/local/clock_pv_forecast_card.js` als JavaScript-Modul hinzufügen.
3. **Karte hinzufügen**: Im Dashboard via YAML mit `type: custom:clock-pv-forecast-card`.

### ⚙️ Konfigurations-Optionen (Deutsch)

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `entity_today` | string | **Erforderlich** | Sensor für die heutige Prognose. |
| `bar_style` | string | `gradient` | **Neu:** `gradient` (Verlauf) oder `solid` (feste Farben nach Grenzwerten). |
| `color_thresholds` | Liste | (Standard) | **Neu:** Eigene Grenzwerte für den `solid` Modus definieren. |
| `gradient_fixed` | boolean | `false` | **Neu:** Fixiert den Farbverlauf auf 0-100% Breite. |
| `remaining_indicator` | string | `bar` | **Neu:** `bar` (eigene Zeile), `marker` (Punkt im Balken von heute). |
| `max_value` | Zahl | `100` | Maximalwert für 100% Balkenbreite. |
| `display_mode` | string | `weekday` | `weekday` (Wochentag), `date` (Datum), `relative` (Heute/Morgen). |
| `show_tooltips` | boolean | `false` | Zeigt Details und Zeitstempel beim Drüberfahren (Hover). |

#### Beispiel: Feste Farben statt Verlauf

```yaml
type: custom:clock-pv-forecast-card
entity_today: sensor.energy_production_today
bar_style: solid
color_thresholds:
  - value: 20
    color: "green"
  - value: 10
    color: "orange"
  - value: 0
    color: "red"

```

### 💡 Features & Tipps

* **HA 2025 Ready:** Vollständig optimiert für das neue Sections-Dashboard und moderne Container-Queries.
* **Lokalisierung:** Automatische Erkennung der Sprache (DE, EN, FR, ES, IT, NL) und korrekte Zahlenformate (Komma vs. Punkt).
* **Offline-Betrieb:** Keine Abhängigkeit von externen Servern (unpkg), lädt direkt aus dem Home Assistant Core.
* **Tooltips:** Aktiviere `show_tooltips: true` für detaillierte Informationen beim Hover.
* **Rest-Anzeige:** Nutze `remaining_indicator: marker`, um den verbleibenden Tagesertrag als Punkt im heutigen Balken anzuzeigen.

---

**License:** MIT

**Inspiration:** [Clock Weather Card](https://github.com/pkissling/clock-weather-card)
