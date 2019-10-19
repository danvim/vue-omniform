import DEFAULT_SETTINGS from './DEFAULT_OMNI_ROW_SETTINGS'
import defaults from 'lodash.defaults'

const defaultTypeValues = (field) => {
  if (field.type === 'input-trans' || field.type === 'editor-trans') {
    return {}
  } else if (field.type === 'select') {
    return field.multiple ? [] : null
  }
  return null
}

const defaultValuesHelper = (fields) => Object.keys(fields).map((name) => {
  const broadField = fields[name]
  if (typeof broadField !== 'object') {
    // Hardcoded shorthand
    return { [name]: broadField }
  } else {
    const field = defaults(broadField, DEFAULT_SETTINGS)
    if (field.type === 'group') {
      // Field of fields
      return typeof field.fields === 'object' ? defaultValuesHelper(field.fields) : []
    } else if (field.type !== 'slot') {
      // Normal field and hardcoded fields
      return { [name]: field.default || defaultTypeValues(field) }
    }
  }
}).reduce((c, it) => c.concat(it), [])

/**
 * Generated a default value object for OmniForm from a form descriptor, which is usually defined in a YAML file.
 * @param {Object} fields
 * @return {Object}
 */
export const defaultValues = (fields) => Object.assign(...defaultValuesHelper(fields), { __error: null })
