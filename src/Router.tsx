import { GoormLoader } from '@goorm-dev/gds-components';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SignUp from './pages/updatePW/UpdatePW';

const About = lazy(() => import('./pages/about/About'));
const Project = lazy(() => import('./pages/project/Project'));
const Recruit = lazy(() => import('./pages/recruit/Recruit'));
const NotFound = lazy(() => import('./pages/errors/NotFound'));
const SearchUniv = lazy(() => import('./pages/searchUniv/SearchUniv'));
const Information = lazy(() => import('./pages/information/Information'));
const MyPage = lazy(() => import('./pages/myPage/MyPage'));
const UpdatePW = lazy(() => import('./pages/updatePW/UpdatePW'));

const loaderProps = {
  color: 'black',
  lottieProps: {
    loop: true,
  },
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<GoormLoader {...loaderProps} />}>
        <Layout />,
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <About />
          </Suspense>
        ),
      },
      {
        path: 'search-univ',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <SearchUniv />
          </Suspense>
        ),
      },
      {
        path: 'project',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <Project />
          </Suspense>
        ),
      },
      {
        path: 'recruit',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <Recruit />
          </Suspense>
        ),
      },
      {
        path: 'login',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <SignUp />
          </Suspense>
        ),
      },
      {
        path: 'information',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <Information />
          </Suspense>
        ),
      },
      {
        path: 'my-page',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: 'update-password',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <UpdatePW />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<GoormLoader {...loaderProps} />}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
