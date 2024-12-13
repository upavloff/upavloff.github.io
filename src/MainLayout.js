import React from 'react';
import { NavLink } from 'react-router-dom';

import { SiGmail, SiGooglescholar, SiGithub, SiLinkedin, SiStackexchange, SiDblp } from 'react-icons/si'; //SiLetterboxd,  SiLichess,

import picProfile from './assets/picProfile.jpeg';
import snarkForumla from './assets/snarkForumla.png';
import snarkCircuit from './assets/snarkCircuit.png';
import stark from './assets/stark.png';
import introSNARK from './assets/introSNARK.png';
import consensus_layer from './assets/consensus_layer.webp';
import execution_layer from './assets/execution_layer.webp';
import intro_randomness from './assets/intro_randomness.webp';

function MainLayout({ children }) {

    const preloadImages = () => {

        //preload images
        const images = [
            picProfile,
            snarkForumla,
            snarkCircuit,
            stark,
            introSNARK,
            consensus_layer,
            execution_layer,
            intro_randomness,
        ];

        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

    };

    return (
        <div className="page">
            <div className="about-me">
                <h1>Ulysse Pavloff</h1>
                <p>
                    PhD in Computer Science, specializing in Blockchain and Game Theory.
                </p>
                <h3 style={{ marginTop: '30px' }}>Connect with me</h3>
                <ul className="social-list">
                    <li>
                        <a href="mailto:pavloffulysse@gmail.com" target="_blank" rel="noopener noreferrer" data-tooltip="pavloffulysse@gmail.com">
                            <SiGmail />
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/upavloff" target="_blank" rel="noopener noreferrer" data-tooltip="GitHub">
                            <SiGithub />
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com/in/ulysse-pavloff" target="_blank" rel="noopener noreferrer" data-tooltip="LinkedIn">
                            <SiLinkedin />
                        </a>
                    </li>
                    <li>
                        <a href="https://scholar.google.com/citations?user=f1mEJ54AAAAJ&hl=fr" target="_blank" rel="noopener noreferrer" data-tooltip="Google Scholar">
                            <SiGooglescholar />
                        </a>
                    </li>
                    <li>
                        <a href="https://ethereum.stackexchange.com/users/86774/upavloff" target="_blank" rel="noopener noreferrer" data-tooltip="Stack Exchange">
                            <SiStackexchange />
                        </a>
                    </li>
                    {/* <li>
              <a href="https://lichess.org/@/Udur" target="_blank" rel="noopener noreferrer" data-tooltip="Lichess">
                <SiLichess />
              </a>
            </li> 
            <li>
              <a href="https://letterboxd.com/upavloff/" target="_blank" rel="noopener noreferrer" data-tooltip="Letterboxd">
                <SiLetterboxd />
              </a>
            </li> */}
                    <li>
                        <a href="https://dblp.org/pid/331/3775.html" target="_blank" rel="noopener noreferrer" data-tooltip="DBLP">
                            <SiDblp />
                        </a>
                    </li>
                </ul>
            </div>


            <div className="right-section">
                <nav className="navigation" onMouseEnter={() => preloadImages()}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? 'nav-button active' : 'nav-button'
                        }
                    >
                        Publications
                    </NavLink>
                    <NavLink
                        to="/posts"
                        className={({ isActive }) =>
                            isActive ? 'nav-button active' : 'nav-button'
                        }
                    >
                        Posts
                    </NavLink>
                    <NavLink
                        to="/cv"
                        className={({ isActive }) =>
                            isActive ? 'nav-button active' : 'nav-button'
                        }
                    >
                        CV
                    </NavLink>
                </nav>

                <div className="contentElement">{children}</div>
            </div>
        </div>
    );
}

export default MainLayout;
