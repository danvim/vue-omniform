<template>
  <div>
    <h5
      v-if="label"
      @click="toggleCollapse"
    >
      {{ label }}
      <small
        v-if="collapsible"
        class="text-muted"
      >
        <i
          class="fas fa-fw"
          :class="collapsed ? 'fa-chevron-down' : 'fa-chevron-up'"
        />
      </small>
    </h5>
    <div v-if="!collapsed">
      <div
        v-for="field in fieldsArray"
        :key="field.name"
      >
        <slot :name="'before-' + field.name" />
        <omni-row
          v-if="field.type !== 'group'"
          v-model="m[field.name]"
          :model="m"
          :field="field"
          :transformers="transformers"
          :transformed="t || transformed"
        >
          <slot
            slot="help"
            :name="field.name"
          />
        </omni-row>
        <div
          v-else
          class="mt-5"
        >
          <omni-form
            :fields="field.fields"
            :model="m"
            :transformers="transformers"
            :t="transformed"
            :label="field.label"
            :collapsible="field.collapsible"
            :default-collapsed="field.defaultCollapsed"
          />
        </div>
        <slot :name="'after-' + field.name" />
      </div>
    </div>
    <error-display
      v-if="!t && m.__error"
      class="my-5"
      :error="m.__error"
    />
  </div>
</template>

<script>
import OmniRow from './OmniRow'
import DEFAULT_SETTINGS from '../utils/DEFAULT_OMNI_ROW_SETTINGS'
import ErrorDisplay from './ErrorDisplay'
import axios from 'axios'
import { defaultValues } from '../utils/DefaultValues'
import defaults from 'lodash.defaults'

export default {
  name: 'OmniForm',
  components: { ErrorDisplay, OmniRow },
  props: {
    model: {
      type: Object,
      default: null
    },
    fields: {
      type: Object,
      required: true
    },
    transformers: {
      type: Object,
      default: () => ({})
    },
    defaultTransformed: {
      type: Object,
      default: null
    },
    /**
     * @var {function(transformed: object): object} injectBeforeSend
     */
    injectBeforeSend: {
      type: Function,
      default: () => {}
    },
    resource: {
      type: String,
      default: null
    },
    resourceOriginal: {
      type: Object,
      default: () => ({})
    },
    method: {
      type: String,
      default: 'post'
    },
    label: {
      type: String,
      default: null
    },
    collapsible: {
      type: Boolean,
      default: false
    },
    defaultCollapsed: {
      type: Boolean,
      default: false
    },
    t: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      m: {},
      transformed: {},
      collapsed: this.defaultCollapsed
    }
  },
  computed: {
    fieldsArray () {
      return Object.keys(this.fields)
        .filter((name) => typeof this.fields[name] === 'object' && this.visible(this.fields[name]))
        .map((name) => defaults({
          name: name,
          ...this.fields[name]
        }, DEFAULT_SETTINGS))
    }
  },
  watch: {
    transformed: {
      deep: true,
      immediate: true,
      handler (value) {
        this.$emit('input', value)
      }
    }
  },
  created () {
    this.transformers.__identity = this.transformers.__identity || ((i) => i)
    this.transformers.mapId = this.transformers.mapId || ((i) => i.map((j) => j.id))
    this.transformers.id = this.transformers.id || ((i) => i.id)

    this.transformed = this.defaultTransformed || defaultValues(this.fields)
    this.m = this.model || defaultValues(this.fields)
  },
  methods: {
    toggleCollapse () {
      if (this.collapsible) {
        this.collapsed = !this.collapsed
      }
    },
    visible (field) {
      if (typeof field !== 'object') {
        return false
      }
      return (
        (field.type !== 'hardcoded')
      )
    },
    send () {
      return new Promise((resolve, reject) => {
        const dataParam = ['put', 'post', 'patch'].indexOf(this.method) > -1 ? 'data' : 'params'
        if (this.resource !== null) {
          axios.request({
            url: this.resource,
            method: this.method,
            [dataParam]: {
              ...this.resourceOriginal,
              ...this.transformed,
              ...this.injectBeforeSend(this.transformed)
            }
          }).then((res) => {
            resolve(res)
          }).catch((e) => {
            this.$set(this.m, '__error', e)
            reject(e)
          })
        } else {
          reject(new Error('Resource URL is not set.'))
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
