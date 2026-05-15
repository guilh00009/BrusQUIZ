document.addEventListener('DOMContentLoaded', () => {
    // Screens
    const menuScreen = document.getElementById('menu-screen');
    const creditsScreen = document.getElementById('credits-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const infoScreen = document.getElementById('info-screen');
    const resultScreen = document.getElementById('result-screen');

    // Menu buttons
    const btnComecar = document.getElementById('btn-comecar');
    const btnCreditos = document.getElementById('btn-creditos');

    // Info screen buttons
    const btnStartQuiz = document.getElementById('btn-start-quiz');
    const btnSkipInfo = document.getElementById('btn-skip-info');

    // Quiz Elements
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const questionTotal = document.getElementById('question-total');
    const optionsContainer = document.getElementById('options-container');
    const helpBtn = document.getElementById('help-btn');
    const helpPopup = document.getElementById('help-popup');
    const hintText = document.getElementById('hint-text');
    const closeHelp = document.getElementById('close-help');
    const scoreDisplay = document.getElementById('score-display');

    // Result elements
    const resultImage = document.getElementById('result-image');
    const resultPercentage = document.getElementById('result-percentage');
    const resultMessage = document.getElementById('result-message');
    const btnPlayAgain = document.getElementById('btn-play-again');
    const btnGoCredits = document.getElementById('btn-go-credits');

    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;
    let answerLocked = false; // Evita clique duplo

    const questions = [
        {
            q: "Qual o mascote da Fenarreco?",
            options: [
                { text: "Marreco", img: "Assets/Q1/marreco.png" },
                { text: "Girafa", img: "Assets/Q1/girafa.png" },
                { text: "Elefante", img: "Assets/Q1/elefante.png" },
                { text: "Cachorro", img: "Assets/Q1/cachorro.png" }
            ],
            correct: 0,
            hint: "É uma ave famosa por nadar e grasnar."
        },
        {
            q: "Qual o nome da loja gigante que tem uma estátua com o braço levantado na frente?",
            options: [
                { text: "Havan", img: "Assets/Q2/havan.png" },
                { text: "Stop Shop", img: "Assets/Q2/stopshop.png" },
                { text: "Fip", img: "Assets/Q2/fip.png" },
                { text: "Archer", img: "Assets/Q2/archer.png" }
            ],
            correct: 0,
            hint: "Dona da maior rede de lojas de departamento do Brasil."
        },
        {
            q: "Em Brusque, qual animal parece um hamster grande que vive perto da água?",
            options: [
                { text: "Cavalo", img: "Assets/Q3/cavalo.png" },
                { text: "Marreco", img: "Assets/Q3/marreco.png" },
                { text: "Capivara", img: "Assets/Q3/capivara.png" },
                { text: "Gavião", img: "Assets/Q3/gaviao.png" }
            ],
            correct: 2,
            hint: "É o maior roedor do mundo."
        },
        {
            q: "Qual doce tradicional de Brusque pode ter farofa doce por cima?",
            options: [
                { text: "Paçoca", img: "Assets/Q4/paçoca.png" },
                { text: "Bolo de cenoura", img: "Assets/Q4/bolocenoura.png" },
                { text: "Chucrute", img: "Assets/Q4/chucrute.png" },
                { text: "Cuca", img: "Assets/Q4/cuca.png" }
            ],
            correct: 3,
            hint: "Começa com 'C' e é herança alemã."
        },
        {
            q: "Brusque fica em qual estado do Brasil?",
            options: [
                { text: "Brasília", img: "Assets/Q5/distritofederal.png" },
                { text: "São Paulo", img: "Assets/Q5/saopaulo1.png" },
                { text: "Santa Catarina", img: "Assets/Q5/santacatarina.png" },
                { text: "Rio de Janeiro", img: "Assets/Q5/riodejaneiro.png" }
            ],
            correct: 2,
            hint: "O estado onde fica Florianópolis."
        },
        {
            q: "Brusque também é conhecida por fabricar muitas o quê para usar no banho ou na mesa?",
            options: [
                { text: "Computadores", img: "Assets/Q6/computador.png" },
                { text: "Armários", img: "Assets/Q6/armário.jpg" },
                { text: "Calcário", img: "Assets/Q6/pedra.png" },
                { text: "Toalhas", img: "Assets/Q6/toalhas.png" }
            ],
            correct: 3,
            hint: "Você usa para se secar depois do banho."
        },
        {
            q: "Como se chama o parque com esculturas em Brusque?",
            options: [
                { text: "Parque das Esculturas Ilse Teske", img: "Assets/Q7/parquedasesculturas.jpg" },
                { text: "Serra da Capivara", img: "Assets/Q7/serradacapivara.jpg" },
                { text: "Parque Amazônia", img: "Assets/Q7/parqueamazonia.jpg" },
                { text: "Parque Ibirapuera", img: "Assets/Q7/ibirapueira.jpg" }
            ],
            correct: 0,
            hint: "Leva o nome de Ilse Teske."
        },
        {
            q: "A Fenarreco celebra a comida e tradições de qual cultura?",
            options: [
                { text: "Japonesa", img: "Assets/Q8/japonesa.jpg" },
                { text: "Alemã", img: "Assets/Q8/alemã.jpg" },
                { text: "Inglesa", img: "Assets/Q8/inglesa.jpg" },
                { text: "Chinesa", img: "Assets/Q8/chinesa.jpg" }
            ],
            correct: 1,
            hint: "Cultura dos primeiros imigrantes da cidade."
        },
        {
            q: "Brusque fica em qual País?",
            options: [
                { text: "Brasil", img: "Assets/Q9/brasil.jpg" },
                { text: "Estados Unidos", img: "Assets/Q9/eua.png" },
                { text: "Inglaterra", img: "Assets/Q9/inglaterra.png" },
                { text: "Japão", img: "Assets/Q9/japao.png" }
            ],
            correct: 0,
            hint: "A nossa pátria amada."
        },
        {
            q: "Qual time de futebol representa a cidade de Brusque?",
            options: [
                { text: "Brusque FC", img: "Assets/Times/brusque.jpg" },
                { text: "Flamengo", img: "Assets/Times/flamengo.jpg" },
                { text: "São Paulo", img: "Assets/Times/saopaulo.jpg" },
                { text: "Grêmio", img: "Assets/Times/gremio.jpg" }
            ],
            correct: 0,
            hint: "Leva o próprio nome da cidade."
        },
        {
            q: "Qual língua alguns imigrantes antigos falavam em Brusque?",
            options: [
                { text: "Espanhol", img: "Assets/Q11/espanhol.jpg" },
                { text: "Inglês", img: "Assets/Q11/ingles.jpg" },
                { text: "Alemão", img: "Assets/Q11/alemão.jpg" },
                { text: "Mandarim", img: "Assets/Q11/mandarim.jpg" }
            ],
            correct: 2,
            hint: "Guten Tag!"
        },
        {
            q: "Em qual mês normalmente acontece a festa Fenarreco?",
            options: [
                { text: "Janeiro", img: "Assets/Q12/janeiro.jpg" },
                { text: "Outubro", img: "Assets/Q12/outubro.png" },
                { text: "Março", img: "Assets/Q12/marco.png" },
                { text: "Fevereiro", img: "Assets/Q12/fevereiro.jpg" }
            ],
            correct: 1,
            hint: "O mesmo mês da Oktoberfest."
        },
        {
            q: "Qual a roupa tradicional da festa Fenarreco?",
            options: [
                { text: "Traje Alemão", img: "Assets/Q13/trajealemao.jpg" },
                { text: "Roupa de Cowboy", img: "Assets/Q13/roupadecowboy.jpg" },
                { text: "Armadura", img: "Assets/Q13/armadura.jpg" },
                { text: "Astronauta", img: "Assets/Q13/roupadeastronauta.jpg" }
            ],
            correct: 0,
            hint: "O traje típico dos colonizadores."
        },
        {
            q: "Qual a bandeira de Brusque?",
            options: [
                { text: "", img: "Assets/Bandeiras/bandeirabrasil.png" },
                { text: "", img: "Assets/Bandeiras/bandeiramaceio.png" },
                { text: "", img: "Assets/Bandeiras/bandeira-ceara.png" },
                { text: "", img: "Assets/Bandeiras/bandeirabrusque.png" }
            ],
            correct: 3,
            hint: "A bandeira local com o brasão da cidade."
        },
        {
            q: "Qual o nome do zoológico de Brusque?",
            options: [
                { text: "Zoo Pomerode", img: "Assets/Q15/zoopomerode.jpg" },
                { text: "Zoobotânico", img: "Assets/Q15/zoobotanico.jpg" },
                { text: "Zoo Joinville", img: "Assets/Q15/zoobotanicodejoinvile.jpg" },
                { text: "Beto Carrero", img: "Assets/Q15/betocarreiro.jpg" }
            ],
            correct: 1,
            hint: "ZOO + BOTÂNICO."
        }
    ];

    let shuffledQuestions = [];

    // ─── Navegação entre telas ───────────────────────────────────────────────

    function showScreen(screen) {
        [menuScreen, creditsScreen, quizScreen, infoScreen, resultScreen].forEach(s => {
            s.classList.add('hidden');
        });
        helpPopup.classList.add('hidden');
        screen.classList.remove('hidden');
    }

    // Menu → Créditos
    btnCreditos.addEventListener('click', () => showScreen(creditsScreen));

    // Créditos → Menu (clique em qualquer lugar)
    creditsScreen.addEventListener('click', () => showScreen(menuScreen));

    // Menu → Info
    btnComecar.addEventListener('click', () => showScreen(infoScreen));

    // Info → Quiz (CORRIGIDO: listeners fora do btnComecar)
    btnStartQuiz.addEventListener('click', startQuiz);
    btnSkipInfo.addEventListener('click', startQuiz);

    // Resultado → Menu (jogar novamente)
    btnPlayAgain.addEventListener('click', () => {
        resetGame();
        showScreen(infoScreen);
    });

    // Resultado → Créditos
    btnGoCredits.addEventListener('click', () => showScreen(creditsScreen));

    // ─── Quiz ────────────────────────────────────────────────────────────────

    function shuffle(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function startQuiz() {
        resetGame();
        shuffledQuestions = shuffle(questions);
        showScreen(quizScreen);
        if (questionTotal) questionTotal.textContent = shuffledQuestions.length;
        loadQuestion();
    }

    function resetGame() {
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        answerLocked = false;
    }

    function loadQuestion() {
        answerLocked = false;
        const currentQuestion = shuffledQuestions[currentQuestionIndex];

        questionNumber.textContent = currentQuestionIndex + 1;
        if (questionTotal) questionTotal.textContent = shuffledQuestions.length;
        questionText.textContent = currentQuestion.q;

        // Placar parcial
        if (scoreDisplay) scoreDisplay.textContent = `✔ ${correctAnswersCount}`;

        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.classList.add('option-btn');

            if (option && typeof option === 'object' && option.img) {
                // Opção com texto + imagem
                const label = document.createElement('span');
                label.classList.add('option-label');
                label.textContent = option.text;
                const img = document.createElement('img');
                img.src = option.img;
                img.alt = option.text;
                img.classList.add('option-img');
                button.appendChild(label);
                button.appendChild(img);
                button.classList.add('option-btn-img');
            } else if (typeof option === 'string' && option.match(/\.(png|jpg|jpeg|gif)$/i)) {
                // Compatibilidade: só imagem (sem texto)
                const img = document.createElement('img');
                img.src = option;
                img.alt = `Opção ${index + 1}`;
                img.classList.add('option-img');
                button.appendChild(img);
                button.classList.add('option-btn-img');
            } else {
                // Só texto
                button.textContent = option;
            }

            button.addEventListener('click', () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
        if (answerLocked) return;
        answerLocked = true;

        const correctIndex = shuffledQuestions[currentQuestionIndex].correct;

        if (selectedIndex === correctIndex) {
            correctAnswersCount++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        showScreen(resultScreen);

        const percentage = Math.round((correctAnswersCount / shuffledQuestions.length) * 100);
        resultPercentage.textContent = `${percentage}%`;

        if (percentage >= 50) {
            resultImage.src = 'Assets/telaquandoacertamaisque50/maisque50.png';
        } else {
            resultImage.src = 'Assets/telaquandoacertamenosque50/menosque50.png';
        }
    }

    // ─── Dica (Help) ─────────────────────────────────────────────────────────

    helpBtn.addEventListener('click', () => {
        hintText.textContent = questions[currentQuestionIndex].hint;
        helpPopup.classList.remove('hidden');
    });

    closeHelp.addEventListener('click', () => {
        helpPopup.classList.add('hidden');
    });
});