import { GoormLoader } from '@goorm-dev/gds-components';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';

const About = lazy(() => import('./pages/about/About'));
const Project = lazy(() => import('./pages/project/Project'));
const Recruit = lazy(() => import('./pages/recruit/Recruit'));
const NotFound = lazy(() => import('./pages/errors/NotFound'));
const SearchUniv = lazy(() => import('./pages/searchUniv/SearchUniv'));
const Information = lazy(() => import('./pages/information/Information'));
const MyPage = lazy(() => import('./pages/myPage/MyPage'));
const MyPageEdit = lazy(() => import('./pages/myPage/MyPageEdit'));
const UpdatePW = lazy(() => import('./pages/updatePW/UpdatePW'));
const SignUp = lazy(() => import('./pages/signUp/SignUp'));
const IdeaList = lazy(() => import('./pages/hackathon/IdeaList/IdeaList'));
const TeamPreferenceStep1 = lazy(() => import('./pages/hackathon/IdeaCreate/TeamPreferenceStep1'));
const TeamPreferenceStep2 = lazy(() => import('./pages/hackathon/IdeaCreate/TeamPreferenceStep2'));
const IdeaDetail = lazy(() => import('./pages/hackathon/IdeaDetail/IdeaDetail'));
const MyIdeaDetail = lazy(() => import('./pages/hackathon/IdeaDetail/IdeaDetail'));
const IdeaApply = lazy(() => import('./pages/hackathon/IdeaApply/IdeaApply'));
const TeamBuildProvider = lazy(() => import('./pages/hackathon/teamBuilding/provider/ProviderPage'));
const TeamBuildApplicant = lazy(() => import('./pages/hackathon/teamBuilding/applicant/ApplicantPage'));

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
        <Layout />
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
        path: 'my-page/edit',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <MyPageEdit />
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
        path: 'notFound',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: 'team/provider',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'USER']} />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamBuildProvider />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'team/applicant',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'USER']} />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamBuildApplicant />
              </Suspense>
            ),
          },
        ],
      },

      {
        path: 'hackathon',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'USER']} />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <IdeaList />
              </Suspense>
            ),
          },
          {
            path: 'create/step1',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamPreferenceStep1 />
              </Suspense>
            ),
          },
          {
            path: 'create/step2',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamPreferenceStep2 />
              </Suspense>
            ),
          },
          // 내 아이디어
          {
            path: 'detail/myIdea',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <MyIdeaDetail />
              </Suspense>
            ),
          },
          // 타인 아이디어
          {
            path: 'detail/:idea_id',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <IdeaDetail />
              </Suspense>
            ),
          },
          // 아이디어 지원
          {
            path: 'apply/:idea_id',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <IdeaApply />
              </Suspense>
            ),
          },
        ],
      }, // 해커톤
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
