let display = document.getElementById('display');
let currentChallenge = {};
const clickSound = document.getElementById("clickSound");

function playClick() {
  clickSound.currentTime = 0;
  clickSound.play();
}

function append(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() { 
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let expression = display.value;

    expression = expression.replace(/(\d+)%/g, '($1/100)');
    expression = expression.replace(/(\d+(?:\.\d+)?)\s*([\+\-])\s*\((\d+(?:\.\d+)?)\/100\)/g, 
      (_, base, op, percent) => {
        const value = `${base} ${op} (${base} * ${percent} / 100)`;
        return `(${value})`;
      });

    display.value = eval(expression);
  } catch (e) {
    display.value = 'Erro';
  }
}

function switchMode(mode) {
  document.getElementById('calc-mode').style.display = mode === 'calc' ? 'block' : 'none';
  document.getElementById('game-mode').style.display = mode === 'game' ? 'block' : 'none';
  
  document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tabs button')[mode === 'calc' ? 0 : 1].classList.add('active');

  if (mode === 'game') generateChallenge();
}

function generateChallenge() {
  const a = Math.floor(Math.random() * 50);
  const b = Math.floor(Math.random() * 50);
  const ops = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * ops.length)];

  currentChallenge = {
    question: `${a} ${op} ${b}`,
    answer: eval(`${a}${op}${b}`)
  };

  document.getElementById('challenge').innerText = `Quanto é ${currentChallenge.question}?`;
  document.getElementById('answer').value = '';
  document.getElementById('feedback').innerText = '';
}

function checkAnswer() {
  const userAnswer = parseFloat(document.getElementById('answer').value);
  const feedback = document.getElementById('feedback');
  const failSound = document.getElementById('failSound');

  if (userAnswer === currentChallenge.answer) {
    feedback.innerText = '🎉 Parabéns! Acertou!';
    feedback.style.color = '#00ff00';

  } else {
    failSound.currentTime = 0;
    failSound.play();

    feedback.innerText = `❌ Errou! A resposta certa é ${currentChallenge.answer}`;
    feedback.style.color = '#ff0000';
  }
}

