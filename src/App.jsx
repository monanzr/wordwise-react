import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// before lazy loading

// dist/assets/index-a07efbd4.css    60.01 kB │ gzip:  11.73 kB
// dist/assets/index-bad4b30b.js    524.36 kB │ gzip: 148.59 kB


// after lazy loading

// dist/assets/Product.module-8d683417.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-9b73c405.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-66c462b3.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-9b870334.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-16fbd814.js           0.65 kB │ gzip:   0.42 kB
// dist/assets/Homepage-54bfdf8c.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-ccb108ee.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-ee09c06f.js             1.01 kB │ gzip:   0.53 kB
// dist/assets/AppLayout-97c9fc24.js       156.91 kB │ gzip:  46.13 kB
// dist/assets/index-04051f2d.js           365.85 kB │ gzip: 101.98 kB



function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route index element={<Homepage />}></Route>
            <Route path="product" element={<Product />}></Route>
            <Route path="pricing" element={<Pricing />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
