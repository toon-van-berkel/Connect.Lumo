import { content } from "./data/content.js";
import { preferredLanguage } from "./preferences.js";
import { isLoading } from "./connect.js";

let nav = document.getElementById('nav');
let footer = document.getElementById('footer');
let connectBtn = document.getElementById('connect');
let containerElement = document.querySelector('#container');

function generateNav() {
    if (!nav) return;
    const languageContent = content[preferredLanguage] || content["en-gb"];

    nav.innerHTML = `
        <ul>
            <li><a href="#">${languageContent.nav.link1}</a></li>
            <li><a href="#">${languageContent.nav.link2}</a></li>
            <li><a href="#">${languageContent.nav.link3}</a></li>
        </ul>
        <a href="#">
            <img src="./assets/LUMOconnect-logo.png" alt="${languageContent.nav.imgAlt}">
        </a>
        <ul>
            <li><a href="#">${languageContent.nav.link4}</a></li>
            <li>
                <button id="login">
                    ${languageContent.nav.link5}
                </button>
            </li>
        </ul>
    `;
}

function generateFooter() {
    if (!footer) return;
    const languageContent = content[preferredLanguage] || content["en-gb"];

    footer.innerHTML = `
        <div>
            <ul>
                <li class="logo-container">
                    <img src="./assets/LUMOconnect-logo.png" alt="${languageContent.footer.imgAlt}"> LUMO Connect
                </li>
                <li>©Copyright 2026 - 2029</li>
            </ul>
            <ul>
                <li><a href="#">${languageContent.footer.link1}</a></li>
                <li><a href="#">${languageContent.footer.link2}</a></li>
                <li><a href="#">${languageContent.footer.link3}</a></li>
                <li><a href="#">${languageContent.footer.link4}</a></li>
            </ul>
        </div>
        <div>
            <ul class="row">
                <li><a href="https://lumo.hogeschool-rotterdam.com/">LUMO</a></li> |
                <li><a href="http://connect-lumo.hogeschool-rotterdam.com/">LUMO Connect</a></li> |
                <li>Team 12 - CLE3</li>
            </ul>
            <ul class="row">
                <li><a href="#">${languageContent.footer.link5}</a> |</li>
                <li><a href="#">${languageContent.footer.link6}</a> |</li>
                <li><a href="#">${languageContent.footer.link7}</a></li>
            </ul>
        </div>
    `;
}

function generateButton() {
    const languageContent = content[preferredLanguage] || content["en-gb"];
    connectBtn.innerHTML = languageContent.connect.connectButton;
}

export function generateConnectingComponent() {
    if (isLoading) {
        const languageContent = content[preferredLanguage] || content["en-gb"];

        containerElement.innerHTML = `
            <img src="./assets/Loading.gif" alt="${languageContent.connectingComponent.gifAlt}" class="loading">
            <h1>${languageContent.connectingComponent.title}<span id="load"></span></h1>
            <p>${languageContent.connectingComponent.message}<a href="#">${languageContent.connectingComponent.link}</a>.</p>
            <div class="badge">${languageContent.connectingComponent.badge}</div>
        `;
    }
}

export function generateContent() {
    generateNav();
    generateFooter();
    generateButton();
    generateConnectingComponent();
}