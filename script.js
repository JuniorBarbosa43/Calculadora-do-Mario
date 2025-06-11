// Elementos do DOM
const display = document.getElementById('display');
const clickSound = document.getElementById("clickSound");
const failSound = document.getElementById("failSound");
const newRecordSound = document.getElementById("newRecordSound");
const loseLifeSound = document.getElementById("loseLifeSound");
const jumpSound = document.getElementById("jumpSound");
const streakSound = document.getElementById("streakSound");
const trueGameOverSound = document.getElementById("trueGameOverSound");
const coinSound = document.getElementById("coinSound");
const powerUpSound = document.getElementById("powerUpSound");

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
const streakProgressEl = document.getElementById('streakProgress');
const streakMeterEl = document.querySelector('.streak-meter');


// --- SKINS ---
const skins = {
    'defaultMario': {
        name: 'Mario Clássico',
        price: 0,
        owned: true,
        sprites: {
            'running': 'midia/Skins/DefaultMario/mario.gif',
            'idle': 'midia/Skins/DefaultMario/mario-static.png',
            'jump': 'midia/Skins/DefaultMario/mario-jump.png',
            'defeat': 'midia/Skins/DefaultMario/mario-dead.png'
        }
    },
    'luigi': { name: 'Luigi Racoon', price: 150, owned: false, sprites: { 'running': 'midia/Skins/Luigi/3LuigiRacoonWalkingR.gif', 'idle': 'midia/Skins/Luigi/0LuigiSuperSquatingR.png', 'jump': 'midia/Skins/Luigi/1LuigiWalkingR.gif', 'defeat': 'midia/Skins/Luigi/0LuigiSuperSquatingR.png' } },
    'marioracoon': { name: 'Mario Racoon', price: 180, owned: false, sprites: { 'running': 'midia/Skins/MarioRacoon/3MarioRacoonWalkingR.gif', 'idle': 'midia/Skins/MarioRacoon/0MarioRacoonSquatingR.png', 'jump': 'midia/Skins/MarioRacoon/1MarioWalkingR.gif', 'defeat': 'midia/Skins/MarioRacoon/0MarioRacoonSquatingR.png' } },
    'montymole': { name: 'Monty Mole', price: 100, owned: false, sprites: { 'running': 'midia/Skins/MontyMole/321MontyMoleR.gif', 'idle': 'midia/Skins/MontyMole/0MontyMoleFront.png', 'jump': 'midia/Skins/MontyMole/321MontyMoleR.gif', 'defeat': 'midia/Skins/MontyMole/0MontyMoleFront.png' } },
    'princess': { name: 'Princesa Peach', price: 200, owned: false, sprites: { 'running': 'midia/Skins/Princess/321PrincessR.gif', 'idle': 'midia/Skins/Princess/0PrincessCryingR.png', 'jump': 'midia/Skins/Princess/321PrincessR.gif', 'defeat': 'midia/Skins/Princess/0PrincessCryingR.png' } },
    'koopa': { name: 'Koopa Troopa', price: 130, owned: false, sprites: { 'running': 'midia/Skins/Koopa/2KoopaRedR.gif', 'idle': 'midia/elementos/ShellRed.png', 'jump': 'midia/Skins/Koopa/3Para-KoopaRedR.gif', 'defeat': 'midia/elementos/ShellRed.png' } },
    'mariotanooki': { name: 'Mario Tanooki', price: 190, owned: false, sprites: { 'running': 'midia/Skins/MarioTanooki/321MarioTanookiWalkingR.gif', 'idle': 'midia/Skins/MarioTanooki/0MarioTanookiSquatingR.png', 'jump': 'midia/Skins/MarioTanooki/321MarioTanookiWalkingR.gif', 'defeat': 'midia/Skins/MarioTanooki/0MarioTanookiSquatingR.png' } },
    'mariofrog': { name: 'Mario Sapo', price: 220, owned: false, sprites: { 'running': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif', 'idle': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif', 'jump': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif', 'defeat': 'midia/Skins/MarioFrog/3210MarioFrogWalkingR.gif' } }
};

// **NOVA ALTERAÇÃO: Define todos os preços como 0 para teste**
Object.keys(skins).forEach(key => {
    skins[key].price = 0;
});


// --- ESTADO DA APLICAÇÃO ---
let currentChallenge = {};
let isMuted = localStorage.getItem('isMuted') === 'true' || false;
const STREAK_FOR_POWERUP = 5;

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

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    updateMuteButton();
    loadSkinsState();
    const initialMode = localStorage.getItem('lastMode') || 'calc';
    switchMode(initialMode);
    updateHighScoreDisplay();
    updateCoinsDisplay();
    updateDifficultyButtons();
    // Apenas para garantir que o histórico não quebre o app se estiver mal formatado
    try {
        let calculationHistory = JSON.parse(localStorage.getItem('calculationHistory')) || [];
        renderCalcHistory(calculationHistory);
    } catch {
        renderCalcHistory([]);
    }
});

