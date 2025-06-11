// Elementos do DOM
const display = document.getElementById('display');
const clickSound = document.getElementById("clickSound");
const failSound = document.getElementById("failSound");
const newRecordSound = document.getElementById("newRecordSound");

// Novos elementos de áudio específicos do jogo
const loseLifeSound = document.getElementById("loseLifeSound");
const jumpSound = document.getElementById("jumpSound");
const streak3Sound = document.getElementById("streak3Sound");
const trueGameOverSound = document.getElementById("trueGameOverSound");
const coinSound = document.getElementById("coinSound");
const powerUpSound = document.getElementById("powerUpSound");


// Outros elementos do DOM
const challengeEl = document.getElementById('challenge');
const answerEl = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const muteButton = document.getElementById('muteButton');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const coinsDisplay = document.getElementById('coins');
const shopCoinsDisplay = document.getElementById('shopCoins');
const streakCountDisplay = document.getElementById('streakCount');
const livesCountDisplay = document.getElementById('livesCount');
const marioCharacter = document.getElementById('marioCharacter');
const checkAnswerButton = document.getElementById('checkAnswerButton');
const nextChallengeButton = document.getElementById('nextChallengeButton');
const startGameButton = document.getElementById('startGameButton');
const timerDisplayEl = document.getElementById('timerDisplay');
const timeLeftDisplay = document.getElementById('timeLeft');
const toastNotificationEl = document.getElementById('toastNotification');
const historyListEl = document.getElementById('historyList');
const clearHistoryButton = document.getElementById('clearHistoryButton');
const skinsContainer = document.getElementById('skinsContainer');

// Sprites do Mario (agora parte de uma estrutura de skins)
// Os sprites de fundo (parallax) são definidos diretamente no CSS e devem ser colocados na pasta 'midia/background/'
// Garanta que os arquivos 'ground.png', 'bushes.png', 'back.png' estejam em 'midia/background/'

