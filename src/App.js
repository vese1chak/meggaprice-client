// импорт компонента для навигации между страницами
import {BrowserRouter} from "react-router-dom";
// импорт компонента для роутинга
import AppRouter from "./components/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
