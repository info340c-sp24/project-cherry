// import React, { useState } from 'react';
// import './css/journal.css';
// import { Navbar } from './navbar';
// import { Footer } from './footer';
// import { ref, get } from 'firebase/database';
// import { db } from './index';


// let journal_data = [
//     {"key":"01", "title":"Had a ___ day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a Bad day", "datetime": "2024-04-19", "date":"04/19/24", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a Good day", "datetime": "2022-04-19", "date":"04/19/22", "fline":"this is the first line..."},
//     {"key":"01", "title":"Had a Horrible day", "datetime": "2022-04-10", "date":"04/10/22", "fline":"this is the first line..."},
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

// function JournalApp({ user }) {
//     const [displayContent, setDisplayContent] = useState('CurrentWrite');
//     const [entryData, setEntryData] = useState(null);
//     const [writtenBefore, setWrittenBefore] = useState(null);
//     const [writtenAfter, setWrittenAfter] = useState(null);

//     const handlePageChange = (page) => {
//         setDisplayContent(page);
//     };

//     const handleEntryClick = (entData) => {
//         setDisplayContent('OldWrite');
//         setEntryData(entData);
//     };

//     const filteredEntries = journal_data.filter((entry) => {
//         const datetime = new Date(entry.datetime);
//         if (writtenBefore && datetime > new Date(writtenBefore)) {
//             return false; // Exclude entries written after the specified time
//         }
//         if (writtenAfter && datetime < new Date(writtenAfter)) {
//             return false; // Exclude entries written before the specified time
//         }
//         return true;
//     });

//     return (
//         <div>
//             <Navbar />
//             <JournalHeader />
//             <main>
//                 <div className="content">
//                     <section className="entries">
//                         <div className="title">
//                             <h2>Past Entries</h2>
//                             <div className="filter-options">
//                                 <h3 className="filters">Filters</h3>
//                                 <label >
//                                     Written Before:
//                                     <input
//                                         type="date"
//                                         value={writtenBefore}
//                                         onChange={(e) => setWrittenBefore(e.target.value)}
//                                     />
//                                 </label>
//                                 <label >
//                                     Written After:
//                                     <input
//                                         className='last-filter'
//                                         type="date"
//                                         value={writtenAfter}
//                                         onChange={(e) => setWrittenAfter(e.target.value)}
//                                     />
//                                 </label>
//                             </div>
//                         </div>
//                         {filteredEntries.map((entry, index) => (
//                             <div key={index} className="entry" onClick={() => handleEntryClick(entry)}>
//                                 <h3>{entry.title}</h3>
//                                 <p className="date"><time dateTime={entry.datetime}>{entry.date}</time></p>
//                                 <p className="first-line">{entry.fline}</p>
//                             </div>
//                         ))}
//                     </section>
//                     <section className="page">
//                         {displayContent === 'OldWrite' && (
//                             <div>
//                                 <div className="title">
//                                     <h2>Past Entry</h2>
//                                     <input 
//                                         type="text" 
//                                         value={entryData?.title || ''} readOnly />
//                                     <p className="date"><time dateTime={entryData?.datetime}>{entryData?.date}</time></p>
//                                 </div>
//                                 <div className="written">
//                                     <textarea className="current-entry" value={entryData?.fline || ''} readOnly />
//                                     <button className="save" onClick={() => alert('Saving entry...')}>Save</button>
//                                     <button onClick={() => handlePageChange('CurrentWrite')}>Back to Current Entry</button>
//                                 </div>
                                
//                             </div>
//                         )}
    
//                         {displayContent === 'CurrentWrite' && (
//                             <div>
//                                 <h2>Current Entry</h2>
//                                 <input type="text" placeholder="Enter Title..." />
//                                 <p className="date"><time dateTime="2024/05/19">05/19/2024</time></p>
//                                 <textarea className="current-entry" rows="25" placeholder="Enter your entry..." />
//                                 <button className="save" onClick={() => alert('Saving entry...')}>Save</button>
//                             </div>
//                         )}
//                     </section>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default JournalApp;
import React, { useState, useEffect } from 'react';
import './css/journal.css';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { ref, get, push } from 'firebase/database';
import { db } from './index';

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

