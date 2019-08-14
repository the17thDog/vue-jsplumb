import { UploadCrowdNode, FilterCrowdNode } from './nodes/CrowdNode'
import { SendSmsNode } from './nodes/ActionNode'

export const NODE_REGISTER = {
  UploadCrowdNode, FilterCrowdNode,
  SendSmsNode
}

export const TYPE_MAP = Object.values(NODE_REGISTER).reduce((p, n) => Object.assign(p, { [n.getType()]: n }), {})