const skins = {
    'defaultMario': {
        name: 'Mario Clássico',
        price: 0,
        owned: true,
        sprites: {
            '3': 'midia/Skins/DefaultMario/mario.gif',
            '2': 'midia/Skins/DefaultMario/mario.gif',
            '1': 'midia/Skins/DefaultMario/mario.gif',
            '0': 'midia/Skins/DefaultMario/mario-dead.png',
            'idle': 'midia/Skins/DefaultMario/mario-static.png',
            'jump': 'midia/Skins/DefaultMario/mario-jump.png',
            'defeat': 'midia/Skins/DefaultMario/mario-dead.png'
        }
    },
    'luigi': {
        name: 'Luigi Racoon',
        price: 150,
        owned: false,
        sprites: {
            '3': 'midia/Skins/Luigi/3LuigiRacoonWalkingR.gif',
            '2': 'midia/Skins/Luigi/2LuigiSuperWalkingR.gif',
            '1': 'midia/Skins/Luigi/1LuigiWalkingR.gif',
            '0': 'midia/Skins/Luigi/0LuigiSuperSquatingR.png',
            'idle': 'midia/Skins/Luigi/0LuigiSuperSquatingR.png', // Usar uma imagem estática se disponível
            'jump': 'midia/Skins/Luigi/1LuigiWalkingR.gif', // Usar o walking como jump se não houver um jump sprite
            'defeat': 'midia/Skins/Luigi/0LuigiSuperSquatingR.png'
        }
    },
    'marioracoon': {
        name: 'Mario Racoon',
        price: 180,
        owned: false,
        sprites: {
            '3': 'midia/Skins/MarioRacoon/3MarioRacoonWalkingR.gif',
            '2': 'midia/Skins/MarioRacoon/2MarioSuperWalkingR.gif',
            '1': 'midia/Skins/MarioRacoon/1MarioWalkingR.gif',
            '0': 'midia/Skins/MarioRacoon/0MarioRacoonSquatingR.png',
            'idle': 'midia/Skins/MarioRacoon/0MarioRacoonSquatingR.png',
            'jump': 'midia/Skins/MarioRacoon/1MarioWalkingR.gif',
            'defeat': 'midia/Skins/MarioRacoon/0MarioRacoonSquatingR.png'
        }
    },
    'montymole': {
        name: 'Monty Mole',
        price: 100,
        owned: false,
        sprites: {
            '3': 'midia/Skins/MontyMole/321MontyMoleR.gif',
            '2': 'midia/Skins/MontyMole/321MontyMoleR.gif',
            '1': 'midia/Skins/MontyMole/321MontyMoleR.gif',
            '0': 'midia/Skins/MontyMole/0MontyMoleFront.png',
            'idle': 'midia/Skins/MontyMole/0MontyMoleFront.png',
            'jump': 'midia/Skins/MontyMole/321MontyMoleR.gif',
            'defeat': 'midia/Skins/MontyMole/0MontyMoleFront.png'
        }
    },
    'princess': {
        name: 'Princesa Peach',
        price: 200,
        owned: false,
        sprites: {
            '3': 'midia/Skins/Princess/321PrincessR.gif',
            '2': 'midia/Skins/Princess/321PrincessR.gif',
            '1': 'midia/Skins/Princess/321PrincessR.gif',
            '0': 'midia/Skins/Princess/0PrincessCryingR.png',
            'idle': 'midia/Skins/Princess/0PrincessCryingR.png',
            'jump': 'midia/Skins/Princess/321PrincessR.gif',
            'defeat': 'midia/Skins/Princess/0PrincessCryingR.png'
        }
    },
    'koopa': {
        name: 'Koopa Troopa',
        price: 130,
        owned: false,
        sprites: {
            '3': 'midia/Skins/Koopa/3Para-KoopaRedR.gif',
            '2': 'midia/Skins/Koopa/2KoopaRedR.gif',
            '1': 'midia/Skins/Koopa/1KoopaRedR.gif',
            '0': 'midia/elementos/ShellRed.png',
            'idle': 'midia/elementos/ShellRed.png', // Ou uma versão estática do koopa normal
            'jump': 'midia/Skins/Koopa/3Para-KoopaRedR.gif',
            'defeat': 'midia/elementos/ShellRed.png'
        }
    },
    'mariotanooki': {
        name: 'Mario Tanooki',
        price: 190,
        owned: false,
        sprites: {
            '3': 'midia/Skins/MarioTanooki/321MarioTanookiWalkingR.gif',
            '2': 'midia/Skins/MarioTanooki/321MarioTanookiWalkingR.gif',
            '1': 'midia/Skins/MarioTanooki/321MarioTanookiWalkingR.gif',
            '0': 'midia/Skins/MarioTanooki/0MarioTanookiSquatingR.png',
            'idle': 'midia/Skins/MarioTanooki/0MarioTanookiSquatingR.png',
            'jump': 'midia/Skins/MarioTanooki/321MarioTanookiWalkingR.gif',
            'defeat': 'midia/Skins/MarioTanooki/0MarioTanookiSquatingR.png'
        }
    },
    'mariofrog': {
        name: 'Mario Sapo',
        price: 220,
        owned: false,
        sprites: {
            '3': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif',
            '2': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif',
            '1': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif',
            '0': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif',
            'idle': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif',
            'jump': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif',
            'defeat': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif'
        }
    }
};

// Pré-carregar imagens do jogo (incluindo todas as skins e elementos)
function preloadImages() {
    for (const skinKey in skins) {
        const skin = skins[skinKey];
        for (const spriteKey in skin.sprites) {
            const img = new Image();
            img.src = skin.sprites[spriteKey];
        }
    }
    // Elementos adicionais
    const coinImg = new Image(); coinImg.src = 'midia/elementos/Coin.gif';
    const superMushroomImg = new Image(); superMushroomImg.src = 'midia/elementos/SuperMushroom.png';
    const oneUpMushroomImg = new Image(); oneUpMushroomImg.src = 'midia/elementos/1upMushroom.png';
    const questionBlockImg = new Image(); questionBlockImg.src = 'midia/elementos/QuestionBlock.gif';
    // Adicione outros elementos que você possa querer pré-carregar aqui
}


// Estado da aplicação
let currentChallenge = {};
let isMuted = localStorage.getItem('isMuted') === 'true' || false;
const MAX_HISTORY_ITEMS = 10;
let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];

let gameData = {
    difficulty: localStorage.getItem('gameDifficulty') || 'medium',
    score: 0,
    highScore: parseInt(localStorage.getItem('gameHighScore')) || 0,
    streak: 0,
    lives: 3,
    maxLives: 3,
    timerInterval: null,
    timeLeft: 0,
    timePerChallenge: { easy: 20, medium: 15, hard: 10 },
    gameActive: false,
    coins: parseInt(localStorage.getItem('gameCoins')) || 0,
    currentSkin: localStorage.getItem('currentSkin') || 'defaultMario'
};

