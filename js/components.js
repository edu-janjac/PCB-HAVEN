//topnav

class Topnav extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
        .topnav ul {
                list-style-type: none;
                margin: 0;
                padding: 0;
                overflow: hidden;
                background-color: #1a1a1a;
                display: flex;
            }
        .topnav ul li a {
                display: block;
                color: white;
                text-align: center;
                padding: 18px 20px;
                text-decoration: none;
            }
        .topnav ul li a:hover {
                background-color: #111111;
            }
        </style>
        <nav class="topnav">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="info.html">What is a PCB?</a></li>
                <li><a href="store.html">Store</a></li>
                <li><a href="design.html">Design</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
        `;
    }
}

customElements.define('top-nav', Topnav);

//footer
class Footer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <style>
        footer {
            background-color: #1a1a1a;
            text-align: center;
            color: rgb(255, 255, 255);
            position: fixed;
            width: 100%;
            height: 3rem;
            bottom: 0;
        }
        </style>
        <footer>
            <p>&copy; 2026 PCB HAVEN. All rights reserved.</p>
        </footer>
        `
    }
}

customElements.define('foot-er', Footer) 