// --- LÓGICA DE ANIMAÇÃO DO PERSONAGEM ---
function getSprite(state) {
    const skin = skins[gameData.currentSkin];
    if (!skin || !skin.sprites) return 'midia/Skins/DefaultMario/mario-static.png'; // Fallback
    
    if (state === 'defeat' && gameData.lives <= 0) {
        return skin.sprites.defeat;
    }
    return skin.sprites[state] || skin.sprites.idle;
}

function setCharacterState(state = 'idle', animationClass = '') {
    marioCharacter.src = getSprite(state);
    marioCharacter.className = animationClass;

    if (animationClass) {
        // Quando a animação terminar, volte para o estado normal
        const handleAnimationEnd = () => {
            // Se o jogo acabou, mantenha o estado de derrota
            if (!gameData.gameActive && gameData.lives <= 0) {
                 setCharacterState('defeat');
            } else if (gameData.gameActive) {
                setCharacterState('running');
            } else {
                 setCharacterState('idle');
            }
        };
        marioCharacter.addEventListener('animationend', handleAnimationEnd, { once: true });
    }
}


// --- FUNÇÕES DE ÁUDIO ---
function playSfx(soundElement) {
    if (isMuted || !soundElement) return;
    soundElement.currentTime = 0;
    soundElement.play().catch(e => console.warn(`Erro ao tocar som: ${e.message}`));
}
// Funções de atalho para sons
const playClick = () => playSfx(clickSound);
const playGenericFail = () => playSfx(failSound);
const playNewRecord = () => playSfx(newRecordSound);
const playLoseLife = () => playSfx(loseLifeSound);
const playJumpSound = () => playSfx(jumpSound);
const playStreakSound = () => playSfx(streakSound);
const playTrueGameOverSound = () => playSfx(trueGameOverSound);
const playCoinSound = () => playSfx(coinSound);
const playPowerUpSound = () => playSfx(powerUpSound);

function toggleMute() {
  isMuted = !isMuted;
  localStorage.setItem('isMuted', isMuted);
  updateMuteButton();
  if(!isMuted) playClick();
}
function updateMuteButton() { muteButton.textContent = isMuted ? '🔇' : '🔊'; }

