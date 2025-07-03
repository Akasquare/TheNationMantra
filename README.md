# TheNationMantra 📰

A modern and dynamic **news application** built with **Node.js**, **Express**, **MongoDB**, and **EJS**.

---

## 🚀 Features

- **Fetch & display** latest news articles
- **CRUD operations** for managing news content
- Modular, RESTful architecture
- **Cloud-based image support** via cloudconfig
- **Responsive UI** with Bootstrap/EJS views

---

## 🗂️ Project Structure

TheNationMantra/
├── models/ # Mongoose schemas (e.g., Article, User)
├── routes/ # Express route handlers
├── views/ # EJS templates (index, detail, form pages)
├── public/ # Static assets (CSS, JS, images)
├── utils/ # Helper functions & middleware
├── middleware/ # Authentication or request preprocessing
├── cloudconfig.js # Cloudinary or S3 image config
├── server.js # Entry point – app setup and server launch
├── package.json # Dependencies and scripts
└── .gitignore


---

⚙️ Setup & Installation

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Akasquare/TheNationMantra.git
   cd TheNationMantra
2. Install dependencies
   ```base
   npm install

   ```
3. Configure environment variables
Add a .env file with:
```base
MONGO_URI=your_mongodb_connection_string
PORT=3000
CLOUDINARY_URL=your_cloudinary_connection_string

```
4. Start the app
   ```base
   npm start

   ```
Visit```base http://localhost:3000 ```in your browser.

📋 Core Routes

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| GET    | `/`                  | Home – list all news articles    |
| GET    | `/articles/new`      | Form to submit a new article     |
| POST   | `/articles`          | Create a new article             |
| GET    | `/articles/:id`      | View a specific article          |
| GET    | `/articles/:id/edit` | Form to edit an existing article |
| PUT    | `/articles/:id`      | Update an article                |
| DELETE | `/articles/:id`      | Remove an article                |
🧱 Technologies Used
Node.js + Express – Web server & routing

MongoDB + Mongoose – Data modeling and storage

EJS – Server-side templating

Bootstrap – Responsive frontend design

Cloudinary (via cloudconfig.js) – Image hosting support

✅ Future Enhancements
User authentication & role-based access

Pagination & search filters for articles

User comments & ratings

Automated tests (Jest / Mocha)

CI/CD integrations

📄 License
Distributed under the MIT License. See LICENSE for details.

🙋‍♂️ Author
Akash Kushwaha 
