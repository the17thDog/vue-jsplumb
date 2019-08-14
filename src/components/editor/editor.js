import { jsPlumb } from 'jsplumb'
import { TYPE_MAP } from './register'
import EventEmitter from './eventEmitter'

export default class FlowEditor {
  constructor (id) {
    this.eventEmitter = new EventEmitter()
    this.nodeStack = []
    this.historyStack = []
  }

  init () {
    jsPlumb.bind('connection', ({sourceId, targetId}) => {
      this.trigger('connection_done', {sourceId, targetId})
    })
  }
  /**
   * 监听编辑器事件
   */
  on (event, listener) {
    this.eventEmitter.on(event, listener)
    return this
  }
  /**
   * 监听编辑器事件
   */
  trigger (event, payload) { this.eventEmitter.trigger(event, payload) }
  /**
   * 获取所有连接线信息
   */
  getAllConnections () {
    return jsPlumb.getAllConnections()
  }
  /**
   * 获取所有连接线信息
   */
  getAllConnectionsData () {
    // 输出节点的id默认为 节点id + '__' + port
    const NODE_SPLITER = '__'
    return this.getAllConnections().map(({sourceId, targetId}) => {
      const [sid, port] = sourceId.split(NODE_SPLITER)

      return {
        source: { id: sid, port, type: this.getNode(sid).constructor.getType() },
        target: { id: targetId, port, 'input': this.getNode(targetId).constructor.getType() },
      }
    })
  }
  /**
   * 获取节点
   * @param {String} nodeId 
   */
  getNode (nodeId) { return this.nodeStack.find(n => n.id === nodeId) }
  /**
   * 添加节点
   * @param {String} type 节点类型
   * @param {Object} params
   */
  addNode (type, offset = {}, params = {}) {
    console.log(type, offset)
    const node = TYPE_MAP[type].inject(this, params)
    const { x, y } = offset
    node.setPosition(x, y)

    this.nodeStack.push(node)
  }
  /**
   * 添加节点
   * @param {String} type 节点类型
   * @param {Object} params
   */
  removeNode (nodeId) {
    jsPlumb.remove(nodeId)
    
    this.nodeStack = this.nodeStack.filter(n => n.id !== nodeId)
  }
  /**
   * 前端创造节点id, 三位
   */
  makeUUID () {
    const randomMaker = (minNum, maxNum) => {
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum * 10)
    }

    const uuids = new Set(this.nodeStack.map(n => n.id.split('_')[1]))
    while (true) {
      let n = randomMaker(0, 999)
      if (!uuids.has(n)) return n
    }
  }
}