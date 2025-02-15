import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

// Dodajemy style globalne
const GlobalStyle = createGlobalStyle`
  .unanswered {
    background-color: #fce5cd; /* Delikatny pomarańczowy */
  }
`;

// Stylowanie komponentów
const Container = styled.div`
  padding: 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #eef2f3, #8e9eab);
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;
`;

const QuizBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 800px;
`;

const Title = styled.h1`
  text-align: center;
  color: #34495e;
  margin-bottom: 30px;
  font-size: 2.5rem;
  font-weight: 600;
`;

const Description = styled.div`
  text-align: center;
  font-size: 1.1rem;
  color: #4a4a4a;
  margin-bottom: 30px;
  line-height: 1.6;

  p {
    margin-bottom: 15px;
  }
`;

const Question = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #4a4a4a;
`;

const AnswerLabel = styled.label`
  display: block;
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #555;
  cursor: pointer;

  input {
    margin-right: 15px;
    transform: scale(1.2);
  }

  &:hover {
    color: #34495e;
  }
`;

const Button = styled.button`
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  color: white;
  background-color: #5a9fd4;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.3s;
  margin-top: 30px;

  &:hover {
    background-color: #4682b4;
    transform: scale(1.05);
  }
`;

const Message = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #34495e;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Półprzezroczyste tło */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Nad wszystkimi elementami */
`;

const Spinner = styled.div`
  border: 4px solid #f3f3f3; /* Jasnoszary */
  border-top: 4px solid #3498db; /* Niebieski */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Quiz = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const { nickname } = state || { nickname: 'Nieznany użytkownik' };

  const questions = [
    {
      question: "1. Co oznacza często stosowany w księgowości skrót 'KUP'?",
      answers: ["Księga użytku publicznego", "Księga użytku prywatnego", "Koszt użytku publicznego", "Koszt uzyskania przychodu"],
      correct: 3
      },
      {
      question: "2. Co oznacza skrót 'RK'?",
      answers: ["Rejestr klientów", "Raport kasowy", "Rachunek kosztów", "Rejestr kontrahentów"],
      correct: 1
      },
      {
      question: "3. Co oznacza skrót 'US'?",
      answers: ["Urząd Stanu", "Ustawa skarbowa", "Urząd skarbowy", "Ustawa o sprawozdawczości"],
      correct: 2
      },
      {
      question: "4. Co oznacza księgowy skrót 'WB'?",
      answers: ["Wartość brutto", "Wyciąg bankowy", "Wartość bazowa", "Wielkość biznesu"],
      correct: 1
      },
      {
      question: "5. Co oznacza skrót 'FZ' lub 'FVZ'?",
      answers: ["Faktura zaliczkowa", "Faktura zakupu (kosztowa)", "Faktura zewnętrzna", "Faktura zryczałtowana"],
      correct: 1
      },
      {
      question: "6. Co księgowa ukrywa pod oznaczeniem 'JDG'?",
      answers: ["Jednoosobową działalność gospodarczą", "Jednostkowy dziennik gospodarczy", "Jednostkowy dziennik główny", "Jednostkową deklarację gospodarczą"],
      correct: 0
      },
      {
      question: "7. Co oznacza skrót 'PPE'?",
      answers: ["Podatek od przychodów eksportowych", "Podatek od przychodów edukacyjnych", "Podatek od przychodów ewidencjonowanych (ryczałt)", "Podatek od przychodów ekonomicznych"],
      correct: 2
      },
      {
      question: "8. Co oznacza skrót 'NKUP'?",
      answers: ["Nie kwalifikuje się do ustalenia podatku", "Nowa księga ustaleń podatkowych", "Nie stanowi kosztu uzyskania przychodu", "Narodowy Komitet Ustalania Płac"],
      correct: 2
      },
      {
      question: "9. Co oznaczają stosowane w księgowości skróty 'FS' oraz 'FVS'?",
      answers: ["Faktura skonsolidowana", "Faktura wartości szacunkowej", "Faktura przychodowa (sprzedaży)", "Faktura wartości średniej"],
      correct: 2
      },
      {
      question: "10. Co oznacza skrót 'MPP'?",
      answers: ["Międzynarodowy plan płatności", "Międzywydziałowy program podatkowy", "Międzynarodowy pakt podatkowy", "Mechanizm podzielonej płatności"],
      correct: 3
      },
      {
      question: "11. Co oznacza bardzo powszechnie stosowany w księgowości skrót 'RB'?",
      answers: ["Rachunek bankowy", "Raport bieżący", "Roczny bilans", "Rejestracja biznesu"],
      correct: 0
      },
      {
      question: "12. Co oznacza skrót 'MPK'?",
      answers: ["Międzynarodowy plan kont", "Miejsce przechowywania ksiąg", "Miejsce powstawania kosztu", "Międzynarodowy Pakt Księgowy"],
      correct: 2
      },
      {
      question: "13. Co oznacza skrót 'WZ'?",
      answers: ["Weryfikacja zasobów", "Wartość zestawienia", "Wewnętrzne zestawienie", "Wydanie zewnętrzne"],
      correct: 3
      },
      {
      question: "14. Co ukrywa się pod skrótem 'RZiS'?",
      answers: ["Rejestr Zabezpieczeń i Środków", "Raport Zbiorczy i Szczegółowy", "Rachunek Zysków i Strat", "Rejestr Zmian i Stanów"],
      correct: 2
      },
      {
      question: "15. Co oznaczają skróty 'BO' oraz 'BZ'?",
      answers: ["Biuro Obsługi, Baza Zasobów", "Bieżąca Ocena, Biuro Zleceniobiorcy", "Bilans Otwarcia, Bilans Zamknięcia", "Baza Operacyjna, Bieżący Zysk"],
      correct: 2
      },
      {
      question: "16. Na fakturze VAT nie musi znajdować się:",
      answers: ["Numer NIP Firmy", "Numer Regon Firmy", "Adres Firmy"],
      correct: 1
      },
      {
      question: "17. Faktura pro forma wymaga podpisu:",
      answers: ["tylko w formie papierowej", "zarówno w formie papierowej, jak i cyfrowej", "nie wymaga podpisu"],
      correct: 2
      },
      {
      question: "18. Jeśli prowadzisz jednoosobową działalność gospodarczą, która nie ponosi dużych kosztów, najkorzystniejszą formą opodatkowania może się okazać:",
      answers: ["ryczałt od przychodów ewidencjonowanych", "Księga Przychodów i Rozchodów", "pełna księgowość"],
      correct: 0
      },
      {
      question: "19. Ile czasu, licząc od dnia bilansowego, mają spółki zarejestrowane w Krajowym Rejestrze Sądowym (KRS) na sporządzenie sprawozdania:",
      answers: ["3 miesiące", "2 miesiące", "1 miesiąc"],
      correct: 0
      },
      {
      question: "20. Jaki próg rocznej sprzedaży zobowiązuje firmę do rejestracji jako płatnik VAT:",
      answers: ["300 tys. Zł", "200 tys. Zł", "500 tys. Zł"],
      correct: 1
      },
      {
      question: "21. Jednolity Plik Kontrolny (JPK) to cyfrowy dokument zawierający zestaw danych firmowych, a obowiązek jego składania jest nałożony na każdego:",
      answers: ["zgłaszającego ubezpieczonych w ZUS", "prowadzącego działalność gospodarczą", "czynnego podatnika VAT"],
      correct: 2
      },
      {
      question: "22. Z płacenia podatku PIT są zwolnione:",
      answers: ["duchowni katoliccy i innych wyznań", "osoby do 26 roku życia, które nie osiągają dochodów przekraczających 85 528 zł rocznie", "rolnicy ubezpieczeni w KRUS"],
      correct: 1
      },
      {
      question: "23. Dokumenty podlegające księgowaniu przez jednostkę gospodarczą to dowody:",
      answers: ["budżetowe", "materialne", "księgowe", "pieniężne"],
      correct: 2
      },
      {
      question: "24. Bilans, czyli główny element sprawozdania finansowego, składa się z pozycji:",
      answers: ["aktywa i pasywa", "przychody i koszty", "zyski i straty", "koszty operacyjne i przychody finansowe"],
      correct: 0
      },
      {
      question: "25. Podstawowym dokumentem regulującym w Polsce system rachunkowości jest:",
      answers: ["Ustawa o podatku dochodowym od osób fizycznych", "Ustawa o podatku dochodowym od osób prawnych", "Ustawa o swobodzie działalności gospodarczej", "Ustawa o rachunkowości"],
      correct: 3
      },
      {
      question: "26. Wprowadzenie do sprawozdania finansowego to część:",
      answers: ["bilansu", "rachunku zysków i strat", "informacji dodatkowej", "rachunku przepływów pieniężnych"],
      correct: 2
      },
      {
      question: "27. Do głównych elementów sprawozdania finansowego zaliczamy:",
      answers: ["bilans, rachunek zysków i strat, informację dodatkową", "rachunek zysków i strat, informację dodatkową, zestawienie zmian w kapitale (funduszu) własnym", "bilans, rachunek przepływów pieniężnych, informację dodatkową", "bilans, rachunek zysków i strat, rachunek przepływów pieniężnych"],
      correct: 3
      },
      {
      question: "28. Zamknięcie ksiąg rachunkowych na koniec roku obrotowego polega na:",
      answers: ["dokonaniu inwentaryzacji", "ustaleniu sald końcowych aktywów i pasywów bilansu", "porównaniu zysków i start minionego okresu", "dokonaniu spisu dokumentów księgowych z danego okresu"],
      correct: 1
      },
      {
      question: "29. Inwentaryzacją nazywamy:",
      answers: ["opublikowanie sprawozdania finansowego", "ustalanie faktycznego stanu aktywów i pasywów", "badanie sprawozdania finansowego", "zliczanie dowodów księgowych"],
      correct: 1
      },
      {
      question: "30. Otwarcia ksiąg rachunkowych dokonuje się:",
      answers: ["na dzień zmiany zarządu", "na początek każdego miesiąca", "przed walnym zgromadzeniem zarządu", "na dzień ogłoszenia upadłości"],
      correct: 3
      },
      {
      question: "31. W którym roku powołano ogólnopolski 'Związek Księgowych w Polsce'?",
      answers: ["1922", "1926", "1932"],
      correct: 1
      },
      {
      question: "32. Kiedy i na podstawie czyjej decyzji zostało zarejestrowane Stowarzyszenie Księgowych w Polsce (SKwP) po zakończeniu wojny?",
      answers: ["15 stycznia 1945 roku, na podstawie decyzji Premiera Polski", "30 lipca 1946 roku, na podstawie decyzji Prezydenta miasta stołecznego Warszawy", "12 kwietnia 1947 roku, na podstawie decyzji Ministra Finansów"],
      correct: 1
      },
      {
      question: "33. Kiedy wydano pierwszy autoryzowany przekładu Międzynarodowych Standardów Rachunkowości (MSR)?",
      answers: ["1979", "1989", "1999"],
      correct: 2
      },
      {
      question: "34. Co obejmuje rachunkowość finansowa?",
      answers: ["Przyjęte zasady rachunkowości", "Prowadzenie na podstawie dowodów księgowych", "Okresowe sprawdzanie drogą inwentaryzacji rzeczywistego stanu aktywów i pasywów", "Wszystkie wymienione odpowiedzi"],
      correct: 3
      },
      {
      question: "35. Jakie są trzy zasadnicze przekroje strukturalne współczesnej rachunkowości?",
      answers: ["Rachunkowy, Ekonomiczny, Informatyczny", "Funkcjonalny, Przedmiotowy, Formalny", "Strukturalny, Organizacyjny, Procesowy", "Finansowy, Zarządczy, Informacyjny"],
      correct: 1
      },
      {
      question: "36. Jakie są elementy dokumentacji w rachunkowości?",
      answers: ["Dziennik, Konta księgi głównej, Konta ksiąg pomocniczych", "Księgi rachunkowe, Dokumenty księgowe, Dowody księgowe, Dziennik, Konta księgi głównej, Konta ksiąg pomocniczych", "Księgi rachunkowe, Dokumenty księgowe, Dowody księgowe", "Dziennik, Konta ksiąg pomocniczych, Zestawienie obrotów i sald"],
      correct: 1
      },
      {
      question: "37. Które z poniższych nie jest kategorią pasywów?",
      answers: ["Zobowiązania krótkoterminowe", "Zobowiązania długoterminowe", "Środki trwałe"],
      correct: 2
      },
      {
      question: "38. Jakie konta zaliczają się do aktywów obrotowych?",
      answers: ["Środki trwałe, nieruchomości", "Zapasy, należności, gotówka", "Kapitał zakładowy, rezerwy"],
      correct: 1
      },
      {
      question: "39. Co to jest 'przychód brutto'?",
      answers: ["Przychód po odliczeniu kosztów", "Przychód przed odliczeniem podatku dochodowego", "Przychód po odliczeniu VAT-u"],
      correct: 1
      },
      {
      question: "40. Co oznacza 'kwota netto' na fakturze?",
      answers: ["Kwota po doliczeniu VAT-u", "Kwota przed doliczeniem VAT-u", "Kwota, która nie obejmuje żadnych kosztów dodatkowych"],
      correct: 1
      },
      {
      question: "41. Co to jest „kapitał zakładowy”?",
      answers: ["Wartość wszystkich aktywów firmy", "Wartość wkładów wniesionych przez właścicieli do firmy", "Wartość dochodów firmy"],
      correct: 1
      },
      {
      question: "42. Jakie są podstawowe elementy faktury VAT?",
      answers: ["Numer identyfikacji podatkowej, data, kwota brutto", "Data, numer faktury, nazwa towaru, stawka VAT", "Kwota netto, kwota brutto, podpis odbiorcy"],
      correct: 1
      },
      {
      question: "43. Co oznacza pojęcie „wypłata dywidendy”?",
      answers: ["Przekazanie części zysku właścicielom firmy", "Rozliczenie wszystkich zobowiązań firmy", "Obniżenie wartości aktywów trwałych"],
      correct: 0
      },
      {
      question: "44. Jakie są rodzaje podatków dochodowych dla firm?",
      answers: ["VAT, PIT, CIT", "CIT, PIT, VAT", "CIT, PIT, podatek od nieruchomości"],
      correct: 1
      }
];

