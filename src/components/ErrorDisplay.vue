<template>
  <div class="card bg-danger text-white">
    <div class="card-body">
      <p>{{ error.response && error.response.data ? error.response.data.message : error.message }}</p>
      <ul v-if="error.response">
        <li
          v-for="(e, key) in (error.response.data || []).errors"
          :key="key"
        >
          {{ e[0] }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: {
    error: {
      type: Error,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
