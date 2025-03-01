# 📰 News Aggregator  

A **React & Redux-powered** news aggregator that fetches and displays news from multiple sources. Users can filter news by **category, source, date, and author** for a customized reading experience.

## 🚀 Features  

✅ Fetches news from multiple sources using **Redux & Redux Toolkit**  
✅ Filters news by **category, source, and author**  
✅ Displays a **loading spinner** while fetching news  
✅ **Responsive UI** built with Tailwind CSS  
✅ Optimized state management with **Redux**  
✅ **Error handling** for failed API requests  

---

## ⚙️ Tech Stack  

- **Frontend**: React, Redux Toolkit, TypeScript  
- **UI**: Tailwind CSS, Radix Icons  
- **State Management**: Redux & Redux Toolkit  
- **API**: News API, The Guardian, NewYork Times

---

## 📦 Installation  

Clone the repository:  
```bash
git clone https://github.com/Siymiel/news-aggregator.git
cd news-aggregator
```

Install dependencies:  
```bash
yarn install
```

---

## 📰 API Configuration  

1. **Copy the `.env.example` file** and create a new environment file for development:  
   ```bash
   cp .env.example .env.development
   ```
2. **Open `.env.development` and fill in your values**:  
   ```
   VITE_NEWS_API_KEY=your_api_key_here
   VITE_APP_GUARDIAN_API_KEY=your_api_key_here
   VITE_NYT_API_KEY=your_api_key_here
   ```
3. Make sure your API key is valid and saved correctly before running the app.

---

## 🏃‍♂️ Running the App  

Start the development server:  
```bash
yarn dev
```

The app will be available at **http://localhost:5173**.

---

## 🔥 Usage  

1. Open the app and browse the latest news.  
2. Fill the **filter inputs** to customize your feed.  
3. Select your **preferred category, source, date, or author** and apply.  
4. Enjoy your personalized news feed!  

---

## 🚀 Future Improvements  

Here are some areas for improvement to enhance **performance, development experience, and user engagement**:

### ⚡ **Performance & Optimization**  
✅ **Improve API Calls Efficiency**:  
- Cache API responses to avoid redundant requests (e.g., use **RTK Query**, React Query, or a caching mechanism).  
- Debounce search/filter input to **reduce unnecessary re-fetching** of articles.  

✅ **Optimize Redux State**:  
- Normalize state structure to prevent redundant data storage.  
- Use **RTK Query** instead of manual async thunks for cleaner API calls.  

✅ **Optimize Rendering Performance**:  
- Implement **React.memo** and **useCallback** to prevent unnecessary re-renders.  
- Use **virtualized lists** (e.g., react-window) for better performance when displaying many articles.  

✅ **Lazy Loading & Code Splitting**:  
- Split code using **React.lazy** and **dynamic imports** for faster initial loads.  
- Implement **lazy image loading** for improved page performance.  

---

### 🛠 **Development & DX (Developer Experience)**  
✅ **Improve API Error Handling**:  
- Implement a **global error boundary** to catch unhandled errors.  
- Provide **more descriptive error messages** for API failures.  

✅ **Write More Tests**:  
- Add **unit tests** for Redux actions, reducers, and API calls using **Jest** & **React Testing Library**.  
- Implement **end-to-end (E2E) tests** using **Cypress** or Playwright.  

✅ **Enhance Type Safety**:  
- Improve TypeScript typings for API responses & Redux state.  
- Use **Zod or Yup** for strict data validation.  

✅ **Implement a CI/CD Pipeline**:  
- Automate testing & deployments using **GitHub Actions**.  
- Ensure new commits trigger **automatic linting, testing, and build checks**.  

---

## 🛠️ Troubleshooting  

**1. No news is loading?**  
- Check if your API key is valid.