(function () {
  if (document.getElementById("lockdown-overlay")) return;

  let questions = [];
  let currentIndex = 0;
  let correctCount = 0;
  let timeLeft = 300; 
  let warmUpComplete = false;
  let quizPassed = false;

  // --- INJECT STYLE ARCHITECTURE ---
  const fontLink = document.createElement("link");
  fontLink.rel = "stylesheet";
  fontLink.href = "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap";

  const overlay = document.createElement("div");
  overlay.id = "lockdown-overlay";
  
  Object.assign(overlay.style, {
    position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
    backgroundColor: "#08080c", color: "#ff0055", fontFamily: "'JetBrains Mono', monospace",
    zIndex: "999999999", display: "flex", flexDirection: "column",
    justifyContent: "center", alignItems: "center", overflow: "hidden"
  });

  overlay.innerHTML = `
    <div style="width: 600px; padding: 40px; border: 2px solid #bd002a; background: #0c0c12; box-shadow: 0 0 40px rgba(189, 0, 42, 0.25); text-align: left; box-sizing: border-box;">
      <h1 style="color: #bd002a; margin: 0 0 10px 0; font-size: 1.8rem; letter-spacing: 2px;">🛑 IMPULSE LOCKDOWN ACTIVE</h1>
      <p style="color: #8a8a9e; font-size: 0.9rem; line-height: 1.5; margin-bottom: 25px;">
        SDG 3 Behavioral Intervention System has isolated this tab. To release the viewport layout, complete the 5-minute cool-down and clear the live health data matrix with ≥90% accuracy.
      </p>

      <div id="quiz-window">
        <div style="color: #bcbcc4; font-size: 1rem; text-align: center; padding: 40px 0;">
          Synchronizing live SDG 3 health data repository...
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-top: 1px solid #222; padding-top: 20px;">
        <div>
          <span style="color: #555; font-size: 0.8rem; display: block;">SESSION LOCK EXTENSION</span>
          <span id="bf-timer" style="font-size: 1.8rem; font-weight: bold; color: #ffffff;">05:00</span>
        </div>
        <div id="quiz-progress" style="color: #8a8a9e; font-size: 0.9rem; text-align: right; font-weight: bold;">
          Connecting...
        </div>
      </div>
    </div>
  `;

  // --- RENDER SYSTEM ---
  function renderQuestion() {
    const quizWindow = document.getElementById("quiz-window");
    const progressText = document.getElementById("quiz-progress");
    if (!quizWindow || !questions.length) return;

    const q = questions[currentIndex];
    progressText.innerText = `Matrix: ${currentIndex + 1} / ${questions.length}`;

    if (!q.shuffledOptions) {
      q.shuffledOptions = [q.correctAnswer, ...q.incorrectAnswers].sort(() => Math.random() - 0.5);
    }

    let choicesHtml = q.shuffledOptions.map((option, index) => {
      const escapedOption = option.replace(/"/g, '&quot;');
      return `
        <button class="quiz-option-btn" data-answer="${escapedOption}" style="
          width: 100%; background: #121218; border: 1px solid #222; padding: 14px; 
          color: #bcbcc4; font-family: inherit; font-size: 0.9rem; text-align: left; 
          margin-bottom: 12px; cursor: pointer; transition: 0.2s; outline: none; box-sizing: border-box;
        " onmouseover="this.style.border='1px solid #ff0055'; this.style.color='#fff';" 
          onmouseout="this.style.border='1px solid #222'; this.style.color='#bcbcc4';">
          [0${index + 1}] &nbsp; ${option}
        </button>
      `;
    }).join("");

    quizWindow.innerHTML = `
      <div style="background: #040406; padding: 20px; border: 1px solid #222; margin-bottom: 20px; min-height: 70px; box-sizing: border-box;">
        <span style="color: #ff0055; font-weight: bold; font-size: 0.8rem; display: block; margin-bottom: 6px; letter-spacing: 1px;">EVALUATION FIELD:</span>
        <span style="color: #fff; font-size: 0.95rem; line-height: 1.4; display: block;">${q.question}</span>
      </div>
      <div id="choices-container">${choicesHtml}</div>
      <div id="quiz-feedback" style="margin-top: 10px; font-size: 0.9rem; min-height: 20px; font-weight: bold;"></div>
    `;

    const buttons = quizWindow.querySelectorAll(".quiz-option-btn");
    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => b.style.pointerEvents = 'none');
        
        const chosen = btn.getAttribute("data-answer");
        const feedback = document.getElementById("quiz-feedback");
        
        if (chosen === q.correctAnswer) {
          correctCount++;
          btn.style.border = "1px solid #00ffcc";
          btn.style.background = "rgba(0, 255, 204, 0.05)";
          btn.style.color = "#00ffcc";
          feedback.style.color = "#00ffcc";
          feedback.innerText = "✓ Transmission correct. Sequence verified.";
        } else {
          btn.style.border = "1px solid #ff3333";
          btn.style.background = "rgba(255, 51, 51, 0.05)";
          btn.style.color = "#ff3333";
          feedback.style.color = "#ff3333";
          feedback.innerText = `❌ Error. Target sequence was: "${q.correctAnswer}"`;
        }

        setTimeout(() => {
          currentIndex++;
          if (currentIndex < questions.length) {
            renderQuestion();
          } else {
            evaluateFinalQuizScore();
          }
        }, 1600);
      });
    });
  }

  // --- SCORE ASSESSMENT ENGINE ---
  function evaluateFinalQuizScore() {
    const quizWindow = document.getElementById("quiz-window");
    const progressText = document.getElementById("quiz-progress");
    if (!quizWindow) return;

    const accuracy = Math.round((correctCount / questions.length) * 100);
    progressText.innerText = "TERMINATED";

    if (accuracy >= 90) {
      quizPassed = true;
      if (!warmUpComplete) {
        quizWindow.innerHTML = `
          <div style="background: #040406; padding: 30px; border: 1px solid #00ffcc; text-align: center; box-sizing: border-box;">
            <h2 style="color: #00ffcc; margin-top: 0; letter-spacing: 1px;">✓ ACCURACY THRESHOLD SECURED (${accuracy}%)</h2>
            <p style="color: #bcbcc4; font-size: 0.9rem; line-height: 1.5;">
              Evaluation parsed successfully (${correctCount}/${questions.length} correct). The systemic countdown buffer is still active. 
            </p>
            <div style="color: #ffaa00; font-weight: bold; margin-top: 20px; font-size: 0.85rem; letter-spacing: 1px;">
              ⚠️ COOL-DOWN MANDATE ACTIVE. STAND UP AND STRETCH.
            </div>
          </div>
        `;
      } else {
        document.documentElement.style.overflow = "auto";
        overlay.remove();
      }
    } else {
      quizWindow.innerHTML = `
        <div style="background: #040406; padding: 30px; border: 1px solid #bd002a; text-align: center; box-sizing: border-box;">
          <h2 style="color: #bd002a; margin-top: 0; letter-spacing: 1px;">❌ EVALUATION FAILURE (${accuracy}%)</h2>
          <p style="color: #bcbcc4; font-size: 0.9rem; line-height: 1.5; margin-bottom: 25px;">
            Your accuracy fell below the required <span style="color: #ff0055; font-weight: bold;">90% limit</span> (${correctCount}/${questions.length} correct).
          </p>
          <button id="quiz-retry-btn" style="background: #bd002a; color: #fff; border: none; padding: 12px 24px; font-family: inherit; font-weight: bold; cursor: pointer; letter-spacing: 1px; outline: none; transition: 0.2s;">
            INITIALIZE FRESH STREAM
          </button>
        </div>
      `;

      document.getElementById("quiz-retry-btn").addEventListener("click", () => {
        fetchQuestions();
      });
    }
  }

  // --- LIVE API RESOURCE ROUTER ---
  function fetchQuestions() {
    const quizWindow = document.getElementById("quiz-window");
    if (quizWindow) {
      quizWindow.innerHTML = `
        <div style="color: #bcbcc4; font-size: 0.95rem; text-align: center; padding: 50px 0;">
          <span style="color: #ff0055; font-weight: bold; animation: blink 1s infinite;">[CONNECTING]</span> Polling remote SDG 3 health metric infrastructure...
        </div>
      `;
    }

    fetch('https://the-trivia-api.com/v2/questions?categories=science&limit=10')
      .then(res => {
        if (!res.ok) throw new Error("API Route Down");
        return res.json();
      })
      .then(data => {
        questions = data.map(item => ({
          question: item.question.text,
          correctAnswer: item.correctAnswer,
          incorrectAnswers: item.incorrectAnswers
        }));
        currentIndex = 0;
        correctCount = 0;
        renderQuestion();
      })
      .catch(err => {
        console.warn("API isolated. Engaging internal SDG 3 matrix database core:", err);
        
        // Fully curated fallback structure for absolute 100% reliability
        questions = [
          { question: "Which of the following is a core target of UN Sustainable Development Goal 3 (SDG 3)?", correctAnswer: "Reducing the global maternal mortality ratio to less than 70 per 100,000 live births", incorrectAnswers: ["Achieving zero carbon emission rates across public hospitals", "Eliminating all usage of non-biodegradable medical consumables", "Capping maximum pharmaceutical expenditures at 2% of global GDP"] },
          { question: "What viral disease did the World Health Organization officially declare eradicated globally in 1980?", correctAnswer: "Smallpox", incorrectAnswers: ["Poliomyelitis", "Measles", "Yellow Fever"] },
          { question: "Which type of immunity is achieved when the body synthesizes its own antibodies via vaccination or infection exposure?", correctAnswer: "Active Immunity", incorrectAnswers: ["Passive Immunity", "Innate Immunity", "Structural Immunity"] },
          { question: "What is the primary operational definition of Universal Health Coverage (UHC) within SDG 3 frameworks?", correctAnswer: "Ensuring all individuals receive essential health services without suffering financial hardship", incorrectAnswers: ["Providing completely cost-free elective cosmetic surgeries globally", "Standardizing identical hospital architectures in every nation", "Mandating automated robotic diagnosis for all primary healthcare tiers"] },
          { question: "Which biological mechanism describes the primary action of vaccines inside human circulatory systems?", correctAnswer: "Stimulating immune memory cells to synthesize specific antibodies prematurely", incorrectAnswers: ["Directly destroying pathogen cell walls using artificial enzyme strains", "Filtering out systemic microtoxins through renal pathways", "Altering host DNA configurations to completely reject external viral attachments"] },
          { question: "Which vector-borne parasitic disease represents a major target for absolute transmission elimination under SDG 3.3?", correctAnswer: "Malaria", incorrectAnswers: ["Tuberculosis", "Influenza Type A", "Hepatitis B"] },
          { question: "What is the primary health risk associated with systemic high concentrations of Low-Density Lipoprotein (LDL) cholesterol?", correctAnswer: "Atherosclerotic plaque accumulation in arterial walls", incorrectAnswers: ["Accelerated breakdown of neural protective myelin sheaths", "Decompression sickness within pulmonary tissues", "Malfunction of endocrine pancreatic beta cells"] },
          { question: "Which human organ acts as the central metabolic filter for processing toxins, synthesizing bile, and storing glycogen?", correctAnswer: "Liver", incorrectAnswers: ["Pancreas", "Spleen", "Kidney"] },
          { question: "What fundamental physiological regulator is primarily secreted by the pineal gland to sustain sleep-wake cycles?", correctAnswer: "Melatonin", incorrectAnswers: ["Cortisol", "Thyroxine", "Insulin"] },
          { question: "Which deficiency condition is directly caused by a critical long-term lack of Vitamin C intake?", correctAnswer: "Scurvy", incorrectAnswers: ["Rickets", "Pellagra", "Beriberi"] }
        ].sort(() => Math.random() - 0.5);

        currentIndex = 0;
        correctCount = 0;
        renderQuestion();
      });
  }

  // --- INJECTION SCHEDULER ENGINE ---
  const injectToDOM = () => {
    const target = document.documentElement || document.head;
    if (target) {
      target.appendChild(fontLink);
      target.appendChild(overlay);
      if (document.documentElement) {
        document.documentElement.style.overflow = "hidden";
      }
      
      fetchQuestions();

      // Countdown implementation loop
      const timerElement = overlay.querySelector("#bf-timer");
      const countdown = setInterval(() => {
        timeLeft--;
        let mins = Math.floor(timeLeft / 60);
        let secs = timeLeft % 60;
        if (timerElement) {
          timerElement.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        
        if (timeLeft <= 0) {
          clearInterval(countdown);
          warmUpComplete = true;
          if (timerElement) {
            timerElement.innerText = "READY";
            timerElement.style.color = "#00ffcc";
          }
          if (quizPassed) {
            document.documentElement.style.overflow = "auto";
            overlay.remove();
          }
        }
      }, 1000);

      return true; 
    }
    return false; 
  };

  if (!injectToDOM()) {
    const domObserver = new MutationObserver(() => {
      if (injectToDOM()) domObserver.disconnect();
    });
    domObserver.observe(document, { childList: true, subtree: true });
  }
})();
