import { useState } from "react";

const derDieDasUrl = "http://localhost:5000/derDieDas";

const AddAWord = () => {
    const [artikel, setArtikel] = useState("");
    const [singular, setSingular] = useState("");
    const [plural, setPlural] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const word = { artikel, singular, plural };

        fetch("http://localhost:5000/derDieDas", {
            method: "POST",
            body: JSON.stringify(word),
            headers: { "Content-Type": "application/json" },
        });
    };

    return [
        <form className="addAWord" onSubmit={(event) => {
            event.preventDefault();
          }}>
            <h3 className="addForm">Füge neue Wörter hinzu</h3>

            <select
                className="form"
                onChange={(e) => setArtikel(e.target.value)}
            >
                <option value="der">der</option>
                <option value="die">die</option>
                <option value="das">das</option>
            </select>
            <input
                className="form"
                type="text"
                onChange={(e) => setSingular(e.target.value)}
                value={singular}
            />
            <input
                className="form"
                type="text"
                onChange={(e) => setPlural(e.target.value)}
                value={plural}
            />
            <button className="speichern" onClick={handleSubmit}>speichern</button>
        </form>,
        ,
    ];
};
export default AddAWord;
