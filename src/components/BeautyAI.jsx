import { useState } from "react";
import "./BeautyAI.css";

export default function BeautyAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [recommendation, setRecommendation] = useState(null);

    const questions = [
        {
            id: "hairType",
            text: "What describes your hair texture?",
            options: ["Straight", "Wavy", "Curly", "Coily"]
        },
        {
            id: "concern",
            text: "What is your primary hair concern?",
            options: ["Dryness/Frizz", "Hair Fall", "Dandruff", "Damage/Color Care"]
        }
    ];

    const handleOption = (option) => {
        const newAnswers = { ...answers, [questions[step].id]: option };
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            generateResult(newAnswers);
        }
    };

    const generateResult = (ans) => {
        let result = {
            title: "The Ultra-Nourish Routine",
            desc: "Based on your wavy and dry concerns, our experts recommend the L'Oréal Professional Mythic Oil range.",
            products: ["Mythic Oil Shampoo", "Mythic Mask"]
        };

        if (ans.hairType === "Straight") {
            result = {
                title: "The Sleek Shine Routine",
                desc: "For your straight hair, we recommend the Wella SP LuxeOil collection for weightless shine.",
                products: ["LuxeOil Keratin Protection", "Shampoo"]
            };
        } else if (ans.hairType === "Curly") {
            result = {
                title: "The Curl Definition Routine",
                desc: "To define those curls, our stylists suggest the System Professional Hydrate line.",
                products: ["Hydrate Shampoo", "Curl Definer Cream"]
            };
        }

        setRecommendation(result);
    };

    const reset = () => {
        setStep(0);
        setAnswers({});
        setRecommendation(null);
    };

    return (
        <div className={`beauty-ai-fixed ${isOpen ? "expanded" : ""}`}>
            {/* Trigger */}
            {!isOpen && (
                <div className="beauty-ai-trigger" onClick={() => setIsOpen(true)}>
                    <div className="ai-wave"></div>
                    <span className="ai-icon">🤖</span>
                    <div className="ai-notif">AI EXPERT</div>
                </div>
            )}

            {/* AI Modal */}
            {isOpen && (
                <div className="beauty-ai-modal">
                    <div className="ai-header">
                        <h3>Beauty <span>Scanner AI</span></h3>
                        <span className="close-ai" onClick={() => { setIsOpen(false); reset(); }}>×</span>
                    </div>

                    <div className="ai-content">
                        {!recommendation ? (
                            <div className="quiz-step">
                                <p className="ai-msg">Hello! I'm your AI hair consultant. Let's find your perfect routine.</p>
                                <div className="progress-dots">
                                    {questions.map((_, i) => <div key={i} className={`dot ${i === step ? 'active' : ''}`}></div>)}
                                </div>
                                <h4>{questions[step].text}</h4>
                                <div className="options-grid">
                                    {questions[step].options.map(opt => (
                                        <button key={opt} onClick={() => handleOption(opt)}>{opt}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="result-step">
                                <div className="success-check">✨</div>
                                <h4>{recommendation.title}</h4>
                                <p>{recommendation.desc}</p>
                                <div className="rec-products">
                                    {recommendation.products.map(p => <span key={p} className="p-tag">{p}</span>)}
                                </div>
                                <button className="reset-btn" onClick={reset}>Try Again</button>
                                <button className="book-ai-btn" onClick={() => setIsOpen(false)}>Talk to Stylist</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
