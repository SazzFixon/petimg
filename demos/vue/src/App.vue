<template>
  <div id="app">
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
    <dashboard
      v-if="showInlineDashboard"
      :petimg="petimg"
      :props="{
        metaFields: [{ id: 'name', name: 'Name', placeholder: 'File name' }],
      }"
    />
    <h2>Modal Dashboard</h2>
    <div>
      <button @click="open = true">Show Dashboard</button>
      <dashboard-modal
        :petimg="petimg2"
        :open="open"
        :props="{
          onRequestCloseModal: handleClose,
        }"
      />
    </div>

    <h2>Drag Drop Area</h2>
    <drag-drop
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
    <progress-bar
      :petimg="petimg"
      :props="{
        hideAfterFinish: false,
      }"
    />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'
import petimg from '@petimg/core'
import Tus from '@petimg/tus'
import { Dashboard, DashboardModal, DragDrop, ProgressBar } from '@petimg/vue'

export default {
  name: 'App',
  components: {
    Dashboard,
    DashboardModal,
    DragDrop,
    ProgressBar,
  },
  computed: {
    petimg: () =>
      new petimg({ id: 'petimg1', autoProceed: true, debug: true }).use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
      }),
    petimg2: () =>
      new petimg({ id: 'petimg2', autoProceed: false, debug: true }).use(Tus, {
        endpoint: 'https://tusd.tusdemo.net/files/',
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
}
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