const [userAnswers, setUserAnswers] = useState(Array(questions.length).fill(null));
const [isSubmitted, setIsSubmitted] = useState(false);

useEffect(() => {
  const submitted = localStorage.getItem('quizSubmitted');
  if (submitted === 'true') {
    setIsSubmitted(true);
  }
}, []);

const handleAnswerChange = (questionIndex, answerIndex) => {
  const newAnswers = [...userAnswers];
  newAnswers[questionIndex] = answerIndex;
  setUserAnswers(newAnswers);
};

const calculateScore = () => {  // Moved this function definition UP
  return userAnswers.reduce((score, answer, index) => (answer === questions[index].correct? score + 1: score), 0);
};

const handleSubmit = async () => {
  setIsLoading(true); // Włączenie animacji oczekiwania

  const unansweredQuestions = userAnswers.reduce((acc, answer, index) => {
    if (answer === null) {
      acc.push(index);
    }
    return acc;
  }, []);

  if (unansweredQuestions.length > 0) {
    // Przeniesienie do pierwszego niewypełnionego pytania
    const firstUnansweredQuestion = document.querySelector(`#question-${unansweredQuestions[0]}`);
    if (firstUnansweredQuestion) {
      firstUnansweredQuestion.scrollIntoView({ behavior: 'smooth' });
    }

    // Podświetlenie pytań, na które nie udzielono odpowiedzi
    unansweredQuestions.forEach(questionIndex => {
      const questionElement = document.querySelector(`#question-${questionIndex}`);
      if (questionElement) {
        questionElement.classList.add('unanswered');
      }
    });
  } else {
      const score = calculateScore();
      try {
          await axios.post('https://szkoleniekostarskak.netlify.app/.netlify/functions/saveResults', { nickname, score });
          setIsSubmitted(true);
          localStorage.setItem('quizSubmitted', 'true');
      } catch (err) {
          console.error('Błąd podczas zapisywania wyniku:', err);
      }
  }

  setIsLoading(false); // Wyłączenie animacji oczekiwania
};

