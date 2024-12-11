
import React from 'react';

import './CV.css';
import picProfile from './assets/picProfile.jpeg';

function CV() {
    return (
        <div className="cv">
            <h2>About me</h2>
            <div className="cv-content">

                <div className="cv-text">
                    <p>
                        I am Ulysse Pavloff, a PhD in Computer Science specializing in Blockchain and Game Theory.
                        With teaching experience at École Polytechnique, HEC, and ENSIIE, I am passionate about research, technology, and currently exploring the intricacies of ZK-SNARKs.

                    </p>
                    <p>
                        My PhD focuses on Ethereum's Proof-of-Stake protocol, studying its robustness through the lenses of distributed systems and game theory. I analyze the influence of incentive structures on safety and liveness, identifying potential vulnerabilities and strategic behaviors of validators.
                    </p>
                    {/* Link to CV */}
                    <a href="/Pavloff_Resume.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">
                        View my full CV [PDF]
                    </a>      (updated 01/12/2024).
                </div>
                {/* Profile image */}
                <div className="cv-image">
                    <img src={picProfile} alt="Ulysse Pavloff" />
                </div>
            </div>
        </div>
    );
}

export default CV;