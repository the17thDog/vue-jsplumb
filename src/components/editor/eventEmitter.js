// 观察者模式
export default class EventEmitter {
  constructor () {
    this.watcher = {}
  }

  addListener (event, listener) {
    if (!this.watcher[event]) {
      this.watcher[event] = []
    }

    this.watcher[event].push(listener)
    if (this.watcher[event].includes(listener)) return

    return this
  }

  on (event, listener) {
    this.addListener(event, listener)
  }

  removeListener (event, listener) {
    if (!this.watcher[event]) return

    const idx = this.watcher[event].indexOf(listener)
    this.watcher[event].splice(idx, 1)

    return this
  }

  off (event, listener) {
    this.removeListener(event, listener)
  }

  addOnceListener (event, listener) {
    const onceWrapper = () => {
      listener()
      this.removeListener(event, listener)
    }

    return this.addListener(event, onceWrapper)
  }

  removeEvent (event) {
    delete this.watcher[event]
    
    return this
  }

  emitEvent (event, payload) {
    if (!this.watcher[event]) return
    this.watcher[event].forEach(f => f(payload))

    return this
  }

  trigger (event, payload) {
    this.emitEvent(event, payload)
  }
}