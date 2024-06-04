import React, { useState, useEffect } from 'react';
import './css/journal.css';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { ref, get, push, set, onValue } from 'firebase/database';
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

function JournalApp({ user }) {
    const [displayContent, setDisplayContent] = useState('CurrentWrite');
    const [entryData, setEntryData] = useState({ title: '', fline: '' });
    const [writtenBefore, setWrittenBefore] = useState('');
    const [writtenAfter, setWrittenAfter] = useState('');
    const [journalData, setJournalData] = useState([]);
    const [streakCount, setStreakCount] = useState(null);

    useEffect(() => {
        const journalRef = ref(db, `users/${user.uid}/journal`);
        const streakCountRef = ref(db, `users/${user.uid}/streakCount`);

        onValue(streakCountRef, (snapshot) => {
            const data = snapshot.val();
            setStreakCount(data ? data : 0);
        });

        get(journalRef)
            .then((snapshot) => {
                const journalEntries = snapshot.val() || [];
                const entriesArray = Object.keys(journalEntries).map(key => ({
                    ...journalEntries[key],
                    id: key,
                    fline: journalEntries[key].content || '',
                }));
                setJournalData(entriesArray);
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
        const streakCountRef = ref(db, `users/${user.uid}/streakCount`);
        push(journalRef, newEntry)
            .then(() => {
                setJournalData((prevData) => [...prevData, newEntry]);
                setEntryData({ title: '', fline: '' });
                setDisplayContent('CurrentWrite');
                const lastEntry = journalData[journalData.length - 1];
                if (journalData.length === 0) {
                    // First journal entry
                    setStreakCount(1);
                    set(streakCountRef, 1);
                } else {
                    const lastDate = new Date(lastEntry.datetime).toLocaleDateString();
                    const currentDate = new Date().toLocaleDateString();

                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayDate = yesterday.toLocaleDateString();

                    if (lastDate === yesterdayDate) {
                        const newStreak = streakCount + 1;
                        setStreakCount(newStreak);
                        set(streakCountRef, newStreak);
                    } else if (lastDate !== currentDate) {
                        setStreakCount(1);
                        set(streakCountRef, 1);
                    }
                }
            })
            .catch((error) => {
                console.error('Error saving journal entry:', error);
            });
    };

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dateTime = `${year}-${month}-${day}`;
    let dateReal = `${month}-${day}-${year}`;

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
                                        aria-label="Enter date here"
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
                                <p className="first-line">{entry.fline.substring(0, 50) + "..."}</p>
                                <p className="first-line-long">{entry.fline.substring(0, 100) + "..."}</p>
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
                                    aria-label="Enter Journal Entry Title here"
                                />
                                <p className="date"><time dateTime={dateTime}>{dateReal}</time></p>
                                <textarea
                                    className="current-entry"
                                    rows="25"
                                    placeholder="Enter your entry..."
                                    value={entryData.fline}
                                    onChange={(e) => setEntryData({ ...entryData, fline: e.target.value })}
                                    aria-label="Enter your Journal Entry"
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