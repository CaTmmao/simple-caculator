var Caculator = /** @class */ (function () {
    function Caculator() {
        this.keys = [
            ["clear", "÷"],
            ["7", "8", "9", "×"],
            ["4", "5", "6", "-"],
            ["1", "2", "3", "+"],
            ["0", ".", "="]
        ];
        this.createContainer();
        this.createOutput();
        this.createButtons();
        this.bindEvent();
    }
    // 创建计算器 container
    Caculator.prototype.createContainer = function () {
        var container = document.createElement("div");
        container.className = "container";
        this.container = container;
        document.body.appendChild(this.container);
    };
    // 创建 output
    Caculator.prototype.createOutput = function () {
        var output = document.createElement("div");
        output.className = "output";
        var span = document.createElement("span");
        span.textContent = "0";
        this.span = span;
        output.appendChild(this.span);
        this.output = output;
        this.container.appendChild(output);
    };
    // 创建按钮
    Caculator.prototype.createButton = function (text, container, className) {
        var button = document.createElement("button");
        button.className = className;
        button.textContent = text;
        return button;
    };
    // 生成所有按钮
    Caculator.prototype.createButtons = function () {
        var _this = this;
        this.keys.forEach(function (textList) {
            var div = document.createElement("div");
            textList.forEach(function (text) {
                var button = _this.createButton(text, _this.container, "button text-" + text);
                div.appendChild(button);
            });
            _this.container.appendChild(div);
        });
    };
    // 监听点击事件
    Caculator.prototype.bindEvent = function () {
        var _this = this;
        this.container.addEventListener("click", function (event) {
            // 触发点击事件的是按钮元素
            if (event.target instanceof HTMLButtonElement) {
                var text = event.target.textContent;
                // 数字
                if ("0123456789".indexOf(text) >= 0) {
                    var _a = _this, operate = _a.operate, n1 = _a.n1, n2 = _a.n2;
                    // 没有点击操作
                    if (!operate) {
                        if (n1) {
                            _this.n1 = parseInt(n1 + "text");
                        }
                        else {
                            _this.n1 = parseInt(text);
                        }
                        _this.span.textContent = _this.n1;
                    }
                    else {
                        if (n2) {
                            _this.n2 = parseInt(n2 + "text");
                        }
                        else {
                            _this.n2 = parseInt(text);
                        }
                        _this.span.textContent = _this.n2;
                    }
                }
                else if ("+-×÷".indexOf(text) >= 0) {
                    // 操作
                    _this.operate = text;
                }
                else if (text === "=") {
                    // 计算结果
                    // 操作符
                    var _b = _this, operate = _b.operate, n1 = _b.n1, n2 = _b.n2;
                    // 结果
                    var result = void 0;
                    if (operate === "+") {
                        result = n1 + n2;
                    }
                    else if (operate === "-") {
                        result = n1 - n2;
                    }
                    else if (operate === "×") {
                        result = n1 * n2;
                    }
                    else if (operate === "÷") {
                        result = n1 / n2;
                    }
                    _this.span.textContent = result;
                }
                else if (text === "clear") {
                    // 清空
                    _this.operate = "";
                    _this.n1 = "";
                    _this.n2 = "";
                    _this.span.textContent = '0';
                }
            }
        });
    };
    return Caculator;
}());
new Caculator();
