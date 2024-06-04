import React, { useState, useEffect } from 'react';
import './css/journal.css';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { ref, get, push } from 'firebase/database';
import { db } from './index';

function JournalHeader() {
    return (
        <header className="header">
            <div>
                <h1>Cherry Habit Tracker</h1>
                <h2 className="subheader">Journal</h2>
            </div>
        </header>
    );
}

function RenderEntries({filteredEntries , handleEntryClick}) {


    let displayEntries = filteredEntries.map((entry, index) => (
        <div key={index} className="entry" onClick={() => handleEntryClick(entry)}>
            <h3>{entry.title}</h3>
            <p className="date"><time dateTime={entry.datetime}>{entry.date}</time></p>
            <p className="first-line">{entry.content?.substring(0, 50)}</p>
            <p className="first-line-long">{entry.content?.substring(0, 100)}</p>
        </div>
    ))

    return displayEntries;
}

function JournalApp({ user }) {
    const [displayContent, setDisplayContent] = useState('CurrentWrite');
    const [entryData, setEntryData] = useState({ title: '', content: '' });
    const [writtenBefore, setWrittenBefore] = useState('');
    const [writtenAfter, setWrittenAfter] = useState('');
    const [journalData, setJournalData] = useState([]);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateTime = year + "-" + month + "-" + day;
    let dateReal = month + "-" + day + "-" + year;

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
            content: entryData.content,
            datetime: new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').join('-'),
            date: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).split('/').join('-')
        };
        const journalRef = ref(db, `users/${user.uid}/journal`);
        push(journalRef, newEntry)
            .then(() => {
                setJournalData((prevData) => [...prevData, newEntry]);
                setEntryData({ title: '', content: '' });
                setDisplayContent('CurrentWrite');
            })
            .catch((error) => {
                console.error('Error saving journal entry:', error);
            });
    };

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
                        <RenderEntries filteredEntries={filteredEntries} handleEntryClick={handleEntryClick} />
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
                                    <textarea className="current-entry" value={entryData?.content || ''} readOnly />
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
                                <p className="date"><time dateTime={dateTime}>{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).split('/').join('-')}</time></p>
                                <textarea
                                    className="current-entry"
                                    rows="25"
                                    placeholder="Enter your entry..."
                                    value={entryData.content}
                                    onChange={(e) => setEntryData({ ...entryData, content: e.target.value })}
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