function JournalApp({ user }) {
    const [displayContent, setDisplayContent] = useState('CurrentWrite');
    const [entryData, setEntryData] = useState({ title: '', fline: '' });
    const [writtenBefore, setWrittenBefore] = useState('');
    const [writtenAfter, setWrittenAfter] = useState('');
    const [journalData, setJournalData] = useState([]);

    useEffect(() => {
        const journalRef = ref(db, `users/${user.uid}/journal`);
        get(journalRef)
            .then((snapshot) => {
                const journalEntries = snapshot.val() || [];
                setJournalData(Object.values(journalEntries));
            })
            .catch((error) => {
                console.error('Error fetching journal data:', error);
            });
    }, [user.uid]);

    const handlePageChange = (page) => {
        setDisplayContent(page);
    };

    const handleEntryClick = (entData) => {
        setDisplayContent('OldWrite');
        setEntryData(entData);
    };

    const handleSave = () => {
        const newEntry = {
            title: entryData.title,
            fline: entryData.fline,
            datetime: new Date().toISOString(),
            date: new Date().toLocaleDateString(),
        };
        const journalRef = ref(db, `users/${user.uid}/journal`);
        push(journalRef, newEntry)
            .then(() => {
                setJournalData((prevData) => [...prevData, newEntry]);
                setEntryData({ title: '', fline: '' });
                setDisplayContent('CurrentWrite');
            })
            .catch((error) => {
                console.error('Error saving journal entry:', error);
            });
    };

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateTime = year + "-" + month + "-" + day;
    let dateReal = month + "-" + day + "-" + year;

    const filteredEntries = journalData.filter((entry) => {
        const datetime = new Date(entry.datetime);
        if (writtenBefore && datetime > new Date(writtenBefore)) {
            return false; // Exclude entries written after the specified time
        }
        if (writtenAfter && datetime < new Date(writtenAfter)) {
            return false; // Exclude entries written before the specified time
        }
        return true;
    });

    return (
        <div>
            <Navbar />
            <JournalHeader />
            <main>
                <div className="content">
                    <section className="entries">
                        <div className="title">
                            <h2>Past Entries</h2>
                            <div className="filter-options">
                                <h3 className="filters">Filters</h3>
                                <label>
                                    Written Before:
                                    <input
                                        type="date"
                                        value={writtenBefore}
                                        onChange={(e) => setWrittenBefore(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Written After:
                                    <input
                                        className="last-filter"
                                        type="date"
                                        value={writtenAfter}
                                        onChange={(e) => setWrittenAfter(e.target.value)}
                                    />
                                </label>
                            </div>
                        </div>
                        {filteredEntries.map((entry, index) => (
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
                                        value={entryData?.title || ''} 
                                        readOnly 
                                    />
                                    <p className="date"><time dateTime={entryData?.datetime}>{entryData?.date}</time></p>
                                </div>
                                <div className="written">
                                    <textarea className="current-entry" value={entryData?.fline || ''} readOnly />
                                    <button onClick={() => handlePageChange('CurrentWrite')}>Back to Current Entry</button>
                                </div>
                            </div>
                        )}

                        {displayContent === 'CurrentWrite' && (
                            <div>
                                <h2>Current Entry</h2>
                                <input 
                                    type="text" 
                                    placeholder="Enter Title..." 
                                    value={entryData.title} 
                                    onChange={(e) => setEntryData({ ...entryData, title: e.target.value })} 
                                />
                                <p className="date"><time dateTime={dateTime}>{dateReal}</time></p>
                                <textarea 
                                    className="current-entry" 
                                    rows="25" 
                                    placeholder="Enter your entry..." 
                                    value={entryData.fline} 
                                    onChange={(e) => setEntryData({ ...entryData, fline: e.target.value })} 
                                />
                                <button className="save" onClick={handleSave}>Save</button>
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
