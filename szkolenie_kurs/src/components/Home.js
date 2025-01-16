import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaRegBuilding, FaLightbulb, FaGraduationCap } from 'react-icons/fa';
import backgroundImage from '../front.jpg';
import accountantImage from '../accountant.jpg';

// Stylizacja głównych sekcji
const MainContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #2c2c2c;
  line-height: 1.6;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

const HeroSection = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundImage}) no-repeat center center;
  background-size: cover;
  color: white;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background-color: #e0e0e0;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;

const InfoBox = styled.div`
  flex: 1;
  margin: 10px;
  padding: 20px;
  background-color: ${({ bgColor }) => bgColor || '#ffffff'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  border-top: 4px solid ${({ borderColor }) => borderColor || '#8c8c8c'};

  svg {
    font-size: 50px;
    color: ${({ iconColor }) => iconColor || '#8c8c8c'};
    margin-bottom: 15px;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: #2c2c2c;
  }

  ul {
    list-style-type: disc;
    padding-left: 20px;
    text-align: left;
    color: #4f4f4f;
  }

  li {
    margin-bottom: 8px;
  }
`;

const CareerSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Wyśrodkowanie poziome */
  padding: 50px 30px; /* Większy odstęp */
  background-color: #d6d6d6;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CareerText = styled.div`
  flex: 1;
  margin-right: 40px; /* Większy odstęp między tekstem a obrazem */

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.7rem; /* Nieco większa czcionka */
    margin-bottom: 20px;
    color: #2c2c2c;
  }

  p {
    font-size: 1.1rem; /* Nieco większa czcionka */
    color: #4f4f4f;
    line-height: 1.8;
    margin-bottom: 20px;
  }
`;

const CareerImage = styled.img`
  width: 40%; /* Trochę większy obraz */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 80%; /* Dopasowanie dla urządzeń mobilnych */
  }
`;

const FooterSection = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #2c2c2c;
  color: white;
`;

const StartButton = styled.button`
  margin-top: 20px;
  padding: 15px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #5a5a5a;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #424242;
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: #2c2c2c;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: #5a5a5a;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #424242;
    }
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [nickname, setNickname] = useState('');

  const handleStart = () => {
    setShowPopup(true);
  };

  const handlePopupSubmit = () => {
    if (nickname.trim()) {
      navigate('/quiz', { state: { nickname } });
    }
  };

  return (
    <MainContainer>
      {/* Sekcja 1 */}
      <HeroSection>
        <HeroTitle>Młodzi księgowi - przyszłość w liczbach</HeroTitle>
      </HeroSection>

 {/* Sekcja 2 */}
 <InfoSection>
        <InfoBox bgColor="#f5f5f5" borderColor="#8c8c8c" iconColor="#8c8c8c">
          <FaRegBuilding />
          <h3>Dlaczego warto zainteresować się księgowością?</h3>
          <ul>
            <li>Stabilna praca i wysokie zarobki</li>
            <li>Możliwość pracy w różnych sektorach. Od firm prywatnych, przez banki, po instytucje rządowe</li>
            <li>Dynamiczny rozwój kariery: specjalista, analityk, audytor czy główny księgowy</li>
          </ul>
        </InfoBox>

        <InfoBox bgColor="#d9d9d9" borderColor="#a57c52" iconColor="#a57c52">
          <FaLightbulb />
          <h3>Co zyskujesz ucząc się księgowości?</h3>
          <ul>
            <li>Umiejętności zarządzania finansami osobistymi i firmowymi</li>
            <li>Znajomość zagadnień podatkowych i prawnych</li>
            <li>Rozwinięcie zdolności analitycznych i logicznego myślenia</li>
          </ul>
        </InfoBox>

        <InfoBox bgColor="#ececec" borderColor="#a89f91" iconColor="#a89f91">
          <FaGraduationCap />
          <h3>Jak wygląda ścieżka edukacyjna?</h3>
          <ul>
             <li>Szkoła średnia – przedmioty związane z podstawami ekonomii i rachunkowości.</li>
             <li>Studia – kierunki takie jak księgowość, finanse czy ekonomia.</li>
             <li>Certyfikaty zawodowe – np. ACCA, CIMA, czy certyfikat biegłego rewidenta.</li>
          </ul>
        </InfoBox>
      </InfoSection>

{/* Sekcja 3 */}
<CareerSection>
  <CareerText>
    <h3>Zawód księgowego</h3>
    <p>
      Zawód księgowego oferuje wiele możliwości i satysfakcji zawodowej. To ścieżka kariery dla osób z pasją do finansów i precyzji, zapewniająca stabilność, rozwój i sukces.
    </p>
    <p>
      Dzięki dynamicznie zmieniającym się przepisom prawnym i podatkowym, księgowość pozostaje wyzwaniem, ale również dziedziną zapewniającą ciągły rozwój i doskonalenie umiejętności. To praca idealna dla osób, które lubią planowanie, analizę oraz wspieranie podejmowania strategicznych decyzji biznesowych.
    </p>
  </CareerText>
  <CareerImage src={accountantImage} alt="Człowiek z laptopem" />
</CareerSection>

      {/* Sekcja 4 */}
      <FooterSection>
        <h3>Dołącz do młodych księgowych!</h3>
        <StartButton onClick={handleStart}>Zacznij kurs</StartButton>
      </FooterSection>

      {showPopup && (
        <PopupContainer>
          <PopupContent>
            <h3>Podaj swoje imię i nazwisko</h3>
            <input
              type="text"
              placeholder="Imię i nazwisko"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <button onClick={handlePopupSubmit}>Rozpocznij kurs</button>
          </PopupContent>
        </PopupContainer>
      )}
    </MainContainer>
  );
};

export default Home;