/**
 * Minified by jsDelivr using Terser v3.14.1.
 * Original file: /gh/bramkragten/custom-ui@null/weather-card/weather-card.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
const LitElement=Object.getPrototypeOf(customElements.get("ha-panel-lovelace")),html=LitElement.prototype.html,weatherIconsDay={clear:"day","clear-night":"night",cloudy:"cloudy",fog:"cloudy",hail:"rainy-7",lightning:"thunder","lightning-rainy":"thunder",partlycloudy:"cloudy-day-3",pouring:"rainy-6",rainy:"rainy-5",snowy:"snowy-6","snowy-rainy":"rainy-7",sunny:"day",windy:"cloudy","windy-variant":"cloudy-day-3",exceptional:"!!"},weatherIconsNight={...weatherIconsDay,clear:"night",sunny:"night",partlycloudy:"cloudy-night-3","windy-variant":"cloudy-night-3"},windDirections=["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW","N"],fireEvent=(t,e,i,n)=>{n=n||{},i=null==i?{}:i;const a=new Event(e,{bubbles:void 0===n.bubbles||n.bubbles,cancelable:Boolean(n.cancelable),composed:void 0===n.composed||n.composed});return a.detail=i,t.dispatchEvent(a),a};function hasConfigOrEntityChanged(t,e){if(e.has("_config"))return!0;const i=e.get("hass");return!i||(i.states[t._config.entity]!==t.hass.states[t._config.entity]||i.states["sun.sun"]!==t.hass.states["sun.sun"])}class WeatherCard extends LitElement{static get properties(){return{_config:{},hass:{}}}static async getConfigElement(){return await import("./weather-card-editor.js"),document.createElement("weather-card-editor")}static getStubConfig(){return{}}setConfig(t){if(!t.entity)throw new Error("Please define a weather entity");this._config=t}shouldUpdate(t){return hasConfigOrEntityChanged(this,t)}render(){if(!this._config||!this.hass)return html``;const t=this.hass.states[this._config.entity];if(!t)return html`
        <style>
          .not-found {
            flex: 1;
            background-color: yellow;
            padding: 8px;
          }
        </style>
        <ha-card>
          <div class="not-found">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;const e=this.hass.selectedLanguage||this.hass.language,i=new Date(this.hass.states["sun.sun"].attributes.next_rising),n=new Date(this.hass.states["sun.sun"].attributes.next_setting);return html`
      ${this.renderStyle()}
      <ha-card @click="${this._handleClick}">
        <span
          class="icon bigger"
          style="background: none, url(${this.getWeatherIcon(t.state.toLowerCase(),this.hass.states["sun.sun"].state)}) no-repeat; background-size: contain;"
          >${t.state}
        </span>
        ${this._config.name?html`
                <span class="title"> ${this._config.name} </span>
              `:""}
        <span class="temp"
          >${"°F"==this.getUnit("temperature")?Math.round(t.attributes.temperature):t.attributes.temperature}</span
        >
        <span class="tempc"> ${this.getUnit("temperature")}</span>
        <span>
          <ul class="variations">
            <li>
              <span class="ha-icon"
                ><ha-icon icon="mdi:water-percent"></ha-icon
              ></span>
              ${t.attributes.humidity}<span class="unit"> % </span>
              <br />
              <span class="ha-icon"
                ><ha-icon icon="mdi:weather-windy"></ha-icon
              ></span>
              ${windDirections[parseInt((t.attributes.wind_bearing+11.25)/22.5)]}
              ${t.attributes.wind_speed}<span class="unit">
                ${this.getUnit("length")}/h
              </span>
              <br />
              <span class="ha-icon"
                ><ha-icon icon="mdi:weather-sunset-up"></ha-icon
              ></span>
              ${i.toLocaleTimeString()}
            </li>
            <li>
              <span class="ha-icon"><ha-icon icon="mdi:gauge"></ha-icon></span
              >${t.attributes.pressure}<span class="unit">
                ${this.getUnit("air_pressure")}
              </span>
              <br />
              <span class="ha-icon"
                ><ha-icon icon="mdi:weather-fog"></ha-icon
              ></span>
              ${t.attributes.visibility}<span class="unit">
                ${this.getUnit("length")}
              </span>
              <br />
              <span class="ha-icon"
                ><ha-icon icon="mdi:weather-sunset-down"></ha-icon
              ></span>
              ${n.toLocaleTimeString()}
            </li>
          </ul>
        </span>
        ${t.attributes.forecast&&t.attributes.forecast.length>0?html`
                <div class="forecast clear">
                  ${t.attributes.forecast.slice(0,5).map(t=>html`
                        <div class="day">
                          <span class="dayname"
                            >${new Date(t.datetime).toLocaleDateString(e,{weekday:"short"})}</span
                          >
                          <br /><i
                            class="icon"
                            style="background: none, url(${this.getWeatherIcon(t.condition.toLowerCase())}) no-repeat; background-size: contain;"
                          ></i>
                          <br /><span class="highTemp"
                            >${t.temperature}${this.getUnit("temperature")}</span
                          >
                          ${void 0!==t.templow?html`
                                  <br /><span class="lowTemp"
                                    >${t.templow}${this.getUnit("temperature")}</span
                                  >
                                `:""}
                        </div>
                      `)}
                </div>
              `:""}
      </ha-card>
    `}getWeatherIcon(t,e){return`${this._config.icons?this._config.icons:"https://cdn.jsdelivr.net/gh/bramkragten/custom-ui@master/weather-card/icons/animated/"}${e&&"below_horizon"==e?weatherIconsNight[t]:weatherIconsDay[t]}.svg`}getUnit(t){const e=this.hass.config.unit_system.length;switch(t){case"air_pressure":return"km"===e?"hPa":"inHg";case"length":return e;case"precipitation":return"km"===e?"mm":"in";default:return this.hass.config.unit_system[t]||""}}_handleClick(){fireEvent(this,"hass-more-info",{entityId:this._config.entity})}getCardSize(){return 3}renderStyle(){return html`
      <style>
        ha-card {
          cursor: pointer;
          margin: auto;
          padding-top: 2.5em;
          padding-bottom: 1.3em;
          padding-left: 1em;
          padding-right: 1em;
          position: relative;
        }

        .clear {
          clear: both;
        }

        .ha-icon {
          height: 18px;
          margin-right: 5px;
          color: var(--paper-item-icon-color);
        }

        .title {
          position: absolute;
          left: 3em;
          top: 0.6em;
          font-weight: 300;
          font-size: 3em;
          color: var(--primary-text-color);
        }
        .temp {
          font-weight: 300;
          font-size: 4em;
          color: var(--primary-text-color);
          position: absolute;
          right: 1em;
          top: 0.3em;
        }

        .tempc {
          font-weight: 300;
          font-size: 1.5em;
          vertical-align: super;
          color: var(--primary-text-color);
          position: absolute;
          right: 1em;
          margin-top: -14px;
          margin-right: 7px;
        }

        .variations {
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          font-weight: 300;
          color: var(--primary-text-color);
          list-style: none;
          margin-top: 4.5em;
          padding: 0;
        }

        .variations li {
          flex-basis: auto;
        }

        .variations li:first-child {
          padding-left: 1em;
        }

        .variations li:last-child {
          padding-right: 1em;
        }

        .unit {
          font-size: 0.8em;
        }

        .forecast {
          width: 100%;
          margin: 0 auto;
          height: 9em;
        }

        .day {
          display: block;
          width: 20%;
          float: left;
          text-align: center;
          color: var(--primary-text-color);
          border-right: 0.1em solid #d9d9d9;
          line-height: 2;
          box-sizing: border-box;
        }

        .dayname {
          text-transform: uppercase;
        }

        .forecast .day:first-child {
          margin-left: 0;
        }

        .forecast .day:nth-last-child(1) {
          border-right: none;
          margin-right: 0;
        }

        .highTemp {
          font-weight: bold;
        }

        .lowTemp {
          color: var(--secondary-text-color);
        }

        .icon.bigger {
          width: 10em;
          height: 10em;
          margin-top: -4em;
          position: absolute;
          left: 0em;
        }

        .icon {
          width: 50px;
          height: 50px;
          margin-right: 5px;
          display: inline-block;
          vertical-align: middle;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          text-indent: -9999px;
        }

        .weather {
          font-weight: 300;
          font-size: 1.5em;
          color: var(--primary-text-color);
          text-align: left;
          position: absolute;
          top: -0.5em;
          left: 6em;
          word-wrap: break-word;
          width: 30%;
        }
      </style>
    `}}customElements.define("weather-card",WeatherCard);
//# sourceMappingURL=/sm/de3b96d10346e6cd2b0ec9f4b91d80a6cb18b60ac87ce5385a4a5bd577df0782.map