// --- FUNÇÕES DA CALCULADORA ---
function append(value) {
    playClick();
    if (display.value === 'Erro!') clearDisplay();
    display.value += value;
}
function clearDisplay() { playClick(); display.value = ''; }
function deleteLast() { playClick(); display.value = display.value.slice(0, -1); }
function calculate() {
  playClick();
  try {
    let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
    let result = new Function('return ' + expression)();
    if (!Number.isFinite(result)) throw new Error("Resultado inválido.");
    result = parseFloat(result.toFixed(8));
    display.value = result.toString();
    addCalcToHistory(expression, result.toString());
  } catch (e) {
    display.value = 'Erro!';
    playGenericFail();
  }
}
function addCalcToHistory(expression, result) {
    let history = JSON.parse(localStorage.getItem('calculationHistory')) || [];
    history.unshift({ expression, result });
    if (history.length > 10) history.pop();
    localStorage.setItem('calculationHistory', JSON.stringify(history));
    renderCalcHistory(history);
}
function renderCalcHistory(history) {
    historyListEl.innerHTML = '';
    if (!history || history.length === 0) {
        historyListEl.innerHTML = '<li>Nenhum cálculo ainda.</li>';
        clearHistoryButton.style.display = 'none';
        return;
    }
    clearHistoryButton.style.display = 'block';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.expression} = ${item.result}`;
        historyListEl.appendChild(li);
    });
}
function clearCalcHistory() {
    playClick();
    localStorage.removeItem('calculationHistory');
    renderCalcHistory([]);
    showToast("Histórico da calculadora limpo!", "info");
}


// --- FUNÇÕES DO JOGO ---
function switchMode(mode) {
    playClick();
    document.body.classList.toggle('game-mode-active', mode === 'game');
    ['calc-mode', 'game-mode', 'shop-mode'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
    document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));

    if (mode === 'calc') {
        document.getElementById('calc-mode').style.display = 'block';
        document.querySelector('.tabs button[onclick*="calc"]').classList.add('active');
        setCharacterState('idle');
    } else if (mode === 'game') {
        document.getElementById('game-mode').style.display = 'block';
        document.querySelector('.tabs button[onclick*="game"]').classList.add('active');
        if (!gameData.gameActive) prepareNewGameScreen();
        updateUI();
    } else if (mode === 'shop') {
        document.getElementById('shop-mode').style.display = 'block';
        document.querySelector('.tabs button[onclick*="shop"]').classList.add('active');
        renderShop();
        setCharacterState('idle');
    }
    localStorage.setItem('lastMode', mode);
}

function updateUI() {
    updateScoreDisplay();
    updateHighScoreDisplay();
    updateCoinsDisplay();
    updateStreakDisplay();
    updateLivesDisplay();
    updateStreakMeter();
    if (gameData.gameActive) {
        setCharacterState('running');
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
    streakMeterEl.style.visibility = 'hidden';
    setCharacterState('idle');
    startGameButton.focus();
}

function startGame() {
    playClick();
    gameData.gameActive = true;
    gameData.score = 0;
    gameData.streak = 0;
    gameData.lives = gameData.maxLives;
    
    answerEl.style.display = 'block';
    checkAnswerButton.style.display = 'inline-block';
    startGameButton.style.display = 'none';
    timerDisplayEl.style.visibility = 'visible';
    streakMeterEl.style.visibility = 'visible';
    updateUI();
    generateChallenge();
}

function setDifficulty(level) {
    playClick();
    gameData.difficulty = level;
    localStorage.setItem('gameDifficulty', level);
    updateDifficultyButtons();
    if (gameData.gameActive) {
        startGame();
    }
}

function updateDifficultyButtons() {
    document.querySelectorAll('.difficulty-selector button').forEach(btn => {
        btn.classList.remove('active-difficulty');
    });
    document.getElementById(`btn${gameData.difficulty.charAt(0).toUpperCase() + gameData.difficulty.slice(1)}`).classList.add('active-difficulty');
}

function updateScoreDisplay() {
    scoreDisplay.textContent = gameData.score;
    scoreDisplay.classList.add('score-updated');
    setTimeout(() => scoreDisplay.classList.remove('score-updated'), 500);
}
function updateHighScoreDisplay() { highScoreDisplay.textContent = gameData.highScore; }
function updateCoinsDisplay() { coinsDisplay.textContent = gameData.coins; }
function updateShopCoinsDisplay() { shopCoinsDisplay.textContent = gameData.coins; }
function updateStreakDisplay() { streakCountDisplay.textContent = gameData.streak; }

function updateLivesDisplay() {
    livesCountDisplay.innerHTML = '';
    for (let i = 0; i < gameData.maxLives; i++) {
        const lifeImg = document.createElement('img');
        lifeImg.src = 'midia/elementos/1upMushroom.png';
        if (i >= gameData.lives) {
            lifeImg.classList.add('lost-life');
        }
        livesCountDisplay.appendChild(lifeImg);
    }
}

function updateStreakMeter() {
    const progress = (gameData.streak % STREAK_FOR_POWERUP) / STREAK_FOR_POWERUP * 100;
    streakProgressEl.style.width = `${progress}%`;
}

function getDifficultyParams(difficulty) {
    switch (difficulty) {
        case 'easy': return { range1: 10, range2: 10, ops: ['+', '-'], points: 10, coinReward: 1 };
        case 'hard': return { range1: 100, range2: 50, ops: ['+', '-', '*', '/'], points: 30, coinReward: 3 };
        default: return { range1: 50, range2: 25, ops: ['+', '-', '*'], points: 20, coinReward: 2 };
    }
}

function generateChallenge() {
  if (!gameData.gameActive) return;
  stopTimer();
  setCharacterState('running');

  const params = getDifficultyParams(gameData.difficulty);
  let a = Math.floor(Math.random() * params.range1) + 1;
  let b = Math.floor(Math.random() * params.range2) + 1;
  const op = params.ops[Math.floor(Math.random() * params.ops.length)];
  if (op === '/') { a = b * (Math.floor(Math.random() * 10) + 1); } 
  else if (op === '-') { if (a < b) [a, b] = [b, a]; }

  const opVisual = op === '*' ? '×' : op === '/' ? '÷' : op;
  currentChallenge = { question: `${a} ${opVisual} ${b}`, answer: eval(`${a}${op}${b}`) };
  challengeEl.innerText = `Quanto é ${currentChallenge.question}?`;
  answerEl.value = '';
  feedbackEl.innerText = '';
  answerEl.disabled = false;
  checkAnswerButton.style.display = 'inline-block';
  nextChallengeButton.style.display = 'none';
  answerEl.focus();
  startTimer(gameData.timePerChallenge[gameData.difficulty]);
}

function startTimer(duration) {
    gameData.timeLeft = duration;
    updateTimerDisplay();
    gameData.timerInterval = setInterval(() => {
        gameData.timeLeft--;
        updateTimerDisplay();
        timerDisplayEl.className = 'timer-display';
        if (gameData.timeLeft <= 5) timerDisplayEl.classList.add('warning');
        if (gameData.timeLeft <= 2) timerDisplayEl.classList.add('critical');
        if (gameData.timeLeft <= 0) {
            handleIncorrectAnswer("Tempo esgotado! ⏰", true);
        }
    }, 1000);
}

function stopTimer() { clearInterval(gameData.timerInterval); }
function updateTimerDisplay() { timeLeftDisplay.textContent = gameData.timeLeft; }

function checkAnswer() {
  if (!gameData.gameActive) return;
  stopTimer();
  const userAnswer = parseFloat(answerEl.value.trim().replace(',', '.'));
  answerEl.disabled = true;
  checkAnswerButton.style.display = 'none';

  if (userAnswer === currentChallenge.answer) {
    handleCorrectAnswer();
  } else {
    handleIncorrectAnswer(`Errou! A resposta certa é ${currentChallenge.answer}.`);
  }
}

function handleCorrectAnswer() {
    feedbackEl.innerText = '🎉 Parabéns! Acertou!';
    feedbackEl.className = 'success';
    playJumpSound();
    setCharacterState('jump', 'mario-jump-animation');

    const params = getDifficultyParams(gameData.difficulty);
    const timeBonus = Math.floor(gameData.timeLeft * 0.5);
    const pointsEarned = params.points + timeBonus;
    gameData.score += pointsEarned;
    gameData.streak++;
    gameData.coins += params.coinReward;
    playCoinSound();

    if (gameData.streak > 0 && gameData.streak % STREAK_FOR_POWERUP === 0) {
        playPowerUpSound();
        if (gameData.lives < gameData.maxLives) {
            gameData.lives++;
            showToast(`🍄 Vida extra! STREAK ${gameData.streak}!`, 'info');
        } else {
            const bonusCoins = 25;
            gameData.coins += bonusCoins;
            showToast(`💰 ${bonusCoins} moedas de bônus!`, 'success');
        }
    } else if (gameData.streak > 2) {
        playStreakSound();
    }
    
    if (gameData.score > gameData.highScore) {
        gameData.highScore = gameData.score;
        localStorage.setItem('gameHighScore', gameData.highScore.toString());
        playNewRecord();
        showToast('🏆 NOVO RECORDE!', 'info', 3000);
    }

    localStorage.setItem('gameCoins', gameData.coins.toString());
    updateUI();
    nextChallengeButton.style.display = 'inline-block';
    nextChallengeButton.focus();
}

function handleIncorrectAnswer(message, isTimeOut = false) {
    feedbackEl.innerText = message;
    feedbackEl.className = 'error';
    if (!isTimeOut) playLoseLife(); else playGenericFail();

    gameData.lives--;
    gameData.streak = 0;
    updateLivesDisplay();
    updateStreakMeter();
    
    setCharacterState('defeat', isTimeOut ? 'mario-timeup-animation' : 'mario-defeat-animation');
    
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
    setCharacterState('defeat');
}

function showToast(message, type = 'info', duration = 2000) {
    toastNotificationEl.textContent = message;
    toastNotificationEl.className = `toast show ${type}`;
    setTimeout(() => { toastNotificationEl.className = 'toast'; }, duration);
}

// --- FUNÇÕES DA LOJA ---
function loadSkinsState() {
    const storedSkins = JSON.parse(localStorage.getItem('userSkins'));
    if (storedSkins) {
        for (const key in storedSkins) {
            if (skins[key]) skins[key].owned = storedSkins[key];
        }
    } else {
        localStorage.setItem('userSkins', JSON.stringify({ defaultMario: true }));
    }
}
function renderShop() {
    skinsContainer.innerHTML = '';
    updateShopCoinsDisplay();
    for (const key in skins) {
        const skin = skins[key];
        const skinCard = document.createElement('div');
        skinCard.className = 'skin-card';
        const previewImage = skin.sprites.running || skin.sprites.idle;

        let statusHtml;
        if (skin.owned) {
            const isSelected = gameData.currentSkin === key;
            statusHtml = `<p><span class="owned">Adquirido!</span></p>
                <button class="${isSelected ? 'selected-skin' : ''}" ${isSelected ? 'disabled' : ''} onclick="selectSkin('${key}')">
                    ${isSelected ? 'Em Uso' : 'Usar'}
                </button>`;
        } else {
            const canAfford = gameData.coins >= skin.price;
            statusHtml = `<p class="price">Preço: ${skin.price} <img src="midia/elementos/Coin.gif" alt="" class="coin-icon-small"></p>
                <button ${!canAfford ? 'disabled' : ''} onclick="buySkin('${key}')">Comprar</button>`;
        }
        skinCard.innerHTML = `<h3>${skin.name}</h3><img src="${previewImage}" alt="${skin.name}" class="skin-preview">${statusHtml}`;
        skinsContainer.appendChild(skinCard);
    }
}
function buySkin(key) {
    playClick();
    const skin = skins[key];
    if (gameData.coins >= skin.price && !skin.owned) {
        gameData.coins -= skin.price;
        skin.owned = true;
        localStorage.setItem('gameCoins', gameData.coins.toString());
        const userSkins = JSON.parse(localStorage.getItem('userSkins')) || {};
        userSkins[key] = true;
        localStorage.setItem('userSkins', JSON.stringify(userSkins));
        updateCoinsDisplay();
        renderShop();
        showToast(`Você comprou ${skin.name}!`, "success");
    }
}
function selectSkin(key) {
    playClick();
    if (skins[key] && skins[key].owned) {
        gameData.currentSkin = key;
        localStorage.setItem('currentSkin', key);
        setCharacterState('idle');
        renderShop();
        showToast(`${skin.name} selecionado!`, "info");
    }
}

// --- CONTROLES DE TECLADO ---
document.addEventListener('keydown', function(event) {
    const key = event.key;
    const activeEl = document.activeElement;
    if (key.toLowerCase() === 'm' && activeEl.tagName !== 'INPUT') {
        toggleMute(); return;
    }
    if (document.getElementById('game-mode').style.display !== 'none') {
        if (key === 'Enter') {
            event.preventDefault();
            if (answerEl === activeEl && !answerEl.disabled) checkAnswer();
            else if (nextChallengeButton.style.display !== 'none') generateChallenge();
            else if (startGameButton.style.display !== 'none') startGame();
        }
    } else if (document.getElementById('calc-mode').style.display !== 'none') {
        if ((key >= '0' && key <= '9') || key === '.') append(key);
        else if (['+', '-', '*', '/'].includes(key)) append(key);
        else if (key === 'Enter' || key === '=') { event.preventDefault(); calculate(); }
        else if (key === 'Backspace') deleteLast();
        else if (key === 'Escape' || key.toLowerCase() === 'c') clearDisplay();
    }
});