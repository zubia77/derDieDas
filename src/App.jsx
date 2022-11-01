import "./App.scss";
import { useState, useEffect } from "react";
import _words from "../data/derDieDas.json";
import GetRandomNumber from "../components/GetRandomNumber"
import AddAWord from "../components/AddAWord"



function App() {
    const [currentMessage, setCurrentMessage] = useState("");
    const [testedWords, setTestedWords] = useState([]);
    const [untestedWords, setUntestedWords] = useState(_words);
    const [currentWord, setCurrentWord] = useState({});
    const [choiceNumber, setChoiceNumber] = useState(1);
    const [wordIsCorrect, setWordIsCorrect] = useState(false);



    const defineCurrentWord = () => {
        const index = GetRandomNumber(0, untestedWords.length - 1);
        setCurrentWord({ ...untestedWords[index] });
    };

    const prepareNextWord = () => {
        defineCurrentWord();
        setCurrentMessage("Wähle der, die oder das");
    };

    useEffect(() => {
        prepareNextWord();
   
    }, []);

    const handleChoice = (article) => {
        if (article === currentWord.artikel) {
            setCurrentMessage(
                ` ${currentWord.artikel} ${currentWord.singular} ist richtig!<br/> 
				(${currentWord.plural})`
            );
            if (choiceNumber === 1) {
                setUntestedWords([
                    ...untestedWords.filter(
                        (m) => m.singular !== currentWord.singular
                    ),
                ]);
                setTestedWords([...testedWords, currentWord]);
            }
            setWordIsCorrect(true);
        } else {
            setCurrentMessage(
                `"${article} ${currentWord.singular}" ist falsch`
            );
            setChoiceNumber(choiceNumber + 1);
        }
    };

    const handleNextWord = () => {
        setChoiceNumber(1);
        setWordIsCorrect(false);
        prepareNextWord();
    };
   

    return (
        <div className="App">
            <h1 className="title">Der, Die oder Das</h1>
            <div>
                <img className="image" src="../images/edwardpc.png" />
            </div>
            {/* <AddAWord /> */}
            {untestedWords.length > 0 && (
                <>
                    <div className="artikelBtn">
                        <button
                            className="button der"
                            onClick={() => handleChoice("der")}
                        >
                            der
                        </button>
                        <button
                            className="button die"
                            onClick={() => handleChoice("die")}
                        >
                            die
                        </button>
                        <button
                            className="button das"
                            onClick={() => handleChoice("das")}
                        >
                            das
                        </button>
                    </div>
                    <div className="wordJson">{currentWord.singular}</div>
                    <div
                        className="message"
                        dangerouslySetInnerHTML={{ __html: currentMessage }}
                    ></div>
                    {wordIsCorrect && (
                        <button
                            className="nextBtn"
                            onClick={() => handleNextWord()}
                        >
                            Nächstes Wort
                        </button>
                    )}{" "}
                    <div className="testedWords">
                        <div className="tested">
                            richtige Antworten: {testedWords.length}
                        </div>
                        <div className="untested">
                            übrige Wörter: {untestedWords.length}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
