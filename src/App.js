import "./App.css";
import { Routes, Route } from "react-router";
import BlankPage from "./components/errorpages/BlankPage";
import { BrowserRouter } from "react-router-dom";
import CalendarPage from "./components/pages/CalendarPage";
import CalendarPageMana from "./components/pages/CalendarPageMana";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <header className="App-header"></header>
                <Routes>
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route
                        path="/calendarMana"
                        element={<CalendarPageMana />}
                    />
                    <Route path="*" element={<BlankPage />} />
                </Routes>
                <footer className="App-footer">©Nougat0</footer>
            </BrowserRouter>
        </div>
    );
}

export default App;