// Carregar estado das skins do localStorage
function loadSkinsState() {
    const storedSkins = JSON.parse(localStorage.getItem('userSkins'));
    if (storedSkins) {
        for (const key in storedSkins) {
            if (skins[key]) {
                skins[key].owned = storedSkins[key];
            }
        }
    } else {
        // Se não houver skins no localStorage, defina defaultMario como owned e salve
        skins.defaultMario.owned = true;
        localStorage.setItem('userSkins', JSON.stringify({ defaultMario: true }));
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    preloadImages();
    updateMuteButton();
    updateHighScoreDisplay();
    updateCoinsDisplay();
    updateShopCoinsDisplay();
    updateDifficultyButtons();
    loadCalcHistory();
    loadSkinsState();
    applyCurrentSkin(gameData.lives); // Aplica a skin inicial

    // Determina o modo inicial ao carregar a página
    const initialMode = localStorage.getItem('lastMode') || 'calc';
    switchMode(initialMode); // Inicia no último modo ou calculadora

    // Se estiver no modo jogo ao carregar, garante o sprite correto
    if (initialMode === 'game') {
        if (!gameData.gameActive) {
             marioCharacter.src = skins[gameData.currentSkin].sprites.idle || skins[gameData.currentSkin].sprites.running;
        } else {
            marioCharacter.src = skins[gameData.currentSkin].sprites[gameData.lives] || skins[gameData.currentSkin].sprites.running;
        }
    }
});


// --- Funções de Áudio ---
function playSfx(soundElement) {
    if (!soundElement) {
        console.warn("Tentativa de tocar um elemento de som nulo.");
        return;
    }
    if (isMuted) {
        return;
    }
    soundElement.currentTime = 0;
    soundElement.play()
        .catch(e => {
            console.warn(`Erro ao tocar som '${soundElement.id}' (SRC: ${soundElement.src}): ${e.message}. Verifique o caminho do arquivo e as permissões.`);
        });
}

function playClick() { playSfx(clickSound); }
function playGenericFail() { playSfx(failSound); }
function playNewRecord() { playSfx(newRecordSound); }
function playLoseLife() { playSfx(loseLifeSound); }
function playJumpSound() { playSfx(jumpSound); }
function playStreak3Sound() { playSfx(streak3Sound); }
function playTrueGameOverSound() { playSfx(trueGameOverSound); }
function playCoinSound() { playSfx(coinSound); }
function playPowerUpSound() { playSfx(powerUpSound); }

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('isMuted', isMuted);
  updateMuteButton();
  playClick();
}
function updateMuteButton() {
    muteButton.textContent = isMuted ? '🔇' : '🔊';
    muteButton.title = isMuted ? 'Ativar Som (M)' : 'Desativar Som (M)';
}

// --- Funções da Calculadora ---
function invertSign() {
    playClick();
    if (display.value === 'Erro!' || display.value === '0' || display.value === '') return;
    display.value = display.value.startsWith('-') ? display.value.substring(1) : '-' + display.value;
}

function append(value) {
  playClick();
  const lastChar = display.value.slice(-1);
  const operators = ['+', '-', '*', '/', '%'];
  if (display.value === 'Erro!') clearDisplay();

  if (operators.includes(value) && operators.includes(lastChar)) {
    if (value === '-' && lastChar !== '-') { /* Permite ex: 5*- */ }
    else if (value !== lastChar) { display.value = display.value.slice(0, -1); } /* Substitui operador */
    else { return; } /* Mesmo operador, não faz nada */
  }
  const segments = display.value.split(/([+\-*/%])/);
  const lastSegment = segments[segments.length - 1];
  if (value === '.' && lastSegment.includes('.')) return; /* Evita múltiplos pontos */
  if (display.value === '' && operators.includes(value) && value !== '-') return; /* Operador no início (exceto -) */
  if (display.value === '' && value === '%') return; /* % no início */
  display.value += value;
}

function clearDisplay() {
  playClick();
  display.value = '';
}

function deleteLast() {
  playClick();
  display.value = display.value.slice(0, -1);
}

