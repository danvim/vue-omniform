import Vue from 'vue'
import { defaultValues } from './utils/DefaultValues'
import DEFAULT_OMNI_ROW_SETTINGS from './utils/DEFAULT_OMNI_ROW_SETTINGS'

const req = require.context('./components/', true, /\.(js|vue)$/i)
const Components = Object.assign({}, ...req.keys().map((key) => req(key).default).map((c) => ({ [c.name]: c })))

Vue.component('OmniForm', Components.OmniFOrm)

export {
  Components,
  defaultValues,
  DEFAULT_OMNI_ROW_SETTINGS
}
