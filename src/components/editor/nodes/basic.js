import $ from 'jquery';
import { jsPlumb } from 'jsplumb'

export default class AbstractNode {
  static inject () {
    const obj = new this(editor)
    obj.init()
    
    return obj
  }

  get figureEL () { return $(`#${this.id}`) } 

  constructor (editor) {
    this.editor = editor
    this.id = `${this.constructor.getType()}_${editor.makeUUID()}`
    this.description = '无'
    this.LABEL_TEXT = '节点'
    this.MAIN_COLOR = '#fff'
    this.height = 100
    this.width = 150
    this.userDate = {}
    this.labelFigure = ''
    this.inputPorts = []
    this.outputPorts = []
  }

  init () {
    this.renderFigure()
    this.renderPort()
    this.addFigureEventListener()

    jsPlumb.draggable(this.id, { containment: 'parent' })
    // jsPlumb.connect({
    //   source: 'item_left',
    //   target: 'item_right',
    //   paintStyle: { stroke: 'lightgray', strokeWidth: 3 },
    //   endpointStyle: { fill: 'lightgray', outlineStroke: 'darkgray', outlineWidth: 2 }
    // })
  }

  setPosition (x, y) {
    const invalidValue = [null, undefined]
    if ([x, y].some(v => invalidValue.includes(v))) return
    
    this.figureEL.css({
      left: x + 'px',
      top: y + 'px'
    })
    // 需要重新绘制
    jsPlumb.revalidate(this.figureEL)
  }

  addFigureEventListener () {
    this.figureEL.on('click', () => {
      this.editor.trigger('node_click', this)
    })
  }

  renderFigure () {
    const FIGURE = `
      <div id=${this.id} class="flow-node">
        <p>${this.LABEL_TEXT}</p>
      </div>
    `
    const FIGURE_STYLE = {
      height: '100px',
      width: '150px',
      backgroundColor: this.MAIN_COLOR,
      borderRadius: '2px',
      position: 'absolute'
    }

    $('.points').append(FIGURE)
    this.figureEL.css(FIGURE_STYLE)
  }

  renderPort () {
    const common = {
      connector: ['Flowchart'],
      endpoint: ['Dot', {
        radius: 6,
        fill: 'pink'
      }],
      paintStyle: {
        strokeStyle: '#1e8151',
        stroke: '#7AB02C',
        fill: 'pink',
        fillStyle: '#1e8151',
        radius: 6,
        lineWidth: 2
      },
      hoverPaintStyle: {
        outlineStroke: 'lightblue'
      },
      connectorStyle: {
        outlineStroke: 'green',
      },
      connectorHoverStyle: {
        strokeWidth: 1
      }
    }

    const PORT_SPLITER = '__'
    this.outputPorts.forEach((port, i) => {
      const portId = this.id + PORT_SPLITER + port.name
      this.figureEL.append(`<div id=${portId}>${port.label}</div>`)
      $(`#${portId}`).css({
        right: -10,
        top: i * 25 + 40 + 'px',
        width: '40px',
        height: '20px',
        position: 'absolute',
        backgroundColor: '#eee',
        fontSize: '12px'
      })
    })
      
    jsPlumb.addEndpoint(this.id, { anchor: 'Left' }, { ...common, isTarget: true })
    // 输出端口
    this.outputPorts.forEach(port => {
      const id = this.id + PORT_SPLITER + port.name
      jsPlumb.addEndpoint(id, { anchor: 'Right', uuid: id }, { ...common, isSource: true, connector: ['Flowchart']})
    })
  }
}