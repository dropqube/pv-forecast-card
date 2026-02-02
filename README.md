## 🔆 pv-forecast-card
A compact and elegant **solar forecast card** for Home Assistant, displaying seven days of PV yield predictions as **animated progress bars**, with **localized weekday labels** and customizable styling.

**Now with full Visual Editor support!** 🎨

Heavily inspired by [Clock Weather Card](https://github.com/pkissling/clock-weather-card)

![screengif_pvforecast](https://github.com/user-attachments/assets/54056e14-29ba-4e0b-95ca-0795044ea784)

---

**For 🇩🇪 GERMAN README scroll down**

---

### 🇬🇧 Installation

**I HEAVILY RECOMMEND INSTALLING THIS ViA HACS**

If you don't want to use HACS, here's the manual installation method:

1. **Download** the `clock_pv_forecast_card.js` file and save it to `/config/www/`.
2. **Register** the resource in `Settings → Dashboards → ⋮ → Resources`:
   * URL: `/local/clock_pv_forecast_card.js`
   * Type: `JavaScript Module`
3. **Add Card:** Go to your dashboard, click "Edit", "Add Card", and select **Custom: Clock PV Forecast Card**.

### ⚙️ Configuration
You can configure almost everything via the **Visual Editor**. For advanced setups (like color thresholds), you can use YAML.

| Option | Type | Default | Description |
|:-----|:-----|:--------|:------------|
| `entity_today` | string | **Required** | Sensor for today's forecast. |
| `entity_tomorrow` | string | Optional | Sensor for tomorrow's forecast. |
| `entity_day3` to `day7` | string | Optional | Sensors for the following days. |
| `entity_remaining` | string | Optional | Sensor for remaining energy today. |
| `max_value` | number | `100` | Value (kWh) representing 100% bar width. |
| `display_mode` | string | `weekday` | `weekday`, `date`, or `relative`. |
| `weekday_format` | string | `short` | `short` (Mon), `long` (Monday), `narrow` (M). |
| `bar_style` | string | `gradient` | `gradient` (default) or `solid` (threshold colors). |
| `color_thresholds` | list | (default) | **YAML only:** Define colors for `solid` mode. |
| `gradient_fixed` | boolean | `false` | If `true`, the gradient spans 0-100% fixed width. |
| `remaining_indicator`| string | `bar` | `bar` (separate row) or `marker` (dot inside today's bar). |
| `remaining_inverted` | boolean | `false` | If `true`, marker counts down (Right-to-Left). |
| `show_tooltips` | boolean | `false` | Shows details and "last updated" on hover. |
| `bar_color_start` | string | `#3498db` | Start color of the gradient (Hex). |
| `bar_color_end` | string | `#2ecc71` | End color of the gradient (Hex). |

#### Example: Solid Colors (Thresholds) - YAML Mode
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

## 🇩🇪 Installation & Konfiguration

**ICH EMPFEHLE DIE INSTALLATION ÜBER HACS**

### Installation (Manuell)

1. **Datei speichern**: Lade `clock_pv_forecast_card.js` herunter und speichere sie unter `/config/www/`.
2. **Ressource registrieren**: Gehe zu `Einstellungen → Dashboards → Ressourcen` und füge hinzu:
* URL: `/local/clock_pv_forecast_card.js`
* Typ: `JavaScript Modul`


3. **Karte hinzufügen**: Im Dashboard "Karte hinzufügen" klicken und **Custom: Clock PV Forecast Card** wählen.

### ⚙️ Konfiguration

Die Karte verfügt nun über einen **Visuellen Editor**. Die meisten Einstellungen können bequem per Klick vorgenommen werden.

| Option | Typ | Standard | Beschreibung |
| --- | --- | --- | --- |
| `entity_today` | string | **Pflicht** | Sensor für die heutige Prognose. |
| `max_value` | Zahl | `100` | Maximalwert für 100% Balkenbreite (kWh). |
| `display_mode` | string | `weekday` | `weekday` (Mo), `date` (12.6.), `relative` (Heute). |
| `bar_style` | string | `gradient` | `gradient` (Verlauf) oder `solid` (Feste Farben). |
| `color_thresholds` | Liste | (Standard) | **Nur YAML:** Grenzwerte für `solid` Farben. |
| `remaining_indicator` | string | `bar` | `bar` (eigene Zeile) oder `marker` (Punkt im Balken). |
| `remaining_inverted` | boolean | `false` | `true` = Countdown-Modus (Rechts nach Links). |
| `show_tooltips` | boolean | `false` | Zeigt Details beim Drüberfahren (Mouseover). |
| `bar_color_start` | string | `#3498db` | Startfarbe (Hex-Code). |
| `bar_color_end` | string | `#2ecc71` | Endfarbe (Hex-Code). |

#### Beispiel: Countdown-Marker (Visuell einstellbar)

Nutze diese Einstellung, um den verbleibenden Ertrag als "Countdown" im heutigen Balken anzuzeigen.

```yaml
type: custom:clock-pv-forecast-card
entity_today: sensor.pv_forecast_today
entity_remaining: sensor.pv_remaining
remaining_indicator: marker
remaining_inverted: true

```

---

**License:** GPL-3.0

**Inspiration:** [Clock Weather Card](https://github.com/pkissling/clock-weather-card)