function calculate() {
  playClick();
  try {
    let expression = display.value;
    if (!expression || expression === 'Erro!') return;
    if (/[+\-*/]$/.test(expression) && !/%\s*[+\-*/]$/.test(expression)) {
         expression = expression.slice(0, -1);
    }
    if (!expression) { display.value = ''; return; }

    const originalExpression = display.value; // Para o histórico

    expression = expression.replace(/(\d+(?:\.\d+)?)\s*([+\-])\s*(\d+(?:\.\d+)?)%/g, (match, base, op, val) => `(${base} ${op} (${base} * ${val} / 100))`);
    expression = expression.replace(/(\d+(?:\.\d+)?)\s*([*\/])\s*(\d+(?:\.\d+)?)%/g, (match, base, op, val) => `(${base} ${op} (${val} / 100))`);
    expression = expression.replace(/(\d+(?:\.\d+)?)%de(\d+(?:\.\d+)?)/gi, '($1/100)*$2');
    expression = expression.replace(/(^|[^.\d\w])(-?\d+(?:\.\d+)?)%/g, '$1($2/100)');

    expression = expression.replace(/÷/g, '/').replace(/×/g, '*');
    expression = expression.replace(/--/g, '+');

    let result = eval(expression);
    if (typeof result === 'number' && !Number.isFinite(result)) {
        display.value = 'Erro!'; playGenericFail(); return;
    }
    if (typeof result === 'number' && !Number.isInteger(result)) {
        result = parseFloat(result.toFixed(8));
    }
    display.value = result.toString();
    addCalcToHistory(originalExpression, result.toString());
  } catch (e) {
    console.error("Erro no cálculo:", e);
    display.value = 'Erro!';
    playGenericFail();
  }
}

// --- Histórico da Calculadora ---
function addCalcToHistory(expression, result) {
    calculationHistory.unshift({ expression, result });
    if (calculationHistory.length > MAX_HISTORY_ITEMS) {
        calculationHistory.pop();
    }
    localStorage.setItem('calculationHistory', JSON.stringify(calculationHistory));
    renderCalcHistory();
}
function renderCalcHistory() {
    historyListEl.innerHTML = '';
    if (calculationHistory.length === 0) {
        historyListEl.innerHTML = '<li>Nenhum cálculo ainda.</li>';
        clearHistoryButton.style.display = 'none';
        return;
    }
    clearHistoryButton.style.display = 'block';
    calculationHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        li.addEventListener('click', () => {
            playClick();
            display.value = item.expression;
        });
        historyListEl.appendChild(li);
    });
}
function loadCalcHistory() {
    renderCalcHistory();
}
function clearCalcHistory() {
    playClick();
    calculationHistory = [];
    localStorage.removeItem('calculationHistory');
    renderCalcHistory();
    showToast("Histórico da calculadora limpo!", "info");
}


// --- Funções do Jogo de Desafios ---
function switchMode(mode) {
    playClick();
    document.getElementById('calc-mode').style.display = 'none';
    document.getElementById('game-mode').style.display = 'none';
    document.getElementById('shop-mode').style.display = 'none';

    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));

    let activeModeElement;
    if (mode === 'calc') {
        activeModeElement = document.getElementById('calc-mode');
        document.querySelectorAll('.tabs button')[0].classList.add('active');
    } else if (mode === 'game') {
        activeModeElement = document.getElementById('game-mode');
        document.querySelectorAll('.tabs button')[1].classList.add('active');
    } else if (mode === 'shop') {
        activeModeElement = document.getElementById('shop-mode');
        document.querySelectorAll('.tabs button')[2].classList.add('active');
        renderShop();
    }

    if (activeModeElement) {
        activeModeElement.style.display = 'block';
    }

    localStorage.setItem('lastMode', mode); // Salva o último modo

    if (mode === 'game') {
        document.body.classList.add('game-mode-active');
        if (!gameData.gameActive) {
            prepareNewGameScreen();
        } else {
            marioCharacter.src = skins[gameData.currentSkin].sprites[gameData.lives] || skins[gameData.currentSkin].sprites.running;
            answerEl.focus();
        }
        updateHighScoreDisplay();
        updateCoinsDisplay();
        updateDifficultyButtons();
        updateLivesDisplay();
    } else {
        document.body.classList.remove('game-mode-active');
        if (gameData.gameActive) {
            stopTimer();
        }
        // Quando sai do modo jogo, redefine o mario para o sprite idle da skin atual
        marioCharacter.src = skins[gameData.currentSkin].sprites.idle || skins[gameData.currentSkin].sprites.running;
    }
}

function prepareNewGameScreen() {
    challengeEl.innerText = "Pressione 'Iniciar Novo Jogo' para começar!";
    feedbackEl.innerText = "";
    answerEl.style.display = 'none';
    checkAnswerButton.style.display = 'none';
    nextChallengeButton.style.display = 'none';
    startGameButton.style.display = 'inline-block';
    timerDisplayEl.style.visibility = 'hidden';
    marioCharacter.src = skins[gameData.currentSkin].sprites.idle || skins[gameData.currentSkin].sprites.running; // Sprite inicial
    startGameButton.focus();
}

