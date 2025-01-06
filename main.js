const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let currentInput = ""; //現在の入力されている値
let previousInput = ""; //直前の入力値
let operator = ""; //押された演算子(+, -, *, /)


const calculate = () => {
  if (previousInput && operator && currentInput) {
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        if (b !== 0) {
          return a / b;
        } else {
          return "Error";
        }
      default:
        return b;
    }
  }
  return currentInput;
};


// ボタンをクリックしたときのイベントリスナー
buttons.addEventListener("click", (e) => {
  const button = e.target;

  // 数値ボタンが押されたとき
  if (button.dataset.value) {
    if (button.dataset.value === "0" && currentInput === "0") return;
    if (button.dataset.value === "." && currentInput.includes(".")) return;
    currentInput += button.dataset.value;
    display.textContent = currentInput || "0";
  }


  // 演算子（+, -, *, /）ボタンを押したとき
  if (["+", "-", "*", "/"].includes(button.dataset.value)) {
    if (!currentInput && !previousInput) return; //入力がなければ何もしない
    if (currentInput && previousInput && operator) {
      currentInput = calculate();
      display.textContent = currentInput; //すでに演算子が設定されている場合,途中の計算結果表示する
    }
    operator = button.dataset.value; //演算子を保存
    previousInput = currentInput; //現在の入力を「直前の入力」に保存
    currentInput = ""; //次の入力に備える
  }

  // =ボタンを押したとき
  if (button.dataset.action === "calculate") {
    currentInput = calculate(); //計算を実行
    display.textContent = currentInput; //結果を表示
    previousInput = ""; //値をリセット
    operator = ""; //演算子をリセット
  }

  // ACボタンを押したとき
  if (button.dataset.action === "clear") {
    currentInput = "";
    previousInput = "";
    operator = "";
    display.textContent = "0"; //ディスプレイをリセット
  }
});