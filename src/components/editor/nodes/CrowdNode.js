import AbstractNode from './basic'

export class CrowdNode extends AbstractNode {
  static getType () { return 'CrowdNode' }

  constructor (editor, desc) {
    super(editor)
    this.LABEL_TEXT = desc
    this.MAIN_COLOR = '#999'
    this.outputPorts = [{ label: 'api', name: 'api' }, { label: 'timed', name: 'timed' }]
  }

  init () {
    super.init()
  }
}

export class FilterCrowdNode extends CrowdNode {
  static getType () { return 'FilterCrowdNode' }

  constructor (editor) {
    super(editor, '人群筛选')
  }
}

export class UploadCrowdNode extends CrowdNode {
  static getType () { return 'UploadCrowdNode' }

  constructor (editor) {
    super(editor, '上传人群')
  }
}