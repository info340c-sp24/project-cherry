'use strict';

let journal_data = [
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"02", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"03", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"04", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"05", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"06", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
]

function HeadTitle(props) {
    return <h1>Cherry Habit Tracker</h1>;
}
function SubTitle(props) {
    return <h2 class="subheader">Journal</h2>;
}

function Header(props) {
    return (
        <header>
            <HeadTitle />
            <SubTitle />
        </header>
    );
}

let Entry = function(props) {
    <div className="entry">
        <h3>{props.title}</h3>
        <p className="date"><time dateTime={props.datetime}>{props.date}</time></p>
        <p className="first-line">{props.fline}</p>
    </div>
}
let EntryLG = function(props) {
    <div className="entry-lg">
        <h3>{props.title}</h3>
        <p className="date"><time dateTime={props.datetime}>{props.date}</time></p>
        <p className="first-line">{props.fline}</p>
    </div>
}

let Form = function(props) {
    const form = document.querySelector(form);
    
}

function Main(props) {
    
    return (
        <div className="content">
            <section class="entries">
                <div className="title">
                    <h2>Past Entries</h2>
                </div>
                {journal_data.map((entry, index) => {
                    const EntryComponent = index <= 3 ? Entry : EntryLG;
                    return <EntryComponent key={index} {...entry} />;
                })}
            </section>
            <section className="page">
                <div className="title">
                    <h2 className ="current-title">Current Entry</h2>
                    
                    <p className="date"><time datetime="2024-04-20">04-20-2024</time></p>
                </div>
                <div id="write">
                    
                </div>
            </section>
        </div>
    )
}

function 

{/* <section class="page">
                <div class="title">
                    <h2 class="current-title">Current Entry</h2>
                    <p class="date"><time datetime="2024-04-20">04-20-2024</time></p>
                </div>
                <div id="write">
                    <form>
                        <label for="current-entry">Current</label>
                        <textarea id="current-entry" name="current-entry" rows="25"></textarea>
                        <input id="save" type="submit" value="Save">
                    </form>
                </div>

            </section> */}



{/* /* <body>
    <nav>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="journal.html">Journal</a></li>
            <li><a href="summary.html">Summary</a></li>
            <li><a href="quiz.html">Quiz</a></li>
        </ul>
    </nav>
    <header>
        <h1>Cherry Habit Tracker</h1>
        <h2 class="subheader">Journal</h2>
    </header>
    <main>
        <div class="content">
            <section class="entries">
                <div class="title">
                    <h2>Past Entries</h2>
                </div>

                <div class="entry">
                    <h3>Title A</h3>
                    <p class="date"><time datetime="2024-04-20">05/12/24</time></p>
                    <p class="first-line">first line text</p>
                </div>
                <div class="entry">
                    <h3>Title A</h3>
                    <p class="date"><time datetime="2024-04-20">05/12/24</time></p>
                    <p class="first-line">first line text</p>
                </div>
                <div class="entry">
                    <h3>Title A</h3>
                    <p class="date"><time datetime="2024-04-20">05/12/24</time></p>
                    <p class="first-line">first line text</p>
                </div>
                <div class="entry-lg">
                    <h3>Title A</h3>
                    <p class="date"><time datetime="2024-04-20">05/12/24</time></p>
                    <p class="first-line">first line text</p>
                </div>
                <div class="entry-lg">
                    <h3>Title A</h3>
                    <p class="date"><time datetime="2024-04-20">05/12/24</time></p>
                    <p class="first-line">first line text</p>
                </div>
                <div class="entry-lg">
                    <h3>Title A</h3>
                    <p class="date"><time datetime="2024-04-20">05/12/24</time></p>
                    <p class="first-line">first line text</p>
                </div>
            </section>
            <section class="page">
                <div class="title">
                    <h2 class="current-title">Current Entry</h2>
                    <p class="date"><time datetime="2024-04-20">04-20-2024</time></p>
                </div>
                <div id="write">
                    <form>
                        <label for="current-entry">Current</label>
                        <textarea id="current-entry" name="current-entry" rows="25"></textarea>
                        <input id="save" type="submit" value="Save">
                    </form>
                </div>

            </section>


        </div>


    </main>
    <footer>
        <p>&copy; 2024 Cherry Company. All rights reserved.</p>
        <ul>
            <li>Phone: +1234567890</li>
            <li>Email: <a href="mailto:support@cherrytracker.com">support@cherrytracker.com</a></li>
            <li>Socials:
                <a href="http://twitter.com/" target="_blank" title="Follow us on Twitter">Twitter</a>,
                <a href="http://facebook.com/" target="_blank" title="Like us on Facebook">Facebook</a>,
                <a href="http://instagram.com/" target="_blank" title="Follow us on Instagram">Instagram</a>
            </li>
        </ul>
    </footer>




</body> */ */}