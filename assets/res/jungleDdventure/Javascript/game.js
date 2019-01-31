
cc.Class({
    extends: cc.Component,

    properties: {
        tree: {
            default: null,
            type: cc.Prefab
        },

        cloud: {
            default: null,
            type: cc.Prefab
        },

        sun: {
            default: null,
            type: cc.Prefab
        },

        gameOver: {
            default: null,
            type: cc.Prefab
        },

        backgroundList: {
            default: [],
            type: cc.Node
        },

        speed: 30
    },

    // LIFE-CYCLE CALLBACKS:
    init(){
        this.treeRunnig = true;
        this.cloudRunnig = true;
        this.sunRunnig = true;
        this.backgroundRunning = true;


    },

    onLoad() {
        this.createTree();
        this.createCloud();
        this.createSun();
        
        // 首页位置
        this.headPos = this.backgroundList[0].getPosition();
        // 尾页位置
        this.footPos = this.backgroundList[this.backgroundList.length - 1].getPosition();

        // 首页限制
        this.headLimit = this.headPos.x - this.backgroundList[0].getContentSize().width;
        // 尾页限制
        this.footLimit = this.footPos.x;

        this.node.on('gameOver', function (event) {
            event.stopPropagation();
            this.treeRunnig = false;
            this.cloudRunnig = false;
            this.sunRunnig = false;
            this.backgroundRunning = false;

            let action = cc.fadeOut(1.0);
            this.treeObj.runAction(action);

            setTimeout(function(){
                this.createGameOver();
            }.bind(this),1300);
            
        }.bind(this));

        this.init();
    },

    start() {

    },

    update(dt) {
        // 树
        if (this.treeRunnig) {
            this.treeObj.x -= 100 * dt;
            if (this.treeObj.x < -100) {
                this.treeObj.removeFromParent();
                this.createTree();
            }
        }

        // 云
        if (this.cloudRunnig) {
            this.cloudObj.x -= 80 * dt;
            if (this.cloudObj.x < -90) {
                this.cloudObj.removeFromParent();
                this.createCloud();
            }
        }

        // 太阳
        if (this.sunRunnig) {
            this.hairObj.angle += 60 * dt;
        }

        // 背景滚动
        if (this.backgroundRunning){
            // 页面滚动
            for (let i = this.backgroundList.length - 1; i >= 0; i--) {
                this.backgroundList[i].x -= dt * this.speed;
            }
            // 页面滚动限制条件
            this.checkMoveLeftAllPos();
        };

    },

    // 封面
    goCover(){
        var Cover = this.node.parent.getChildByName('Cover');
        console.log(Cover);
        Cover.setPosition(cc.v2(0,0));
    },

    // gameOver 
    createGameOver(){
        var gameOver = cc.instantiate(this.gameOver);
        gameOver.parent = this.node;
    },

    // 生成树
    createTree() {
        var tree = cc.instantiate(this.tree);
        var horizon = this.node.getChildByName("horizon");
        tree.parent = horizon;
        this.treeObj = horizon.getChildByName("tree");
    },

    // 生成云
    createCloud() {
        var cloud = cc.instantiate(this.cloud);
        cloud.parent = this.node;
        this.cloudObj = this.node.getChildByName("cloud");
    },

    // 生成太阳
    createSun(){
        var sun = cc.instantiate(this.sun);
        sun.parent = this.node;
        this.sunObj = this.node.getChildByName("sun");
        this.hairObj = this.sunObj.getChildByName("hair");
    },
    
    // 背景滚动
    checkMoveLeftAllPos() {
        if (this.backgroundList[0].x < this.headLimit) {
            var offset = this.footLimit - this.backgroundList[this.backgroundList.length - 1].x - this.backgroundList[this.backgroundList.length - 1].width;
            this.backgroundList[0].x = this.footLimit - offset;
            this.backgroundList.push(this.backgroundList.splice(0, 1)[0]);
        }
    },

});
