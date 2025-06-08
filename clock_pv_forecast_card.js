// clock-pv-forecast-card int. Version# 0.020 – now with configurable max bar reference value
import { LitElement, html, css } from 'https://unpkg.com/lit@2.8.0/index.js?module';

console.info("📦 clock-pv-forecast-card loaded");

class ClockPvForecastCard extends LitElement {
  static properties = {
    hass: {},
    config: {},
  };

  setConfig(config) {
    const required = [
      'entity_today',
      'entity_tomorrow',
      'entity_day3',
      'entity_day4',
      'entity_day5'
    ];
    for (const key of required) {
      if (!config[key]) throw new Error(`Missing entity: ${key}`);
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
      max_value: config.max_value ?? 100,
      weekday_format: format,
      day_column_width: weekdayWidth[format] || '2.5em',
      entity_remaining: config.entity_remaining || null,
      ...config,
    };
  }

  render() {
    const forecast = [
      { offset: 0, entity: this.config.entity_today },
      { offset: 1, entity: this.config.entity_tomorrow },
      { offset: 2, entity: this.config.entity_day3 },
      { offset: 3, entity: this.config.entity_day4 },
      { offset: 4, entity: this.config.entity_day5 },
    ];

    return html`
      <ha-card>
        <div class="forecast-rows">
          ${forecast.map((item) => {
            const value = parseFloat(this.hass.states[item.entity]?.state ?? '0');
            const dayLabel = this._getWeekdayName(item.offset);
            const barStyle = `--bar-width: ${this._barWidth(value)}%; --bar-gradient: linear-gradient(to right, ${this.config.bar_color_start}, ${this.config.bar_color_end}); --animation-time: ${this.config.animation_duration}`;
            return html`
              <div class="forecast-row">
                <div class="day" style="width: ${this.config.day_column_width}">${dayLabel}</div>
                <div class="bar-container">
                  <div class="bar" style="${barStyle}"></div>
                </div>
                <div class="value">${value.toFixed(1)} kWh</div>
              </div>`;
          })}

          ${this.config.entity_remaining ? this._renderRemainingBar() : ''}
        </div>
      </ha-card>
    `;
  }

  _renderRemainingBar() {
    const remaining = parseFloat(this.hass.states[this.config.entity_remaining]?.state ?? '0');
    const belowThreshold = this.config.remaining_threshold !== null && remaining <= this.config.remaining_threshold;
    const start = belowThreshold ? this.config.remaining_low_color_start : this.config.remaining_color_start;
    const end = belowThreshold ? this.config.remaining_low_color_end : this.config.remaining_color_end;
    const barStyle = `--bar-width: ${this._barWidth(remaining)}%; --bar-gradient: linear-gradient(to left, ${start}, ${end}); --animation-time: ${this.config.animation_duration}`;
    return html`
      <div class="forecast-row">
        <div class="day" style="width: ${this.config.day_column_width}">Rest</div>
        <div class="bar-container rtl">
          <div class="bar" style="${barStyle}"></div>
        </div>
        <div class="value">${remaining.toFixed(1)} kWh</div>
      </div>`;
  }

  _getWeekdayName(offset) {
    const locale = this.hass.locale?.language || navigator.language || 'en';
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString(locale, { weekday: this.config.weekday_format });
  }

  _barWidth(value) {
    const max = parseFloat(this.config.max_value || 100);
    return Math.min((value / max) * 100, 100);
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
    .day {
      text-align: right;
      font-weight: bold;
    }
    .bar-container {
      flex-grow: 1;
      height: 14px;
      background: #eee;
      border-radius: 7px;
      overflow: hidden;
    }
    .bar-container.rtl {
      direction: rtl;
    }
    .bar {
      height: 100%;
      border-radius: 7px;
      width: 0%;
      background: var(--bar-gradient);
      animation: fill-bar var(--animation-time) ease-out forwards;
    }
    .value {
      width: 4.5em;
      text-align: right;
      font-size: 0.85em;
      font-weight: bold;
    }

    @keyframes fill-bar {
      to {
        width: var(--bar-width);
      }
    }
  `;
}

if (!customElements.get('clock-pv-forecast-card')) {
  customElements.define('clock-pv-forecast-card', ClockPvForecastCard);
}
