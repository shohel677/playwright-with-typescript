#  DemoQA Playwright Typescript Automation Framework

This is a test automation framework built with **Playwright**, **Mocha**, **TypeScript**, and **Page Object Model (POM)** design. It supports both **UI** and **API** testing for the DemoQA site: https://demoqa.com

---

## 📦 Tech Stack

- ✅ [Playwright](https://playwright.dev) – UI automation
- ✅ [Mocha](https://mochajs.org) – Test runner
- ✅ [Chai](https://www.chaijs.com/) – Assertions
- ✅ [Axios](https://axios-http.com/) – API testing
- ✅ [Mochawesome](https://www.npmjs.com/package/mochawesome) – HTML reporting
- ✅ [TypeScript](https://www.typescriptlang.org/) – Strong typing
- ✅ [ts-node](https://typestrong.org/ts-node/) – Run TypeScript directly

---

## 📁 Project Structure

cover_go/

├── pages/ # Page Object Model classes for UI/API

├── tests/ # Test files (.test.ts)

├── mocha-report/ # HTML reports (after test run)

├── tsconfig.json # TypeScript compiler config

├── package.json # Project scripts and dependencies

└── README.md # Project documentation


---

## 🛠️ Prerequisites

- Node.js (>= 16)
- npm (comes with Node.js)

---

## ⚙️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/shohel677/playwright-with-typescript.git
cd repo
Install dependencies

npm install

Run all testcases
npm test -- --browser=chromium --headless=false --url=https://demoqa.com

Run UI testcases
npm test -- --browser=chromium --headless=false --url=https://demoqa.com --grep '\[testcase_ui\]'

Run only api testcases
npm test -- --browser=chromium --headless=false --url=https://demoqa.com --grep '\[testcase_api\]'

You can pass --browser, --headless, and --url as CLI args.

API Test
API test examples are inside tests/demo_qa_api.test.ts, and use Axios.

UI Test
UI test examples are inside tests/demo_qa.test.ts

Test Reports
After running tests, a beautiful HTML report is generated in:
mocha-report/report.html

Test Scenarios
UI:
Add, update, and delete rows from the Web Tables.

Submit form data and verify input.

API:
Create user account

Generate token

Get books list

Add/delete books for user

Questions?
Feel free to open an issue or reach out.