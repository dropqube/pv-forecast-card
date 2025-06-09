// clock-pv-forecast-card Version 0.024 – Enhanced with error handling, accessibility and performance
import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

console.info("📦 clock-pv-forecast-card v0.024 loaded");

class ClockPvForecastCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  constructor() {
    super();
    this._weekdayCache = {};
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Konfiguration ist erforderlich');
    }
    
    // Prüfe ob mindestens eine Entity definiert ist
    const hasEntity = ['entity_today', 'entity_tomorrow', 'entity_day3', 'entity_day4', 'entity_day5', 'entity_day6', 'entity_day7']
      .some(key => config[key]);
    
    if (!hasEntity) {
      throw new Error('Mindestens eine Forecast-Entity muss definiert sein');
    }

    const weekdayWidth = {
      narrow: '1.5em',
      short: '2.5em',
      long: '5em',
    };
    const format = config.weekday_format || 'short';

    this.config = {
      animation_duration: config.animation_duration || '1s',
      bar_color_start: config.bar_color_start || '#3498db',
      bar_color_end: config.bar_color_end || '#2ecc71',
      remaining_color_start: config.remaining_color_start || '#999999',
      remaining_color_end: config.remaining_color_end || '#cccccc',
      remaining_threshold: config.remaining_threshold ?? null,
      remaining_low_color_start: config.remaining_low_color_start || '#e74c3c',
      remaining_low_color_end: config.remaining_low_color_end || '#e67e22',
      remaining_blink: config.remaining_blink || false,
      max_value: config.max_value ?? 100,
      weekday_format: format,
      day_column_width: weekdayWidth[format] || '2.5em',
      entity_remaining: config.entity_remaining || null,
      show_tooltips: config.show_tooltips ?? false,
      ...config,
    };

    // Cache leeren bei Konfigurationsänderung
    this._weekdayCache = {};
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('config')) {
      return true;
    }
    
    if (changedProperties.has('hass')) {
      const oldHass = changedProperties.get('hass');
      if (!oldHass) return true;

      const entities = [
        this.config.entity_today,
        this.config.entity_tomorrow,
        this.config.entity_day3,
        this.config.entity_day4,
        this.config.entity_day5,
        this.config.entity_day6,
        this.config.entity_day7,
        this.config.entity_remaining,
      ].filter(Boolean);
      
      return entities.some(entity => 
        this.hass.states[entity]?.state !== oldHass.states[entity]?.state ||
        this.hass.states[entity]?.last_updated !== oldHass.states[entity]?.last_updated
      );
    }
    
    return false;
  }

  render() {
    const forecast = [
      this.config.entity_today && { offset: 0, entity: this.config.entity_today },
      this.config.entity_tomorrow && { offset: 1, entity: this.config.entity_tomorrow },
      this.config.entity_day3 && { offset: 2, entity: this.config.entity_day3 },
      this.config.entity_day4 && { offset: 3, entity: this.config.entity_day4 },
      this.config.entity_day5 && { offset: 4, entity: this.config.entity_day5 },
      this.config.entity_day6 && { offset: 5, entity: this.config.entity_day6 },
      this.config.entity_day7 && { offset: 6, entity: this.config.entity_day7 },
    ].filter(Boolean);

    return html`
      <ha-card>
        <div class="forecast-rows" role="table" aria-label="PV Forecast">
          ${this.config.entity_remaining ? this._renderRemainingBar() : ''}
          ${forecast.map((item, index) => this._renderForecastRow(item, index))}
        </div>
      </ha-card>
    `;
  }

  _renderForecastRow(item, index) {
    const entityState = this.hass.states[item.entity];
    
    if (!entityState || entityState.state === 'unavailable' || entityState.state === 'unknown') {
      return this._renderErrorRow(item, index, 'Entity nicht verfügbar');
    }

    const value = parseFloat(entityState.state ?? '0');
    if (isNaN(value)) {
      return this._renderErrorRow(item, index, 'Ungültiger Wert');
    }

    const dayLabel = this._getWeekdayName(item.offset);
    const barStyle = `--bar-width: ${this._barWidth(value)}%; --bar-gradient: linear-gradient(to right, ${this.config.bar_color_start}, ${this.config.bar_color_end}); --animation-time: ${this.config.animation_duration}`;
    
    return html`
      <div class="forecast-row" role="row" aria-label="Tag ${index + 1}">
        <div class="day" role="cell" style="width: ${this.config.day_column_width}">${dayLabel}</div>
        <div class="bar-container" role="cell" aria-label="Prognose ${this._formatValue(value, item.entity)}">
          <div class="bar" style="${barStyle}" aria-hidden="true"></div>
          ${this.config.show_tooltips ? this._renderTooltip(value, item.entity, dayLabel) : ''}
        </div>
        <div class="value" role="cell">${this._formatValue(value, item.entity)}</div>
      </div>`;
  }

  _renderErrorRow(item, index, errorMessage) {
    const dayLabel = this._getWeekdayName(item.offset);
    return html`
      <div class="forecast-row error" role="row" aria-label="Tag ${index + 1} - Fehler">
        <div class="day" role="cell" style="width: ${this.config.day_column_width}">${dayLabel}</div>
        <div class="bar-container error" role="cell">
          <div class="error-text">${errorMessage}</div>
        </div>
        <div class="value error" role="cell">-- kWh</div>
      </div>`;
  }

  _renderRemainingBar() {
    const entityState = this.hass.states[this.config.entity_remaining];
    
    if (!entityState || entityState.state === 'unavailable' || entityState.state === 'unknown') {
      return html`
        <div class="forecast-row error">
          <div class="day" style="width: ${this.config.day_column_width}">Rest</div>
          <div class="bar-container error">
            <div class="error-text">Entity nicht verfügbar</div>
          </div>
          <div class="value error">-- kWh</div>
        </div>`;
    }

    const remaining = parseFloat(entityState.state ?? '0');
    if (isNaN(remaining)) {
      return html`
        <div class="forecast-row error">
          <div class="day" style="width: ${this.config.day_column_width}">Rest</div>
          <div class="bar-container error">
            <div class="error-text">Ungültiger Wert</div>
          </div>
          <div class="value error">-- kWh</div>
        </div>`;
    }

    const belowThreshold = this.config.remaining_threshold !== null && remaining <= this.config.remaining_threshold;
    const start = belowThreshold ? this.config.remaining_low_color_start : this.config.remaining_color_start;
    const end = belowThreshold ? this.config.remaining_low_color_end : this.config.remaining_color_end;
    const barStyle = `--bar-width: ${this._barWidth(remaining)}%; --bar-gradient: linear-gradient(to left, ${start}, ${end}); --animation-time: ${this.config.animation_duration}`;
    const blinkClass = belowThreshold && this.config.remaining_blink ? 'blink' : '';
    
    return html`
      <div class="forecast-row">
        <div class="day" style="width: ${this.config.day_column_width}">Rest</div>
        <div class="bar-container rtl">
          <div class="bar ${blinkClass}" style="${barStyle}"></div>
          ${this.config.show_tooltips ? this._renderTooltip(remaining, this.config.entity_remaining, 'Rest') : ''}
        </div>
        <div class="value">${this._formatValue(remaining, this.config.entity_remaining)}</div>
      </div>`;
  }

  _renderTooltip(value, entity, dayLabel) {
    const state = this.hass.states[entity];
    const lastUpdated = state?.last_updated ? new Date(state.last_updated).toLocaleString() : 'Unbekannt';
    
    return html`
      <div class="tooltip">
        <div class="tooltip-content">
          <strong>${dayLabel}</strong><br>
          Prognose: ${this._formatValue(value, entity)}<br>
          <small>Aktualisiert: ${lastUpdated}</small>
        </div>
      </div>
    `;
  }

  _formatValue(value, entity) {
    const state = this.hass.states[entity];
    const unit = state?.attributes?.unit_of_measurement || 'kWh';
    return `${value.toFixed(1)} ${unit}`;
  }

  _getWeekdayName(offset) {
    const locale = this.hass.locale?.language || navigator.language || 'en';
    const cacheKey = `${offset}-${locale}-${this.config.weekday_format}`;
    
    if (!this._weekdayCache[cacheKey]) {
      const date = new Date();
      date.setDate(date.getDate() + offset);
      this._weekdayCache[cacheKey] = date.toLocaleDateString(locale, { 
        weekday: this.config.weekday_format 
      });
    }
    
    return this._weekdayCache[cacheKey];
  }

  _barWidth(value) {
    const max = parseFloat(this.config.max_value || 100);
    return Math.min((value / max) * 100, 100);
  }

  static getConfigElement() {
    return document.createElement('clock-pv-forecast-card-editor');
  }

  static getStubConfig() {
    return {
      entity_today: 'sensor.pv_forecast_today',
      entity_tomorrow: 'sensor.pv_forecast_tomorrow',
      max_value: 100,
      weekday_format: 'short'
    };
  }

  static styles = css`
    .forecast-rows {
      display: flex;
      flex-direction: column;
      gap: 0.4em;
      padding: 1em 1em 1em 1em;
    }
    
    .forecast-row {
      display: flex;
      align-items: center;
      gap: 0.8em;
    }
    
    .forecast-row.error {
      opacity: 0.6;
    }
    
    .day {
      text-align: right;
      font-weight: bold;
      color: var(--primary-text-color);
    }
    
    .bar-container {
      flex-grow: 1;
      height: 14px;
      background: var(--divider-color, #eee);
      border-radius: 7px;
      overflow: visible;
      position: relative;
    }
    
    .bar-container.rtl {
      direction: rtl;
    }
    
    .bar-container.error {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    
    .bar {
      height: 100%;
      border-radius: 7px;
      width: 0%;
      background: var(--bar-gradient);
      animation: fill-bar var(--animation-time) ease-out forwards;
    }
    
    .bar.blink {
      animation: fill-bar var(--animation-time) ease-out forwards, blink 1s infinite;
    }
    
    .value {
      width: 4.5em;
      text-align: right;
      font-size: 0.85em;
      font-weight: bold;
      white-space: nowrap;
      color: var(--secondary-text-color);
    }
    
    .value.error {
      color: var(--error-color, #e74c3c);
    }
    
    .error-text {
      font-size: 0.7em;
      color: var(--error-color, #e74c3c);
      text-align: center;
    }

    .tooltip {
      position: absolute;
      top: -60px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--card-background-color, white);
      border: 1px solid var(--divider-color, #eee);
      border-radius: 4px;
      padding: 8px;
      font-size: 0.8em;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s;
      z-index: 1000;
      white-space: nowrap;
    }

    .bar-container:hover .tooltip {
      opacity: 1;
    }

    .tooltip-content {
      text-align: center;
    }

    @keyframes fill-bar {
      to {
        width: var(--bar-width);
      }
    }

    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    @media (max-width: 480px) {
      .forecast-rows {
        gap: 0.2em;
        padding: 0.5em;
      }
      
      .value {
        font-size: 0.75em;
        width: 3.5em;
      }
      
      .day {
        font-size: 0.85em;
      }
      
      .tooltip {
        top: -50px;
        font-size: 0.7em;
      }
    }

    @media (max-width: 320px) {
      .forecast-rows {
        gap: 0.1em;
        padding: 0.3em;
      }
      
      .forecast-row {
        gap: 0.4em;
      }
    }
  `;
}

if (!customElements.get('clock-pv-forecast-card')) {
  customElements.define('clock-pv-forecast-card', ClockPvForecastCard);
}