function startGame() {
    playClick();
    gameData.gameActive = true;
    gameData.score = 0;
    gameData.streak = 0;
    gameData.lives = gameData.maxLives;
    updateScoreDisplay();
    updateStreakDisplay();
    updateLivesDisplay();
    updateCoinsDisplay();

    answerEl.style.display = 'block';
    checkAnswerButton.style.display = 'inline-block';
    startGameButton.style.display = 'none';
    timerDisplayEl.style.visibility = 'visible';

    generateChallenge();
}

function resetGameStats() {
    gameData.score = 0;
    gameData.streak = 0;
    gameData.lives = gameData.maxLives;
    updateScoreDisplay();
    updateStreakDisplay();
    updateLivesDisplay();
}

function setDifficulty(level) {
    playClick();
    gameData.difficulty = level;
    localStorage.setItem('gameDifficulty', level);
    updateDifficultyButtons();
    if (gameData.gameActive) {
        resetGameStats();
        generateChallenge();
    } else {
        prepareNewGameScreen();
    }
}

function updateDifficultyButtons() {
    document.querySelectorAll('.game-stats .difficulty-selector button').forEach(btn => {
        btn.classList.remove('active-difficulty');
        if (btn.id === `btn${gameData.difficulty.charAt(0).toUpperCase() + gameData.difficulty.slice(1)}`) {
            btn.classList.add('active-difficulty');
        }
    });
}

function updateScoreDisplay() { scoreDisplay.textContent = gameData.score; }
function updateHighScoreDisplay() { highScoreDisplay.textContent = gameData.highScore; }
function updateCoinsDisplay() { coinsDisplay.textContent = gameData.coins; }
function updateShopCoinsDisplay() { shopCoinsDisplay.textContent = gameData.coins; }
function updateStreakDisplay() { streakCountDisplay.textContent = gameData.streak; }
function updateLivesDisplay() {
    livesCountDisplay.textContent = '❤️'.repeat(gameData.lives) + '🖤'.repeat(gameData.maxLives - gameData.lives);
    applyCurrentSkin(gameData.lives);
}

function applyCurrentSkin(lives) {
    const currentSkinData = skins[gameData.currentSkin];
    let spriteSrc;

    // Lógica para sprites "321" (permanecem o mesmo para 3, 2, 1 vidas)
    if (currentSkinData.sprites['3'] && currentSkinData.sprites['3'].includes('321')) { // Check if the 3-life sprite is a "321" type
        if (lives === 0) {
            spriteSrc = currentSkinData.sprites['0'] || currentSkinData.sprites.defeat;
        } else {
            spriteSrc = currentSkinData.sprites['3']; // Use the 321 sprite for 3, 2, 1 lives
        }
    }
    // Lógica para skins com sprites específicos por vida
    else {
        spriteSrc = currentSkinData.sprites[lives.toString()] || currentSkinData.sprites.running;
    }

    // Fallback para caso não haja sprite específico para o estado ou vidas
    if (!spriteSrc) {
        spriteSrc = currentSkinData.sprites.running || currentSkinData.sprites.idle;
    }


    marioCharacter.src = spriteSrc;
    marioCharacter.className = '';
}


function getDifficultyParams(difficulty) {
    switch (difficulty) {
        case 'easy': return { range1: 10, range2: 10, ops: ['+', '-'], points: 10, time: gameData.timePerChallenge.easy, coinReward: 1 };
        case 'hard': return { range1: 100, range2: 50, ops: ['+', '-', '*', '/'], points: 30, time: gameData.timePerChallenge.hard, coinReward: 3 };
        case 'medium': default: return { range1: 50, range2: 25, ops: ['+', '-', '*'], points: 20, time: gameData.timePerChallenge.medium, coinReward: 2 };
    }
}

function generateChallenge() {
  if (!gameData.gameActive) return;
  stopTimer();
  marioCharacter.src = skins[gameData.currentSkin].sprites[gameData.lives] || skins[gameData.currentSkin].sprites.running;
  marioCharacter.className = '';

  const params = getDifficultyParams(gameData.difficulty);
  let a = Math.floor(Math.random() * params.range1) + 1;
  let b = Math.floor(Math.random() * params.range2) + 1;
  const opVisual = params.ops[Math.floor(Math.random() * params.ops.length)];
  let opEval = opVisual;

  if (opVisual === '/') {
    b = Math.floor(Math.random() * Math.min(params.range2 / 2, a/2 > 1 ? a/2 : 5) ) + 1;
    if (b === 0) b = 1;
    a = b * (Math.floor(Math.random() * (params.range1 / b > 1 ? params.range1 / b : 5 )) + 1);
    if (a === 0 && opVisual === '/') a = b;
  } else if (opVisual === '-') {
    if (a < b && Math.random() < 0.75) [a, b] = [b, a];
  }
  if (gameData.difficulty === 'hard' && opVisual === '*' && Math.random() < 0.3) {
      if (b < 10) b = Math.floor(Math.random() * 10) + 10;
  }
  currentChallenge = {
    question: `${a} ${opVisual === '*' ? '×' : opVisual === '/' ? '÷' : opVisual} ${b}`,
    answer: eval(`${a}${opEval === '×' ? '*' : opEval === '÷' ? '/' : opEval}${b}`)
  };

  challengeEl.innerText = `Quanto é ${currentChallenge.question}?`;
  answerEl.value = '';
  feedbackEl.innerText = '';
  feedbackEl.className = '';
  answerEl.disabled = false;
  checkAnswerButton.style.display = 'inline-block';
  nextChallengeButton.style.display = 'none';
  startGameButton.style.display = 'none';
  answerEl.focus();
  startTimer(params.time);
}

