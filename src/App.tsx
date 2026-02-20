import { BrowserRouter } from "react-router-dom";
import Theme from "@/components/template/Theme";
import Layout from "@/components/layouts";
import { AuthProvider } from "@/auth";
import Views from "@/views";
import appConfig from "./configs/app.config";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Theme>
          <BrowserRouter>
            <AuthProvider>
              <Layout>
                <Views />
              </Layout>
            </AuthProvider>
          </BrowserRouter>
        </Theme>
      </PersistGate>
    </Provider>
  );
}

export default App;
