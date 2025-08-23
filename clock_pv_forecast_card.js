import{LitElement as X,html as N,css as Y}from"lit";console.info("\uD83D\uDCE6 clock-pv-forecast-card v0.025 loaded");class Q extends X{static properties={hass:{},config:{}};constructor(){super();this._weekdayCache={},this._dateCache={}}setConfig(q){if(!q)throw new Error("Configuration is required");if(!["entity_today","entity_tomorrow","entity_day3","entity_day4","entity_day5","entity_day6","entity_day7"].some((I)=>q[I]))throw new Error("At least one forecast entity must be defined");let G=q.display_mode||"weekday",A;if(G==="date")A=q.day_column_width||"3.5em";else if(G==="relative")A=q.day_column_width||"2.5em";else{let I={narrow:"1.5em",short:"2.5em",long:"5em"},O=q.weekday_format||"short";A=I[O]||"2.5em"}this.config={animation_duration:q.animation_duration||"1s",bar_color_start:q.bar_color_start||"#3498db",bar_color_end:q.bar_color_end||"#2ecc71",remaining_color_start:q.remaining_color_start||"#999999",remaining_color_end:q.remaining_color_end||"#cccccc",remaining_threshold:q.remaining_threshold??null,remaining_low_color_start:q.remaining_low_color_start||"#e74c3c",remaining_low_color_end:q.remaining_low_color_end||"#e67e22",remaining_blink:q.remaining_blink||!1,max_value:q.max_value??100,weekday_format:q.weekday_format||"short",display_mode:G,date_format:q.date_format||"short",relative_plus_one:q.relative_plus_one||!1,day_column_width:A,entity_remaining:q.entity_remaining||null,remaining_label:q.remaining_label||"Rest",show_tooltips:q.show_tooltips??!1,...q},this._weekdayCache={},this._dateCache={}}shouldUpdate(q){if(q.has("config"))return!0;if(q.has("hass")){let D=q.get("hass");if(!D)return!0;return[this.config.entity_today,this.config.entity_tomorrow,this.config.entity_day3,this.config.entity_day4,this.config.entity_day5,this.config.entity_day6,this.config.entity_day7,this.config.entity_remaining].filter(Boolean).some((A)=>this.hass.states[A]?.state!==D.states[A]?.state||this.hass.states[A]?.last_updated!==D.states[A]?.last_updated)}return!1}render(){let q=[this.config.entity_today&&{offset:0,entity:this.config.entity_today},this.config.entity_tomorrow&&{offset:1,entity:this.config.entity_tomorrow},this.config.entity_day3&&{offset:2,entity:this.config.entity_day3},this.config.entity_day4&&{offset:3,entity:this.config.entity_day4},this.config.entity_day5&&{offset:4,entity:this.config.entity_day5},this.config.entity_day6&&{offset:5,entity:this.config.entity_day6},this.config.entity_day7&&{offset:6,entity:this.config.entity_day7}].filter(Boolean);return N`
      <ha-card>
        <div class="forecast-rows" role="table" aria-label="PV Forecast">
          ${this.config.entity_remaining?this._renderRemainingBar():""}
          ${q.map((D,G)=>this._renderForecastRow(D,G))}
        </div>
      </ha-card>
    `}_renderForecastRow(q,D){let G=this.hass.states[q.entity];if(!G||G.state==="unavailable"||G.state==="unknown")return this._renderErrorRow(q,D,this.hass.localize("state.default.unavailable"));let A=parseFloat(G.state??"0");if(isNaN(A))return this._renderErrorRow(q,D,this.hass.localize("ui.card.weather.unknown"));let I=this._getDayLabel(q.offset),O=`--bar-width: ${this._barWidth(A)}%; --bar-gradient: linear-gradient(to right, ${this.config.bar_color_start}, ${this.config.bar_color_end}); --animation-time: ${this.config.animation_duration}`;return N`
      <div class="forecast-row" role="row" aria-label="Tag ${D+1}">
        <div class="day" role="cell" style="width: ${this.config.day_column_width}">${I}</div>
        <div class="bar-container" role="cell" aria-label="Prognose ${this._formatValue(A,q.entity)}">
          <div class="bar" style="${O}" aria-hidden="true"></div>
          ${this.config.show_tooltips?this._renderTooltip(A,q.entity,I):""}
        </div>
        <div class="value" role="cell">${this._formatValue(A,q.entity)}</div>
      </div>`}_renderErrorRow(q,D,G){let A=this._getDayLabel(q.offset);return N`
      <div class="forecast-row error" role="row" aria-label="Tag ${D+1} - Fehler">
        <div class="day" role="cell" style="width: ${this.config.day_column_width}">${A}</div>
        <div class="bar-container error" role="cell">
          <div class="error-text">${G}</div>
        </div>
        <div class="value error" role="cell">-- kWh</div>
      </div>`}_renderRemainingBar(){let q=this.hass.states[this.config.entity_remaining],D=this.config.remaining_label;if(!q||q.state==="unavailable"||q.state==="unknown")return N`
        <div class="forecast-row error">
          <div class="day" style="width: ${this.config.day_column_width}">${D}</div>
          <div class="bar-container error">
            <div class="error-text">${this.hass.localize("state.default.unavailable")}</div>
          </div>
          <div class="value error">-- kWh</div>
        </div>`;let G=parseFloat(q.state??"0");if(isNaN(G))return N`
        <div class="forecast-row error">
          <div class="day" style="width: ${this.config.day_column_width}">${D}</div>
          <div class="bar-container error">
            <div class="error-text">${this.hass.localize("ui.card.weather.unknown")}</div>
          </div>
          <div class="value error">-- kWh</div>
        </div>`;let A=this.config.remaining_threshold!==null&&G<=this.config.remaining_threshold,I=A?this.config.remaining_low_color_start:this.config.remaining_color_start,O=A?this.config.remaining_low_color_end:this.config.remaining_color_end,R=`--bar-width: ${this._barWidth(G)}%; --bar-gradient: linear-gradient(to left, ${I}, ${O}); --animation-time: ${this.config.animation_duration}`,V=A&&this.config.remaining_blink?"blink":"";return N`
      <div class="forecast-row">
        <div class="day" style="width: ${this.config.day_column_width}">${D}</div>
        <div class="bar-container rtl">
          <div class="bar ${V}" style="${R}"></div>
          ${this.config.show_tooltips?this._renderTooltip(G,this.config.entity_remaining,D):""}
        </div>
        <div class="value">${this._formatValue(G,this.config.entity_remaining)}</div>
      </div>`}_renderTooltip(q,D,G){let A=this.hass.states[D],I=A?.last_updated?new Date(A.last_updated).toLocaleString():this.hass.localize("state.default.unknown");return N`
      <div class="tooltip">
        <div class="tooltip-content">
          <strong>${G}</strong><br>
          ${this.hass.localize("ui.card.energy.forecast")||"Forecast"}: ${this._formatValue(q,D)}<br>
          <small>${this.hass.localize("ui.card.generic.last_updated")||"Last updated"}: ${I}</small>
        </div>
      </div>
    `}_formatValue(q,D){let A=this.hass.states[D]?.attributes?.unit_of_measurement||"kWh";return`${q.toFixed(1)} ${A}`}_getDayLabel(q){switch(this.config.display_mode){case"date":return this._getDateLabel(q);case"relative":return this._getRelativeLabel(q);default:return this._getWeekdayName(q)}}_getWeekdayName(q){let D=this.hass.locale?.language||navigator.language||"en",G=`weekday-${q}-${D}-${this.config.weekday_format}`;if(!this._weekdayCache[G]){let A=new Date;A.setDate(A.getDate()+q),this._weekdayCache[G]=A.toLocaleDateString(D,{weekday:this.config.weekday_format})}return this._weekdayCache[G]}_getDateLabel(q){let D=this.hass.locale?.language||navigator.language||"en",G=`date-${q}-${D}-${this.config.date_format}`;if(!this._dateCache[G]){let A=new Date;if(A.setDate(A.getDate()+q),this.config.date_format==="numeric")this._dateCache[G]=A.toLocaleDateString(D,{day:"numeric",month:"numeric"});else this._dateCache[G]=A.toLocaleDateString(D,{day:"numeric",month:"short"})}return this._dateCache[G]}_getRelativeLabel(q){if(q===0)return this.hass.localize("ui.components.relative_time.today")||"Today";else if(q===1)return this.config.relative_plus_one?"+1d":this.hass.localize("ui.components.relative_time.tomorrow")||"Tomorrow";else return`+${q}d`}_barWidth(q){let D=parseFloat(this.config.max_value||100);return Math.min(q/D*100,100)}static getConfigElement(){return document.createElement("clock-pv-forecast-card-editor")}static getStubConfig(){return{entity_today:"sensor.pv_forecast_today",entity_tomorrow:"sensor.pv_forecast_tomorrow",max_value:100,display_mode:"weekday",weekday_format:"short",date_format:"short",remaining_label:"Rest",relative_plus_one:!1}}static styles=Y`
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
  `}if(!customElements.get("clock-pv-forecast-card"))customElements.define("clock-pv-forecast-card",Q);