function startTimer(duration) {
    gameData.timeLeft = duration;
    updateTimerDisplay();
    timerDisplayEl.className = 'timer-display';
    gameData.timerInterval = setInterval(() => {
        gameData.timeLeft--;
        updateTimerDisplay();
        if (gameData.timeLeft <= 5 && gameData.timeLeft > 2) {
            timerDisplayEl.className = 'timer-display warning';
        } else if (gameData.timeLeft <= 2 && gameData.timeLeft > 0) {
            timerDisplayEl.className = 'timer-display critical';
        } else if (gameData.timeLeft > 5) {
            timerDisplayEl.className = 'timer-display';
        }

        if (gameData.timeLeft <= 0) {
            stopTimer();
            marioCharacter.src = skins[gameData.currentSkin].sprites.defeat;
            marioCharacter.className = 'mario-timeup-animation';
            marioCharacter.removeEventListener('animationend', onMarioAnimationEnd);
            marioCharacter.addEventListener('animationend', onMarioAnimationEnd, { once: true });
            handleIncorrectAnswer("Tempo esgotado! ⏰", true);
        }
    }, 1000);
}

function stopTimer() { clearInterval(gameData.timerInterval); }
function updateTimerDisplay() { timeLeftDisplay.textContent = gameData.timeLeft; }


function checkAnswer() {
  if (!gameData.gameActive) return;
  playClick();
  stopTimer();
  const userAnswerText = answerEl.value.trim().replace(',', '.');
  const userAnswer = parseFloat(userAnswerText);

  answerEl.disabled = true;
  checkAnswerButton.style.display = 'none';


  if (userAnswerText === '' || isNaN(userAnswer)) {
    marioCharacter.src = skins[gameData.currentSkin].sprites.defeat;
    marioCharacter.className = 'mario-defeat-animation';
    marioCharacter.removeEventListener('animationend', onMarioAnimationEnd);
    marioCharacter.addEventListener('animationend', onMarioAnimationEnd, { once: true });
    handleIncorrectAnswer("Por favor, insira um número válido.");
    return;
  }


  if (userAnswer === currentChallenge.answer) {
    handleCorrectAnswer();
    nextChallengeButton.style.display = 'inline-block';
    nextChallengeButton.focus();
  } else {
    handleIncorrectAnswer(`Errou! A resposta certa é ${currentChallenge.answer}.`);
  }
}

function onMarioAnimationEnd() {
    if (!gameData.gameActive && gameData.lives <= 0) {
        // No Game Over, a skin do mario default sempre vai para mario-dead.png. Outras skins permanecem com seu sprite '0'
        if (gameData.currentSkin === 'defaultMario') {
            marioCharacter.src = skins.defaultMario.sprites.defeat; // Use defaultMarioSprites.defeat if you have it
        } else {
            marioCharacter.src = skins[gameData.currentSkin].sprites['0'] || skins[gameData.currentSkin].sprites.defeat;
        }
        marioCharacter.className = '';
    } else if (gameData.gameActive) {
        marioCharacter.className = '';
        marioCharacter.src = skins[gameData.currentSkin].sprites[gameData.lives] || skins[gameData.currentSkin].sprites.running;
    } else {
        marioCharacter.className = '';
        marioCharacter.src = skins[gameData.currentSkin].sprites.idle || skins[gameData.currentSkin].sprites.running;
    }
}

