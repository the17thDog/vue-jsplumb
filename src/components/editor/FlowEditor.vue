<script>
import AbstractNode from './nodes/basic'
import { jsPlumb } from 'jsplumb'
import FlowEditor from './editor'

export default {
  data () {
    return {
      editor: null
    }
  },

  methods: {
    addListener () {
      this.editor
        .on('node_click', data => { console.log(data) })
        .on('connection_done', ({sourceId, targetId}) => { console.log(sourceId, targetId) })
    },

    onStartDrag (e) {
      e.preventDefault()
    },

    onDrop (e) {
      const { clientX, clientY, dataset } = e
    },

    onDragEnd (e) {
      const { clientX, clientY, target } = e
      console.log(clientX, clientY)
      const nodeType = target.dataset.type
      this.editor.addNode(nodeType, {x: clientX, y: clientY })
    }
  },

  mounted() {
    jsPlumb.ready(() => {
      this.editor = new FlowEditor()
      this.editor.init()
      window.editor = this.editor

      this.addListener()
    })
  },
}
</script>

<template>
  <div class="panel-body points demo flow_chart" id="points" @dragend="onDragEnd">
    <div class="node-drag-area">
      <div
        data-type="UploadCrowdNode"
        class="node-drag"
        draggable="true"
        @dragover="onStartDrag"
      >上传节点</div>

      <div
        data-type="FilterCrowdNode"
        class="node-drag filter-node"
        draggable="true"
        @dragover="onStartDrag"
      >筛选节点</div>

      <div
        data-type="SendSmsNode"
        class="node-drag action-node"
        draggable="true"
        @dragover="onStartDrag"
      >发短信</div>
    </div>
  </div>
</template>


<style>
  .jtk-hover {
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
  }

  .jtk-dragged {
    opacity: 0.5;
    cursor: move;
  }

  .jtk-drag-select {
    cursor: pointer;
  }

  .panel-body {
    height: 100%;
  }

  .node-drag {
    height: 50px;
    width: 100px;
    background-color: salmon
  }

  .filter-node {
    background-color: #eee;
  }

  .action-node {
    background-color: red;
  }
</style>
