export function State(metadata ?: string): Function {
    return (constructor: Function) => constructor.prototype.__metadata__ = metadata ?? constructor.prototype.name ;
}
