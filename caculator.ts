class Caculator {
  // 操作数1
  public n1;
  // 操作
  public operate;
  // 操作数2
  public n2;
  public container: HTMLDivElement;
  public span: HTMLSpanElement;
  public output: HTMLDivElement;
  public result: string;
  public keys: Array<Array<string>> = [
    ["clear", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="]
  ];
  constructor() {
    this.createContainer();
    this.createOutput();
    this.createButtons();
    this.bindEvent();
  }
  // 创建计算器 container
  createContainer() {
    let container: HTMLDivElement = document.createElement("div");
    container.className = "container";
    this.container = container;
    document.body.appendChild(this.container);
  }
  // 创建 output
  createOutput() {
    let output: HTMLDivElement = document.createElement("div");
    output.className = "output";
    let span: HTMLSpanElement = document.createElement("span");
    span.textContent = "0";
    this.span = span;
    output.appendChild(this.span);
    this.output = output;
    this.container.appendChild(output);
  }
  // 创建按钮
  createButton(text: string, container: HTMLDivElement, className: string) {
    let button: HTMLButtonElement = document.createElement("button");
    button.className = className;
    button.textContent = text;
    return button;
  }
  // 生成所有按钮
  createButtons() {
    this.keys.forEach((textList: Array<string>) => {
      let div: HTMLDivElement = document.createElement("div");
      textList.forEach((text: string) => {
        let button: HTMLButtonElement = this.createButton(
          text,
          this.container,
          `button text-${text}`
        );
        div.appendChild(button);
      });
      this.container.appendChild(div);
    });
  }
  // 更新左 / 右操作数
  numberOperate(key, text) {
    if (this[key]) {
      this[key] += text
    } else {
      this[key] = text
    }

    this.span.textContent = this[key];
  }
  // 更新操作数
  updateNum(text: string) {
    // 没有点击操作
    if (!this.operate) {
      this.numberOperate("n1", text);
    } else {
      this.numberOperate("n2", text);
    }
  }
  // 更新结果
  updateResult(text: string) {
    // 操作符
    let { operate, n1, n2 } = this;
    // 结果
    let result;

    if (!operate || !n1 || !n2) return

    n1 = parseFloat(n1)
    n2 = parseFloat(n2)

    if (operate === "+") {
      result = n1 + n2;
    } else if (operate === "-") {
      result = n1 - n2;
    } else if (operate === "×") {
      result = n1 * n2;
    } else if (operate === "÷") {
      result = n1 / n2;
    }

    this.span.textContent = result;
    this.result = result;
    this.n1 = ''
    this.n2 = ''
    this.operate = ''
  }
  // 监听点击事件
  bindEvent() {
    this.container.addEventListener("click", event => {
      // 触发点击事件的是按钮元素
      if (event.target instanceof HTMLButtonElement) {
        let text = event.target.textContent;

        // 数字
        if ("0123456789.".indexOf(text) >= 0) {
          this.updateNum(text);
        } else if ("+-×÷".indexOf(text) >= 0) {
          this.operate = text;
          if (!this.n1) {
            this.n1 = this.result
          }
        } else if (text === "=") {
          this.updateResult(text);
        } else if (text === "clear") {
          this.operate = "";
          this.n1 = "";
          this.n2 = "";
          this.span.textContent = "0";
          this.result = '0'
        }
      }
    });
  }
}

new Caculator();