function handleCorrectAnswer() {
    feedbackEl.innerText = '🎉 Parabéns! Acertou!';
    feedbackEl.className = 'success';
    playJumpSound();

    marioCharacter.src = skins[gameData.currentSkin].sprites.jump;
    marioCharacter.className = 'mario-jump-animation';
    marioCharacter.removeEventListener('animationend', onMarioAnimationEnd);
    marioCharacter.addEventListener('animationend', onMarioAnimationEnd, { once: true });

    const params = getDifficultyParams(gameData.difficulty);
    let pointsEarned = params.points;
    let timeBonus = Math.min(Math.floor(params.points * 0.5), gameData.timeLeft);
    pointsEarned += timeBonus;
    gameData.score += pointsEarned;
    gameData.streak++;
    gameData.coins += params.coinReward;
    playCoinSound();
    updateScoreDisplay();
    updateStreakDisplay();
    updateCoinsDisplay();
    localStorage.setItem('gameCoins', gameData.coins.toString());

    if (gameData.streak > 0 && gameData.streak % 5 === 0) {
        if (gameData.lives < gameData.maxLives) {
            gameData.lives++;
            updateLivesDisplay();
            playPowerUpSound();
            showToast(`❤️ Coração extra! STREAK ${gameData.streak}!`, 'info', 2500);
        } else {
            playStreak3Sound();
            showToast(`🔥 STREAK ${gameData.streak}! +${pointsEarned} Pontos! 🔥 (Vidas cheias)`, 'success', 2000);
        }
    } else if (gameData.streak > 0 && gameData.streak % 3 === 0) {
        playStreak3Sound();
        showToast(`🔥 STREAK ${gameData.streak}! +${pointsEarned} Pontos! 🔥`, 'success', 2000);
    } else {
        showToast(`+${pointsEarned} Pontos! (Bônus Tempo: ${timeBonus})`, 'success', 1500);
    }

    if (gameData.score > gameData.highScore) {
        gameData.highScore = gameData.score;
        updateHighScoreDisplay();
        localStorage.setItem('gameHighScore', gameData.highScore.toString());
        playNewRecord();
        showToast('🏆 NOVO RECORDE! 🏆', 'info', 2500);
    }
}

function handleIncorrectAnswer(message, isTimeOut = false) {
    feedbackEl.innerText = message;
    feedbackEl.className = 'error';

    if (!isTimeOut) {
        gameData.lives--;
        updateLivesDisplay();
        if (gameData.lives > 0) {
            playLoseLife();
        }
        marioCharacter.src = skins[gameData.currentSkin].sprites.defeat;
        marioCharacter.className = 'mario-defeat-animation';
        marioCharacter.removeEventListener('animationend', onMarioAnimationEnd);
        marioCharacter.addEventListener('animationend', onMarioAnimationEnd, { once: true });
    } else {
        playGenericFail();
    }

    if (gameData.streak > 0) {
        showToast(`Streak de ${gameData.streak} perdido... 😥`, 'error', 2000);
    }
    gameData.streak = 0;
    updateStreakDisplay();

    if (gameData.lives <= 0) {
        gameOver();
    } else {
        nextChallengeButton.style.display = 'inline-block';
        nextChallengeButton.focus();
    }
}

function gameOver() {
    playTrueGameOverSound();
    feedbackEl.innerText = `GAME OVER! Pontuação final: ${gameData.score}`;
    feedbackEl.className = 'error game-over-message';
    challengeEl.innerText = "Fim de Jogo!";
    gameData.gameActive = false;
    stopTimer();
    answerEl.disabled = true;
    checkAnswerButton.style.display = 'none';
    nextChallengeButton.style.display = 'none';
    startGameButton.style.display = 'inline-block';
    startGameButton.innerText = "Jogar Novamente";
    startGameButton.focus();

    // No Game Over, a skin do mario default sempre vai para mario-dead.png. Outras skins permanecem com seu sprite '0'
    if (gameData.currentSkin === 'defaultMario') {
        marioCharacter.src = skins.defaultMario.sprites.defeat;
    } else {
        marioCharacter.src = skins[gameData.currentSkin].sprites['0'] || skins[gameData.currentSkin].sprites.defeat;
    }
    marioCharacter.className = '';
    showToast(`FIM DE JOGO! Pontuação: ${gameData.score}`, 'error', 3500);
}

function showToast(message, type = 'info', duration = 3000) {
    if (!toastNotificationEl) return;
    toastNotificationEl.textContent = message;
    toastNotificationEl.className = `toast show ${type}`;
    setTimeout(() => {
        toastNotificationEl.className = 'toast';
    }, duration);
}

