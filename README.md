# 123bank

123bank is a simple banking application built with TypeScript. It allows users to register transactions and view transaction statements. The application stores all data in the browser's `localStorage` to ensure persistence across sessions.

## Features

- **Register Transactions:** Users can register different types of transactions such as Deposits, Transfers, and Bill Payments.
- **View Statements:** The application provides a detailed statement of transactions, including the date, type of transaction, and amount (formatted in BRL currency).
- **Persistent Storage:** All transactions and account balance are stored in the browser's `localStorage`, ensuring data persistence across sessions.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/gustavoguarda/123bank.git
   cd 123bank
2. **Install typescript:**

   ```sh
   npm install -g typescript
3. **Run:**

   ```sh
   tsc -w
3. **Your browser:**
    ``` 
    http://127.0.0.1:5500/dist/index.html