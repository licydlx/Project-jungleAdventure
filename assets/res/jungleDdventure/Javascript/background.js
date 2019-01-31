cc.Class({
    extends: cc.Component,

    properties: {
        backgroundList: {
            default: [],
            type: cc.Node
        },
        speed: 30
    },

    start() {
        // 是否滚动
        this.working = true;
        // 首页位置
        this.headPos = this.backgroundList[0].getPosition();
        // 尾页位置
        this.footPos = this.backgroundList[this.backgroundList.length - 1].getPosition();

        // 首页限制
        this.headLimit = this.headPos.x - this.backgroundList[0].getContentSize().width;
        // 尾页限制
        this.footLimit = this.footPos.x;

        // 背景滚动 监听发射事件
        this.node.on('gameFail', function (event) {
            event.stopPropagation();
            this.working = false;
        }.bind(this));

    },

    update(dt) {
        if (!this.working) return;
        // 页面滚动
        for (let i = this.backgroundList.length - 1; i >= 0; i--) {
            this.backgroundList[i].x -= dt * this.speed;
        }
        // 页面滚动限制条件
        this.checkMoveLeftAllPos();
    },

    checkMoveLeftAllPos() {
        if (this.backgroundList[0].x < this.headLimit) {
            var offset = this.footLimit - this.backgroundList[this.backgroundList.length - 1].x - this.backgroundList[this.backgroundList.length - 1].width;
            this.backgroundList[0].x = this.footLimit - offset;
            this.backgroundList.push(this.backgroundList.splice(0, 1)[0]);
        }
    },

});