return (
  <Container>
    <GlobalStyle /> 
    {isLoading && (
      <Overlay>
        <Spinner />
      </Overlay>
    )}
    {isSubmitted ? (
      <Message>Odpowiedzi zostały wysłane.</Message>
    ) : (
      <QuizBox>
        <Title>Quiz dla {nickname}</Title>
        <Description>
          Cześć! Poniżej znajdziesz test, który pomoże Ci ocenić Twoje umiejętności w zakresie zawodu księgowej/księgowego.
          <p>
            Test składa się 44 pytań zamkniętych bez ograniczeń czasowych.
          </p>
          Test daje Ci ogólny obraz Twojej wiedzy o tym zawodzie oraz podstawowych zagadnieniach z nim związanych.
          <p>
            Pamiętaj jednak, że jeśli Twój wynik będzie niezadowalający, nie oznacza to, że nie możesz pracować w finansach. Jest to sygnał, aby bardziej zagłębić się w obszary tej branży. 🙂
          </p>
        </Description>
        {questions.map((q, questionIndex) => (
          <div key={questionIndex} id={`question-${questionIndex}`}>
            <Question>{q.question}</Question>
            {q.answers.map((answer, answerIndex) => (
              <AnswerLabel key={answerIndex}>
                <input type="radio" name={`question-${questionIndex}`} value={answerIndex} checked={userAnswers[questionIndex] === answerIndex} onChange={() => handleAnswerChange(questionIndex, answerIndex)} />
                {answer}
              </AnswerLabel>
            ))}
          </div>
        ))}
        <Button onClick={handleSubmit}>Zakończ test</Button>
      </QuizBox>
    )}
  </Container>
);
};

export default Quiz;