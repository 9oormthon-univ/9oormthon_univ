// Router.tsx
import { GoormLoader, GoormLoaderProps } from '@goorm-dev/gds-components';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';

// 레이지 로딩 적용
const About = lazy(() => import('./pages/about/About'));
const Project = lazy(() => import('./pages/project/Project'));
const Recruit = lazy(() => import('./pages/recruit/Recruit'));
const Apply = lazy(() => import('./pages/apply/Apply'));
const NotFound = lazy(() => import('./pages/errors/NotFound'));

// GoormLoader 컴포넌트에 전달할 props 설정
const loaderProps: GoormLoaderProps = {
  color: 'black', // 예시 색상
  lottieProps: {
    loop: true,
  },
};

// 라우터 생성
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout 컴포넌트를 사용
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
        path: 'apply',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <Apply />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
