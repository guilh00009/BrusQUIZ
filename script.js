document.addEventListener('DOMContentLoaded', () => {
    const menuScreen = document.getElementById('menu-screen');
    const creditsScreen = document.getElementById('credits-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const btnComecar = document.getElementById('btn-comecar');
    const btnCreditos = document.getElementById('btn-creditos');
    const creditsArea = document.getElementById('credits-screen');
    
    // Quiz Elements
    const questionText = document.getElementById('question-text');
    const questionNumber = document.getElementById('question-number');
    const optionsContainer = document.getElementById('options-container');
    const helpBtn = document.getElementById('help-btn');
    const helpPopup = document.getElementById('help-popup');
    const hintText = document.getElementById('hint-text');
    const closeHelp = document.getElementById('close-help');
    
    const resultScreen = document.getElementById('result-screen');
    const resultImage = document.getElementById('result-image');
    const resultPercentage = document.getElementById('result-percentage');

    let currentQuestionIndex = 0;
    let correctAnswersCount = 0;

    const questions = [
        {
            q: "Qual o mascote da fenarreco?",
            options: ["Marreco", "Girafa", "Elefante", "Cachorro"],
            correct: 0,
            hint: "É uma ave famosa por nadar e grasnar."
        },
        {
            q: "Qual o nome da loja gigante que tem uma estátua com o braço levantado na frente?",
            options: ["Havan", "Stop Shop", "Fip", "Archer"],
            correct: 0,
            hint: "Dona da maior rede de lojas de departamento do Brasil."
        },
        {
            q: "Em Brusque, qual animal parece um hamster grande que vive perto da água?",
            options: ["Cavalo", "Marreco", "Capivara", "Gavião"],
            correct: 2,
            hint: "É o maior roedor do mundo."
        },
        {
            q: "Qual doce tradicional de Brusque pode ter farofa doce por cima?",
            options: ["Paçoca", "Bolo de cenoura", "Chucrute", "Cuca"],
            correct: 3,
            hint: "Começa com 'C' e é herança alemã."
        },
        {
            q: "Brusque fica em qual estado do Brasil?",
            options: ["Brasília", "São Paulo", "Santa Catarina", "Rio de Janeiro"],
            correct: 2,
            hint: "O estado onde fica Florianópolis."
        },
        {
            q: "Brusque também é conhecida por fazer muitas o quê para usar no banho ou na mesa?",
            options: ["Computadores", "Armários", "Calcário", "Toalhas"],
            correct: 3,
            hint: "Você usa para se secar depois do banho."
        },
        {
            q: "Como se chama o parque com esculturas em Brusque?",
            options: ["Parque das Esculturas Ilse Teske", "Parque Nacional da Serra da Capivara", "Parque Amazônia", "Parque Ibirapuera"],
            correct: 0,
            hint: "Leva o nome de Ilse Teske."
        },
        {
            q: "A Fenarreco celebra a comida e tradições de qual cultura?",
            options: ["Japonesa", "Alemã", "Inglesa", "Chinesa"],
            correct: 1,
            hint: "Cultura dos primeiros imigrantes da cidade."
        },
        {
            q: "Brusque fica em que País?",
            options: ["Brasil", "Estados Unidos", "Inglaterra", "Japão"],
            correct: 0,
            hint: "A nossa pátria amada."
        },
        {
            q: "Qual time de futebol representa a cidade de Brusque?",
            options: ["Brusque Futebol Clube", "Flamengo", "São Paulo", "Grêmio"],
            correct: 0,
            hint: "Leva o próprio nome da cidade."
        },
        {
            q: "Qual língua alguns imigrantes antigos falavam em Brusque?",
            options: ["Espanhol", "Inglês", "Alemão", "Mandarim"],
            correct: 2,
            hint: "Guten Tag!"
        },
        {
            q: "Em qual mês normalmente acontece a festa Fenarreco?",
            options: ["Janeiro", "Outubro", "Março", "Fevereiro"],
            correct: 1,
            hint: "O mesmo mês da Oktoberfest."
        },
        {
            q: "Qual a roupa tradicional da festa Fenarreco?",
            options: ["Traje Alemão", "Roupa de Cowboy", "Armadura", "Astronauta"],
            correct: 0,
            hint: "O traje típico dos colonizadores."
        },
        {
            q: "Qual a bandeira de Brusque?",
            options: [
                "Assets/Bandeiras/bandeirabrasil.png",
                "Assets/Bandeiras/bandeiramaceio.png",
                "Assets/Bandeiras/bandeira-ceara.png",
                "Assets/Bandeiras/bandeirabrusque.png"
            ],
            correct: 3,
            hint: "A bandeira local com o brasão da cidade."
        },
        {
            q: "Qual o nome do zoológico de Brusque?",
            options: ["Zoo Pomerode", "Zoobotânico", "Zoo Joinville", "Beto Carrero"],
            correct: 1,
            hint: "ZOO + BOTÂNICO."
        }
    ];

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionNumber.textContent = currentQuestionIndex + 1;
        questionText.textContent = currentQuestion.q;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('div');
            button.classList.add('option-btn');
            
            // Check if the option is an image path
            if (option.match(/\.(png|jpg|jpeg|gif)$/i)) {
                const img = document.createElement('img');
                img.src = option;
                img.alt = `Opção ${index + 1}`;
                img.classList.add('option-img');
                button.appendChild(img);
            } else {
                button.textContent = option;
            }

            button.addEventListener('click', () => checkAnswer(index));
            optionsContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex) {
        const correctIndex = questions[currentQuestionIndex].correct;
        
        if (selectedIndex === correctIndex) {
            correctAnswersCount++;
        }

        currentQuestionIndex++;
        
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        const percentage = Math.round((correctAnswersCount / questions.length) * 100);
        resultPercentage.textContent = `${percentage}%`;

        if (percentage >= 50) {
            resultImage.src = 'Assets/telaquandoacertamaisque50/maisque50.png';
        } else {
            resultImage.src = 'Assets/telaquandoacertamenosque50/menosque50.png';
        }

        // Redirect to credits after 5 seconds
        setTimeout(() => {
            // Hide everything else
            resultScreen.classList.add('hidden');
            menuScreen.classList.add('hidden');
            quizScreen.classList.add('hidden');
            
            // Show only credits
            creditsScreen.classList.remove('hidden');
            
            // Reset variables for next run
            currentQuestionIndex = 0;
            correctAnswersCount = 0;
        }, 5000);
    }

    function resetGame() {
        currentQuestionIndex = 0;
        correctAnswersCount = 0;
        
        // Hide all game screens
        quizScreen.classList.add('hidden');
        resultScreen.classList.add('hidden');
        creditsScreen.classList.add('hidden');
        helpPopup.classList.add('hidden');
        
        // Show only menu
        menuScreen.classList.remove('hidden');
    }

    const btnVoltarMenu = document.getElementById('btn-voltar-menu');

    // Credits Interaction
    btnCreditos.addEventListener('click', () => {
        menuScreen.classList.add('hidden');
        creditsScreen.classList.remove('hidden');
    });

    creditsScreen.addEventListener('click', () => {
        creditsScreen.classList.add('hidden');
        menuScreen.classList.remove('hidden');
    });

    // Start Game
    btnComecar.addEventListener('click', () => {
        menuScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        loadQuestion();
    });

    // Help Button
    helpBtn.addEventListener('click', () => {
        hintText.textContent = questions[currentQuestionIndex].hint;
        helpPopup.classList.remove('hidden');
    });

    closeHelp.addEventListener('click', () => {
        helpPopup.classList.add('hidden');
    });
});
