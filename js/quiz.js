document.addEventListener("DOMContentLoaded", function() {
    const questions = [
        {
            question: "Kāds ir Lil Peep īstais vārds?",
            options: ["Gustav Elijah Åhr", "Shawn Carter", "Andre Young", "Calvin Broadus"],
            correct: 0
        },
        {
            question: "Kad piedzima Lil Peep?",
            options: ["1996. gada 1. novembris", "1996. gada 15. septembris", "1995. gada 9. maijs", "1993. gada 21. oktobris"],
            correct: 0
        },
        {
            question: "Kā sauc Lil Peep debijas miksteipu?",
            options: ["Hellboy", "Come Over When You're Sober", "Crybaby", "Part One"],
            correct: 3
        },
        {
            question: "Kura no minētajām grupām iedvesmoja Lil Peep veidot savu mūziku?",
            options: ["My Chemical Romance", "Nirvana", "The Beatles", "Green Day"],
            correct: 0
        },
        {
            question: "Kā sauc vienu no populārākajām Lil Peep dziesmām?",
            options: ["Star Shopping", "Lucid Dreams", "Rockstar", "Mo Bamba"],
            correct: 0
        },
        {
            question: "Kādā vecumā Lil Peep pieņēma savu pseidonīmu?",
            options: ["16 gadi", "17 gadi", "18 gadi", "20 gadi"],
            correct: 1
        },
        {
            question: "Kuru žanru visvairāk raksturo Lil Peep mūzika?",
            options: ["Roks", "Hip-hop", "Emo rep", "Elektroniskā mūzika"],
            correct: 2
        },
        {
            question: "Kuru no šiem iesaukām Lil Peep izmantoja savā albumā?",
            options: ["Emo King", "Hellboy", "Lil", "White Tee"],
            correct: 1
        },
        {
            question: "Kāds notikums būtiski ietekmēja Lil Peep radošo darbu?",
            options: ["Šķiršanās ar draudzeni", "Pārcelšanās uz Losandželosu", "Drauga nāve", "Depresija"],
            correct: 1
        },
        {
            question: "Kad Lil Peep nomira?",
            options: ["2017. gada 15. novembris", "2017. gada 7. decembris", "2018. gada 23. janvāris", "2018. gada 1. novembris"],
            correct: 0
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
            buttons[correctIndex].parentElement.classList.add('correct'); 
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