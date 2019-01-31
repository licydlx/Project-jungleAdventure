cc.Class({
    extends: cc.Component,

    properties: {
        hair: {
            default: null,
            type: cc.Node
        }
    },
    onLoad() {
        var repeat = cc.repeatForever(cc.rotateBy(1.0, 90));
        this.hair.runAction(repeat);
        // 监听发射事件
        this.node.on('gameOver', function (event) {
            event.stopPropagation();

            // 暂停本节点上所有正在运行的动作
            // this.hair.pauseAllActions();

            // 停止并且移除所有正在运行的动作列表
            this.hair.stopAllActions();

        }.bind(this));
    }
});
