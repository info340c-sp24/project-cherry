// import React, { useState } from 'react';
// import './css/journal.css';
// import { Navbar } from './navbar';
// import { Footer } from './footer';

// let journal_data = [
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a Bad day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a Good day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a Horrible day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a AHHHH day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."}
// ];

// function JournalHeader() {
//     return (
//         <header>
//             <div>
//                 <h1>Cherry Habit Tracker</h1>
//                 <h2 className="subheader">Journal</h2>
//             </div>
//         </header>
//     );
// }

// let Entry = function (props) {
//     const handleEntryClick = () => {
//         props.setDisplayContent('OldWrite');
//         props.setEntryData(props.entryData);
//     };

//     return (
//         <div className="entry" onClick={handleEntryClick}>
//             <h3>{props.entryData.title}</h3>
//             <p className="date"><time dateTime={props.entryData.datetime}>{props.entryData.date}</time></p>
//             <p className="first-line">{props.entryData.fline}</p>
//         </div>
//     );
// };

// function CurrentWrite() {
//     const [currentTitle, setCurrentTitle] = useState("Enter Title...");

    
//     const handleTitleChange = (e) => {
//         setCurrentTitle(e.target.value);
//     };

//     const handleClick = () => {
//         if (currentTitle === "Enter Title...") {
//             setCurrentTitle("");
//         }
//     };

//     const handleBlur = () => {
//         if (currentTitle === "") {
//             setCurrentTitle("Enter Title...");
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Add your logic to save the current entry here
//     };
//     return (
//         <div>
//             <div className="title">
//                     <input
//                         type="text"
//                         value={currentTitle}
//                         onClick={handleClick}
//                         onChange={handleTitleChange}
//                         onBlur={handleBlur}
//                         className='current-title-input'
//                     />
//                     <p className="date"><time dateTime="2024-04-20">04-20-2024</time></p>
//                 </div>
//         <div id="write">
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="current-entry">Current</label>
//                 <textarea id="current-entry" name="current-entry" rows="25"></textarea>
//                 <input id="save" type="submit" value="Save" />
//             </form>
//         </div>
//         </div>
        
//     )
// }

// function OldWrite(entData) {
    
//     const [currentTitle, setCurrentTitle] = useState(entData.title);
    
//     const handleTitleChange = (e) => {
//         setCurrentTitle(e.target.value);
//     };

//     const handleClick = () => {
//         if (currentTitle === "Enter Title...") {
//             setCurrentTitle("");
//         }
//     };

//     const handleBlur = () => {
//         if (currentTitle === "") {
//             setCurrentTitle("Enter Title...");
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Add your logic to save the current entry here
//     };
//     return (
//         <div>
//             <div className="title">
//                     <input
//                         type="text"
//                         value={currentTitle}
//                         onClick={handleClick}
//                         onChange={handleTitleChange}
//                         onBlur={handleBlur}
//                         className='current-title-input'
//                     />
//                     <p className="date"><time dateTime={entData.datetime}>{entData.date}</time></p>
//                 </div>
//         <div id="written">
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="current-entry">Current</label>
//                 <textarea id="current-entry" name="current-entry" rows="25">{entData.fline}</textarea>
//                 <input id="update" type="submit" value="Update" />
//             </form>
//         </div>
//         </div>
        
//     )
// }

// function Main() {
//     const [displayContent, setDisplayContent] = useState('CurrentWrite');
//     const [entryData, setEntryData] = useState(null);

//     return (
//         <div className="content">
//             <section className="entries">
//                 <div className="title">
//                     <h2>Past Entries</h2>
//                 </div>
//                 {journal_data.map((entry, index) => {
//                     return <Entry key={index} entryData={entry} setDisplayContent={setDisplayContent} setEntryData={setEntryData} />;
//                 })}
//             </section>
//             <section className="page">
//                 <div className="journal-page">
//                     <h2>Journal Page</h2>
//                 </div>
//                 {displayContent === 'OldWrite' && <OldWrite {...entryData} />}
//                 {displayContent === 'CurrentWrite' && <CurrentWrite />}
//             </section>
//         </div>
//     );
// }

// export default function JournalApp() {
//     return (
//         <div>
//             <Navbar />
//             <div>
//                 <JournalHeader />
//                 <main>
//                     <Main />
//                 </main>
//             </div>
//             <Footer />
//         </div>
//     );
// }
import React, { useState } from 'react';
import './css/journal.css';
import { Navbar } from './navbar';
import { Footer } from './footer';

let journal_data = [
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a Bad day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a Good day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a Horrible day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a AHHHH day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
    {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."}
];

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

function JournalApp() {
    const [displayContent, setDisplayContent] = useState('CurrentWrite');
    const [entryData, setEntryData] = useState(null);

    const handlePageChange = (page) => {
        setDisplayContent(page);
    };

    const handleEntryClick = (entData) => {
        setDisplayContent('OldWrite');
        setEntryData(entData);
    };

    return (
        <div>
            <Navbar />
            <JournalHeader />
            <main>
                <div className="content">
                    <section className="entries">
                        <div className="title">
                            <h2>Past Entries</h2>
                        </div>
                        {journal_data.map((entry, index) => (
                            <div key={index} className="entry" onClick={() => handleEntryClick(entry)}>
                                <h3>{entry.title}</h3>
                                <p className="date"><time dateTime={entry.datetime}>{entry.date}</time></p>
                                <p className="first-line">{entry.fline}</p>
                            </div>
                        ))}
                    </section>
                    <section className="page">
                        {displayContent === 'OldWrite' && (
                            <div>
                                <div className="title">
                                    <h2>Past Entry</h2>
                                    <input 
                                        type="text" 
                                        value={entryData?.title || ''} readOnly />
                                    <p className="date"><time dateTime={entryData?.datetime}>{entryData?.date}</time></p>
                                </div>
                                <div className="written">
                                    <textarea className="current-entry" value={entryData?.fline || ''} readOnly />
                                    <button className="save" onClick={() => alert('Saving entry...')}>Save</button>
                                    <button onClick={() => handlePageChange('CurrentWrite')}>Back to Current Entry</button>
                                </div>
                                
                            </div>
                        )}
    
                        {displayContent === 'CurrentWrite' && (
                            <div>
                                <h2>Current Entry</h2>
                                <input type="text" placeholder="Enter Title..." />
                                <p className="date"><time dateTime="2024/05/19">05/19/2024</time></p>
                                <textarea className="current-entry" rows="25" placeholder="Enter your entry..." />
                                <button className="save" onClick={() => alert('Saving entry...')}>Save</button>
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default JournalApp;
