
const apps = [
    { name: "AI Health Assistant", path: "01-ai-health-assistant/index.html" },
    { name: "Movie Discovery Hub", path: "01_Movie_Discovery_Hub/index.html" },
    { name: "Health Analytics Dashboard", path: "02-health-analytics-dashboard/index.html" },
    { name: "Music Festival Concert UI", path: "02_Music_Festival_Concert_UI/index.html" },
    { name: "Doctor Telehealth", path: "03-doctor-telehealth/index.html" },
    { name: "Gamer Arena Dashboard", path: "03_Gamer_Arena_Dashboard/index.html" },
    { name: "AI Health Risk Dashboard", path: "04-ai-health-risk-dashboard/index.html" },
    { name: "OTT Watchlist Dashboard", path: "04_OTT_Watchlist_Dashboard/index.html" },
    { name: "Agent Task Queue", path: "agent-task-queue/index.html" },
    { name: "Agent Workflow Builder", path: "agent-workflow-builder/index.html" },
    { name: "AI Agent Builder", path: "ai-agent-builder/index.html" },
    { name: "AI Agent Dashboard", path: "ai-agent-dashboard/index.html" },

    { name: "AI Chat", path: "allapps/01-ai-chat/index.html" },
    { name: "AI Prompt Interface", path: "allapps/02-ai-prompt-interface/index.html" },
    { name: "AI Summary Card", path: "allapps/03-ai-summary-card/index.html" },
    { name: "AI Insight Card", path: "allapps/04-ai-insight-card/index.html" },

    { name: "Student Dashboard", path: "education_ui_templates_fixed/01_student_dashboard/index.html" },
    { name: "Teacher Classroom", path: "education_ui_templates_fixed/02_teacher_classroom/index.html" },
    { name: "AI Tutor", path: "education_ui_templates_fixed/03_ai_tutor/index.html" },
    { name: "Agent Learning Analytics", path: "education_ui_templates_fixed/04_agent_learning_analytics/index.html" },

    { name: "Personal Finance Dashboard", path: "finance_ui_templates/01_personal_finance_dashboard/index.html" },
    { name: "Expense Tracker", path: "finance_ui_templates/02_expense_tracker/index.html" },
    { name: "Investment Portfolio", path: "finance_ui_templates/03_investment_portfolio/index.html" },
    { name: "Fintech Loan Calculator", path: "finance_ui_templates/04_fintech_loan_calculator/index.html" }
];

const appsContainer = document.getElementById("appsContainer");
const searchInput = document.getElementById("searchInput");
const homePage = document.getElementById("homePage");
const appPage = document.getElementById("appPage");
const appFrame = document.getElementById("appFrame");
const currentAppTitle = document.getElementById("currentAppTitle");
const backButton = document.getElementById("backButton");
const newTabButton = document.getElementById("newTabButton");

function renderApps(searchText = "") {
    appsContainer.replaceChildren();

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredApps.length === 0) {
        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "No applications found.";
        appsContainer.appendChild(message);
        return;
    }

    filteredApps.forEach(app => {
        const card = document.createElement("article");
        card.className = "app-card";

        const title = document.createElement("h3");
        title.textContent = app.name;

        const description = document.createElement("p");
        description.textContent = "Open " + app.name;

        const launchButton = document.createElement("button");
        launchButton.textContent = "Launch App";
        launchButton.addEventListener("click", () => openApp(app));

        card.append(title, description, launchButton);
        appsContainer.appendChild(card);
    });
}

function openApp(app) {
    currentAppTitle.textContent = app.name;
    appFrame.src = app.path;
    newTabButton.href = app.path;

    homePage.hidden = true;
    appPage.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function showHome() {
    appFrame.src = "about:blank";
    appPage.hidden = true;
    homePage.hidden = false;

    window.scrollTo({ top: 0, behavior: "smooth" });
}

searchInput.addEventListener("input", event => {
    renderApps(event.target.value);
});

backButton.addEventListener("click", showHome);

renderApps();
