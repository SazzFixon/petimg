<template>
  <dashboard :petimg="petimg" />
</template>

<script>
import Vue from 'vue'
import petimg from '@petimg/core'
import { Dashboard } from '@petimg/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
  },
  computed: {
    petimg: () => new petimg(),
  },
}
</script>

<style src="@petimg/core/dist/style.css"></style>
<style src="@petimg/dashboard/dist/style.css"></style>
