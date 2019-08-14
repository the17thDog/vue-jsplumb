import AbstractNode from './basic'

export class ActionNode extends AbstractNode {
  constructor (editor, desc) {
    super(editor)
    this.LABEL_TEXT = desc
    this.MAIN_COLOR = 'red'
    this.outputPorts = [{ label: '国内', name: 'api' }]
  }

  init () {
    super.init()
  }
}

export class SendSmsNode extends ActionNode {
  static getType () { return 'SendSmsNode' }

  constructor (editor) {
    super(editor, '发送短信')
  }
}