const handleSubmit = async () => {
  setIsLoading(true);

  const unansweredQuestions = userAnswers.reduce((acc, answer, index) => {
    if (answer === null) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (unansweredQuestions.length > 0) {
    const firstUnansweredQuestion = document.querySelector(
      `#question-${unansweredQuestions[0]}`
    );
    if (firstUnansweredQuestion) {
      firstUnansweredQuestion.scrollIntoView({ behavior: "smooth" });
    }

    unansweredQuestions.forEach((questionIndex) => {
      const questionElement = document.querySelector(
        `#question-${questionIndex}`
      );
      if (questionElement) {
        questionElement.classList.add("unanswered");
      }
    });
  } else {
    const score = calculateScore();
    const timestamp = Date.now(); // Pobranie znacznika czasu

    try {
      // Wysłanie danych na serwer
      await axios.post(
        "https://szkoleniekostarskak.netlify.app/.netlify/functions/saveResults",
        { nickname, score, timestamp } // Dodanie timestampu w zapytaniu
      );
      setIsSubmitted(true);
      localStorage.setItem("quizSubmitted", "true");
    } catch (err) {
      console.error("Błąd podczas zapisywania wyniku:", err);
    }
  }

  setIsLoading(false);
};
