<script setup>
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@petimg/vue'
</script>

<template>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to petimg Vue Demo"/> -->
    <h1>Welcome to petimg Vue Demo!</h1>
    <h2>Inline Dashboard</h2>
    <label>
      <input
        type="checkbox"
        :checked="showInlineDashboard"
        @change="
          (event) => {
            showInlineDashboard = event.target.checked
          }
        "
      />
      Show Dashboard
    </label>
    <Dashboard
      v-if="showInlineDashboard"
      :petimg="petimg"
      :props="{
        metaFields: [{ id: 'name', name: 'Name', placeholder: 'File name' }],
      }"
    />
    <h2>Modal Dashboard</h2>
    <div>
      <button @click="open = true">Show Dashboard</button>
      <DashboardModal
        :petimg="petimg2"
        :open="open"
        :props="{
          onRequestCloseModal: handleClose,
        }"
      />
    </div>

    <h2>Drag Drop Area</h2>
    <DragDrop
      :petimg="petimg"
      :props="{
        locale: {
          strings: {
            chooseFile: 'Boop a file',
            orDragDrop: 'or yoink it here',
          },
        },
      }"
    />

    <h2>Progress Bar</h2>
    <ProgressBar
      :petimg="petimg"
      :props="{
        hideAfterFinish: false,
      }"
    />
  </div>
</template>

<script>
import petimg from '@petimg/core'
import Tus from '@petimg/tus'
import { defineComponent } from 'vue'

const { VITE_TUS_ENDPOINT: TUS_ENDPOINT } = import.meta.env

export default defineComponent({
  computed: {
    petimg: () =>
      new petimg({ id: 'petimg1', autoProceed: true, debug: true }).use(Tus, {
        endpoint: TUS_ENDPOINT,
      }),
    petimg2: () =>
      new petimg({ id: 'petimg2', autoProceed: false, debug: true }).use(Tus, {
        endpoint: TUS_ENDPOINT,
      }),
  },
  data() {
    return {
      open: false,
      showInlineDashboard: false,
    }
  },
  methods: {
    handleClose() {
      this.open = false
    },
  },
})
</script>

<style src="@petimg/core/dist/style.css"></style>
<style src="@petimg/dashboard/dist/style.css"></style>
<style src="@petimg/drag-drop/dist/style.css"></style>
<style src="@petimg/progress-bar/dist/style.css"></style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
