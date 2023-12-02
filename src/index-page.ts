import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import "godown";
@customElement("index-page")
export class IndexPage extends LitElement {
  @property() avatar: string =
    "https://avatars.githubusercontent.com/u/94100555?v=4";
  @property({ type: Array }) repos: any[] | null = null;
  @property({ type: Array }) sites = [
    "startracex.github.io",
    "startrace.games",
    "startrace.eu.org",
    "aka.中国",
  ];
  render() {
    return html`
      <main>
        <a href="//github.com/startracex">
          <img src=${this.avatar} title="avatar" />
        </a>
        <section>
          ${this.repos ? this.repos : html`<i id="loading"></i>`}
        </section>
        <nav>
          <flex-flow>
            ${this.sites.map((site) => {
              return html`<super-a arrow="delta" href="//${site}/">
                ${site}
              </super-a>`;
            })}
          </flex-flow>
        </nav>
      </main>
    `;
  }
  protected firstUpdated(): void {
    const logo =
      "  _____ _______       _____ _______ _____            _____ ______ \n / ____|__   __|/\\   |  __ \\__   __|  __ \\     /\\   / ____|  ____|\n| (___    | |  /  \\  | |__) | | |  | |__) |   /  \\ | |    | |__   \n \\___ \\   | | / /\\ \\ |  _  /  | |  |  _  /   / /\\ \\| |    |  __|  \n ____) |  | |/ ____ \\| | \\ \\  | |  | | \\ \\  / ____ \\ |____| |____ \n|_____/   |_/_/    \\_\\_|  \\_\\ |_|  |_|  \\\\_/_/    \\_\\_____|______|";
    console.log(logo);
    fetch("https://api.github.com/users/startracex/repos")
      .then((res) => res.json())
      .then((res) => {
        this.repos = res.map((repo: any) => {
          return html`<flex-flow flexflow="column" style="margin: .25em;">
            <super-a arrow="delta" href="${repo.html_url}">
              ${repo.name}
            </super-a>
            ${repo.description && html`<span>${repo.description}</span>`}
          </flex-flow>`;
        });
      });
  }
  static styles = css`
    :host {
      margin: 1em;
      width: 100%;
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: center;
    }
    span {
      font-size: 90%;
      margin: 0.2em 1em;
      color: #a5a5a5;
    }
    img {
      margin: 2em;
      height: 125px;
      width: 125px;
      border-radius: 50%;
      transition: border-radius 0.2s ease-in-out;
      background: black;
    }
    img:hover {
      border-radius: 5%;
    }
    main {
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 90%;
    }
    section {
      width: fit-content;
      display: flex;
      flex-direction: column;
    }
    nav {
      margin: 1em;
    }
    nav super-a {
      margin: 8px;
    }
    super-a:hover {
      color: #ff6600;
    }
    #loading {
      margin: 36px;
      display: block;
      height: 120px;
      width: 120px;
      border: 3px solid transparent;
      border-radius: 50%;
      border-top: 5.2px solid #3200e6;
      -webkit-animation: spin 4s linear infinite;
      animation: spin 4s linear infinite;
      position: relative;
    }
    #loading::before {
      content: "";
      position: absolute;
      top: 6.4px;
      bottom: 6.4px;
      left: 6.4px;
      right: 6.4px;
      border-radius: 50%;
      border: 5px solid transparent;
      border-top-color: #00b8ac;
      -webkit-animation: 3s spin linear infinite;
      animation: 3s spin linear infinite;
    }
    #loading::after {
      content: "";
      position: absolute;
      top: 18px;
      bottom: 18px;
      left: 18px;
      right: 18px;
      border-radius: 50%;
      border: 5px solid transparent;
      border-top-color: #ff6600;
      -webkit-animation: spin 1.5s linear infinite;
      animation: spin 1.5s linear infinite;
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;
}
