import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';

function SummaryHeader() {
    return (
        <header>
            <div>
                <h1>Cherry Habit Tracker</h1>
                <h2>Welcome Quiz</h2>
            </div>
        </header>
    );
}

export function TreatmentQuiz() {
    return (
        <div>
            <SummaryHeader />
            <section className="treatmentinput">
                <h2>Input Your Treatment Tasks</h2>
                <p className="quizmessage">
                    Please list your daily tasks/goals and their frequencies below. To add more rows, 
                    copy and paste a row in the box.
                </p>
                <div className="d-flex justify-content-center">
                    <div className="grid">
                        <form action="" method="get" className="form-example">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Daily Task</th>
                                        <th>Frequency</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr contentEditable="true">
                                        <td>Task</td>
                                        <td>Frequency</td>
                                    </tr>
                                    <tr contentEditable="true">
                                        <td>Task</td>
                                        <td>Frequency</td>
                                    </tr>
                                    <tr contentEditable="true">
                                        <td>Task</td>
                                        <td>Frequency</td>
                                    </tr>
                                    <tr contentEditable="true">
                                        <td>Task</td>
                                        <td>Frequency</td>
                                    </tr>
                                    <tr contentEditable="true">
                                        <td>Task</td>
                                        <td>Frequency</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button type="submit" className="mybutton submit">Submit</button>
                        </form>
                    </div>
                </div>
            </section>
            <div class='bye'>
            <p>Don't worry if you have to make changes to your daily routine, you can always
make those edits later!
</p>
</div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TreatmentQuiz />);
