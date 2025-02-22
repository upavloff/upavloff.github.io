import React from 'react';

import './Publications.css';

function Publications() {
    return (
        <div className="publications">
            <h2>Publications</h2>
            <ul>
                <li>
                    <a href="/Incentive_Compatibility_of_Ethereum_s_consensus_protocol.pdf" target="_blank" rel="noopener noreferrer">
                        <strong>Incentive Compatibility of Ethereum's PoS Consensus Protocol. </strong>
                    </a>
                    Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 28th International Conference on Principles of Distributed Systems, OPODIS 2024.
                </li>
                <li>
                    <a href="https://ieeexplore.ieee.org/document/10646904" target="_blank" rel="noopener noreferrer">
                        <strong>Byzantine Attacks Exploiting Penalties in Ethereum PoS. </strong>
                    </a>
                    Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2024). 54th Annual IEEE/IFIP International Conference on Dependable Systems and Networks, DSN 2024, Brisbane, QSL, Australia.
                </li>
                <li>
                    <a href="https://dl.acm.org/doi/10.1145/3555776.3577655" target="_blank" rel="noopener noreferrer">
                        <strong>Ethereum Proof-of-Stake under Scrutiny. </strong>
                    </a>
                    Pavloff, U., Amoussou-Guenou, Y., & Tucci-Piergiovanni, S. (2023, March). In Proceedings of the 38th ACM/SIGAPP Symposium on Applied Computing (pp. 212-221).
                </li>
                <li>
                    <a href="https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.OPODIS.2023.4" target="_blank" rel="noopener noreferrer">
                        <strong>The Synchronization Power of Auditable Registers. </strong>
                    </a>
                    Attiya, H., Del Pozzo, A., Milani, A., Pavloff, U., & Rapetti, A. (2023). 27th International Conference on Principles of Distributed Systems, OPODIS 2023.
                </li>
                <li>
                    <a href="https://arxiv.org/abs/2210.08844" target="_blank" rel="noopener noreferrer">
                        <strong>Sequential Elimination Voting Games. </strong>
                    </a>
                    Pavloff, U., Cazenave, T., & Lang, J. (2022). arXiv preprint.
                </li>
            </ul>

            <h2>Manuscript</h2>
            <div>
                I defended my PhD thesis in November 2024. The manuscript is titled{" "}
                <a href="/manuscript-UlyssePavloff-EN.pdf" target="_blank" rel="noopener noreferrer">
                    <strong>A Game-Theoretic Approach to the Study of Blockchain’s Robustness</strong>
                </a>. It explores the robustness of blockchain protocols using game-theoretic and distributed systems models, with a focus on Ethereum’s Proof-of-Stake protocol.
            </div>
        </div>
    );
}

export default Publications;