// --- Funções da Loja ---
function renderShop() {
    skinsContainer.innerHTML = '';
    updateShopCoinsDisplay();

    for (const key in skins) {
        const skin = skins[key];
        const skinCard = document.createElement('div');
        skinCard.classList.add('skin-card');

        let statusText = '';
        let buttonHtml = '';

        // Usar a imagem da skin com 3 vidas para a capa da loja
        const previewImage = skin.sprites['3'] || skin.sprites.running || skin.sprites.idle;

        if (skin.owned) {
            statusText = '<span class="owned">Adquirido!</span>';
            const isDisabled = gameData.currentSkin === key;
            buttonHtml = `<button data-skin-key="${key}" ${isDisabled ? 'disabled' : ''} onclick="selectSkin('${key}')" class="${isDisabled ? 'selected-skin' : ''}">${isDisabled ? 'Em Uso' : 'Usar'}</button>`;
        } else {
            statusText = `<span class="price">Preço: ${skin.price} <img src="midia/elementos/Coin.gif" alt="Moeda" class="coin-icon-small"></span>`;
            buttonHtml = `<button data-skin-key="${key}" ${gameData.coins < skin.price ? 'disabled' : ''} onclick="buySkin('${key}')">Comprar</button>`;
        }

        skinCard.innerHTML = `
            <h3>${skin.name}</h3>
            <img src="${previewImage}" alt="${skin.name}" class="skin-preview">
            <p>${statusText}</p>
            ${buttonHtml}
        `;
        skinsContainer.appendChild(skinCard);
    }
}

function buySkin(key) {
    playClick();
    const skin = skins[key];
    if (!skin || skin.owned) {
        showToast("Você já possui esta skin!", "info");
        return;
    }
    if (gameData.coins >= skin.price) {
        gameData.coins -= skin.price;
        skin.owned = true;
        localStorage.setItem('gameCoins', gameData.coins.toString());
        const userSkins = JSON.parse(localStorage.getItem('userSkins')) || {};
        userSkins[key] = true;
        localStorage.setItem('userSkins', JSON.stringify(userSkins));
        updateCoinsDisplay();
        updateShopCoinsDisplay();
        renderShop();
        showToast(`Você comprou ${skin.name}!`, "success");
    } else {
        showToast("Moedas insuficientes!", "error");
    }
}

function selectSkin(key) {
    playClick();
    const skin = skins[key];
    if (!skin || !skin.owned) {
        showToast("Você não possui esta skin!", "error");
        return;
    }
    gameData.currentSkin = key;
    localStorage.setItem('currentSkin', key);
    applyCurrentSkin(gameData.lives);
    renderShop();
    showToast(`${skin.name} selecionado!`, "info");
}


// --- Suporte a Teclado ---
document.addEventListener('keydown', function(event) {
  const key = event.key;
  const activeEl = document.activeElement;
  const isCalcModeActive = document.getElementById('calc-mode').style.display !== 'none';
  const isGameModeActive = document.getElementById('game-mode').style.display !== 'none';
  const isShopModeActive = document.getElementById('shop-mode').style.display !== 'none';

  if (key.toLowerCase() === 'm' && !(activeEl.tagName === 'INPUT')) {
      toggleMute();
      return;
  }

  if (isGameModeActive) {
    if (gameData.gameActive) {
        if (activeEl === answerEl && !answerEl.disabled && key === 'Enter') {
            event.preventDefault(); checkAnswer();
        } else if (activeEl === nextChallengeButton && nextChallengeButton.style.display !== 'none' && key === 'Enter') {
            event.preventDefault(); playClick(); generateChallenge();
        } else if (activeEl === checkAnswerButton && checkAnswerButton.style.display !== 'none' && key === 'Enter') {
            event.preventDefault(); checkAnswer();
        }
    } else {
        if (activeEl === startGameButton && startGameButton.style.display !== 'none' && key === 'Enter') {
            event.preventDefault(); startGame();
        }
    }
  } else if (isShopModeActive) {
        // Sem funcionalidades de teclado específicas adicionais para a loja, o comportamento padrão do navegador já funciona.
  }


  if (isCalcModeActive) {
    if (activeEl === display) return;
    if (key >= '0' && key <= '9') append(key);
    else if (key === '.') append('.');
    else if (key === ',') append('.');
    else if (key === '+') append('+');
    else if (key === '-') append('-');
    else if (key === '*') append('*');
    else if (key === '/') { event.preventDefault(); append('/'); }
    else if (key === '%') append('%');
    else if (key === 'Enter' || key === '=') { event.preventDefault(); calculate(); }
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape' || key.toLowerCase() === 'c') clearDisplay();
    else if (event.shiftKey && key === '-') { invertSign(); }
    else if (key === '_') { event.preventDefault(); invertSign(); }
  }
});