document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        {
            question: "Kas ir galvaspilsēta Latvijā?",
            options: ["Rīga", "Tallina", "Viļņa", "Kaļiningrada"],
            correct: 0
        },
        {
            question: "Kurš no šiem ir latviešu tautasdziesmu krājuma sastādītājs?",
            options: ["Krišjānis Barons", "Rainis", "Aspazija", "Zigmunds Skujiņš"],
            correct: 0
        },
        {
            question: "Kurā gadā tika dibināta Latvijas Republika?",
            options: ["1918", "1920", "1934", "1940"],
            correct: 0
        },
        {
            question: "Kurš ir Latvijā dzimušais slavenais mākslinieks?",
            options: ["Vilhelms Purvītis", "Mikelandželo", "Rembrants", "Van Gogs"],
            correct: 0
        },
        {
            question: "Kurš latviešu dzejnieks ir autors dzejolim 'Gaismas pils'?",
            options: ["Rainis", "Aspazija", "Jānis Rainis", "Andrejs Pumpurs"],
            correct: 3
        },
        {
            question: "Kurā gadā Latvija pievienojās Eiropas Savienībai?",
            options: ["2000", "2004", "2006", "2010"],
            correct: 1
        },
        {
            question: "Kāds ir latviešu tautas tērpu īpašais aksesuārs?",
            options: ["Lūši", "Stips", "Ziedi", "Austiņas"],
            correct: 1
        },
        {
            question: "Kuru upi tek cauri Rīgai?",
            options: ["Daugava", "Lielupe", "Venta", "Gauja"],
            correct: 0
        },
        {
            question: "Kurš ir Latvijas nacionālais dzīvnieks?",
            options: ["Lūsis", "Aļņi", "Bebrs", "Stārķis"],
            correct: 0
        },
        {
            question: "Kurā gadā notika Latvijas Atmoda?",
            options: ["1988", "1990", "1991", "1994"],
            correct: 2
        }
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let answered = false;

    function displayQuestion() {
        const questionElement = document.getElementById('question');
        const optionsElement = document.getElementById('options');
        
        if (!questionElement || !optionsElement) {
            console.error('HTML elements with IDs "question" and "options" not found.');
            return;
        }
    
        questionElement.textContent = questions[currentQuestionIndex].question;
        optionsElement.innerHTML = '';
        answered = false;
    
        questions[currentQuestionIndex].options.forEach((option, index) => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => selectOption(index, button);
            li.appendChild(button);
            optionsElement.appendChild(li);
        });
        document.getElementById('next').disabled = true;
    }

    function selectOption(selectedIndex, button) {
        if (answered) return;
        answered = true;
    
        const correctIndex = questions[currentQuestionIndex].correct;
        const buttons = document.querySelectorAll('#options button');
    
        if (selectedIndex === correctIndex) {
            button.parentElement.classList.add('correct');
            score++;
        } else {
            button.parentElement.classList.add('wrong');
            buttons[correctIndex].parentElement.classList.add('correct'); // Подсвечиваем правильный ответ
        }
    
        buttons.forEach(btn => btn.disabled = true);
        document.getElementById('next').disabled = false;
    }

    window.nextQuestion = function() {
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            showResults();
        } else {
            displayQuestion();
        }

        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.textContent = `Punkti: ${score}`;
        } else {
            console.error('HTML element with ID "score" not found.');
        }
    }

    function showResults() {
        const quizContainer = document.getElementById('quiz');
        const resultContainer = document.getElementById('result-container');
        const resultText = document.getElementById('result-text');
        
        if (quizContainer && resultContainer && resultText) {
            quizContainer.classList.add('hidden');
            resultContainer.classList.remove('hidden');
            resultText.textContent = `Jūs atbildējāt pareizi uz ${score} no ${questions.length} jautājumiem.`;
        } else {
            console.error('One or more HTML elements not found for displaying results.');
        }
    }

    window.restartQuiz = function() {
        currentQuestionIndex = 0;
        score = 0;
        document.getElementById('score').textContent = 'Punkti: 0';
        document.getElementById('quiz').classList.remove('hidden');
        document.getElementById('result-container').classList.add('hidden');
        displayQuestion();
    }

    displayQuestion();
});