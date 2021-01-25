const randomNumber = () => {
  return Math.floor(Math.random() * 100);
};

const randomOperand = () => {
  const isTrue = !!Math.round(Math.random());

  return isTrue ? "+" : "-";
};

const calc = (l, r, operand) => {
  switch (operand) {
    case "+":
      return l + r;

    case "-":
      return l - r;

    case "x":
      return l * r;

    case "/":
      return l / r;

    default:
      return l + r;
  }
};

const mathProblem = () => {
  const l = randomNumber();
  const r = randomNumber();
  const operand = randomOperand();

  const answer = calc(l, r, operand);

  return {
    text: `${l} ${operand} ${r}`,
    answer: answer,
  };
};

module.exports = {
  calc,
  mathProblem,
  randomNumber,
  randomOperand,
};
