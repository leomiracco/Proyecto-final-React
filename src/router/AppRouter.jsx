import { Navigate, Route, Routes } from "react-router-dom";

import { HomeLoginPage, HomeLogoutPage, LoginPage, RegisterPage, MoviePage, SeriesPage, SearchPage, SeriesDetailPage, SearchMoviePage, SearchByYearPage, PaymentPage } from "../app/pages";
import { NavBar } from "../ui/components/navBar/NavBar";
// import { SpinnerAuth } from "../ui/components/spinnerAuth";
import { useCheckAuth } from "../hooks";
import { CheckingAuth } from "../ui/components/checkingAuth/CheckingAuth";
import { SearchDetailsByYearPage } from "../app/pages/searchDetailsByYearPage/SearchDetailsByYearPage";

export const AppRouter = ()=>{

  const {status, isLogin} = useCheckAuth();

  return (
    <>
      <NavBar />

        {/* {(status === 'checking') && <SpinnerAuth />} */}

        {(status === 'checking') && <CheckingAuth />}

      <Routes>

        {(!isLogin)
          ? <Route path="/public" element={ <HomeLogoutPage /> } />
          : <Route path="/home" element={ <HomeLoginPage /> } />
        }

        {(isLogin)
          && <Route path="/home/movie" element={ <MoviePage /> } />
        }

        {(isLogin)
          && <Route path="/home/serie" element={ <SeriesDetailPage /> } />
        }

        {(isLogin)
          && <Route path="/home/series" element={ <SeriesPage /> } />
        }

        {(isLogin)
          && <Route path="/home/search" element={ <SearchPage /> } />
        }

        {(isLogin)
          && <Route path="/home/search/movie" element={ <SearchMoviePage /> } />
        }

        {(isLogin)
          && <Route path="/home/search/byYear" element={ <SearchByYearPage /> } />
        }

        {(isLogin)
          && <Route path="/home/payment" element={ <PaymentPage /> } />
        }

        {(isLogin)
          && <Route path="/home/search/detailsByYear" element={ <SearchDetailsByYearPage /> } />
        }

        {(!isLogin) && <Route path="/public/login" element={ <LoginPage /> } />}

        {(!isLogin) && <Route path="/public/register" element={ <RegisterPage /> } />}

        {(!isLogin)
          ? <Route path="/*" element={ <Navigate to={"/public"} /> } />
          : <Route path="/*" element={ <Navigate to={"/home"} /> } />
        }

      </Routes>
    </>
  );
};