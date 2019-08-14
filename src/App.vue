<template>
  <div id="app">
    <FlowEditor />
  </div>
</template>

<script>

import FlowEditor from './components/editor/FlowEditor'
export default {
  name: 'app',
  components: {
    FlowEditor
  }
}
</script>

<style>
html { height: 100% }
body { height: 100% }
#app { height: 100% }
</style>
