import React from 'react';
import './css/styles.css';
import './css/styles.css';
import {Navbar} from './navbar';
import {Footer} from './footer';

let journal_data = [
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"02", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"03", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"04", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"05", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"06", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
]
function JournalHeader() {
    return (
        <header>
            <div>
                <h1>Cherry Habit Tracker</h1>
                <h2 className="subheader">Journal</h2>
            </div>
        </header>
    );
}

let Entry = function(entData) {
    return (
        <div className="entry">
        <h3>{entData.title}</h3>
        <p className="date"><time dateTime={entData.datetime}>{entData.date}</time></p>
        <p className="first-line">{entData.fline}</p>
        </div>
    )
    
}
let EntryLG = function(entData) {
    return (
        <div className="entry-lg">
        <h3>{entData.title}</h3>
        <p className="date"><time dateTime={entData.datetime}>{entData.date}</time></p>
        <p className="first-line">{entData.fline}</p>
        </div>
    )
    
}

function Main() {
    
    return (
        <div className="content">
            <section className="entries">
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
                    
                    <p className="date"><time dateTime="2024-04-20">04-20-2024</time></p>
                </div>
                <div id="write">
                    <form>
                        <label for="current-entry">Current</label>
                        <textarea id="current-entry" name="current-entry" rows="25"></textarea>
                        <input id="save" type="submit" value="Save" />
                    </form>
                </div>
            </section>
        </div>
    )
}

export default function JournalApp() {
    return(
        <div>
            <Navbar />
            <div>
                <JournalHeader />
                <main>
                    <Main />
                </main>
            </div>
            <Footer />
        </div>
   
    )
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<JournalApp />);
