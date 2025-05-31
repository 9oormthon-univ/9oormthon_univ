import { GoormLoader } from '@goorm-dev/gds-components';
import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminLayout from './components/layout/admin/AdminLayout';

const About = lazy(() => import('./pages/about/About'));
const Project = lazy(() => import('./pages/project/Project'));
const Recruit = lazy(() => import('./pages/recruit/Recruit'));
const NotFound = lazy(() => import('./pages/errors/NotFound'));
const SearchUniv = lazy(() => import('./pages/searchUniv/SearchUniv'));
const MyPage = lazy(() => import('./pages/myPage/MyPage'));
const UserPage = lazy(() => import('./pages/myPage/MyPage'));
const MyPageEdit = lazy(() => import('./pages/myPage/MyPageEdit'));
const UpdatePW = lazy(() => import('./pages/updatePW/UpdatePW'));
const SignUp = lazy(() => import('./pages/signUp/SignUp'));
const IdeaList = lazy(() => import('./pages/hackathon/IdeaList/IdeaList'));
const IdeaDetail = lazy(() => import('./pages/hackathon/IdeaDetail/IdeaDetail'));
const MyIdeaDetail = lazy(() => import('./pages/hackathon/IdeaDetail/IdeaDetail'));
const IdeaApply = lazy(() => import('./pages/hackathon/IdeaApply/IdeaApply'));
const TeamBuildProvider = lazy(() => import('./pages/hackathon/teamBuilding/provider/ProviderPage'));
const TeamBuildApplicant = lazy(() => import('./pages/hackathon/teamBuilding/applicant/ApplicantPage'));
const ApplicantTeamPage = lazy(() => import('./pages/hackathon/teamBuilding/applicant/ApplicantTeamPage'));
const TeamPreferenceForm = lazy(() => import('./pages/hackathon/IdeaCreateEdit/TeamPreferenceForm'));
const ParticipantList = lazy(() => import('./pages/admin/participantList/ParticipantList'));
const TeamList = lazy(() => import('./pages/admin/teamListAdmin/TeamList'));
const TeamManagement = lazy(() => import('./pages/admin/teamManagement/TeamManagement'));
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
        path: 'my-page',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: 'user/:user_id',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <UserPage />
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
        path: 'team',
        element: <ProtectedRoute allowedRoles={['ADMIN', 'USER']} />,
        children: [
          {
            path: 'provider',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamBuildProvider />
              </Suspense>
            ),
          },
          {
            path: 'applicant',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamBuildApplicant />
              </Suspense>
            ),
          },
          {
            path: 'detail',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <ApplicantTeamPage />
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
                <TeamPreferenceForm isEditMode={false} step={1} />
              </Suspense>
            ),
          },
          {
            path: 'create/step2',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamPreferenceForm isEditMode={false} step={2} />
              </Suspense>
            ),
          },
          {
            path: 'edit/:idea_id/step1',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamPreferenceForm isEditMode={true} step={1} />
              </Suspense>
            ),
          },
          {
            path: 'edit/:idea_id/step2',
            element: (
              <Suspense fallback={<GoormLoader {...loaderProps} />}>
                <TeamPreferenceForm isEditMode={true} step={2} />
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
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <ParticipantList />
          </Suspense>
        ),
      },
      {
        path: 'teamList',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <TeamList />
          </Suspense>
        ),
      },
      {
        path: 'teamList/:team_id',
        element: (
          <Suspense fallback={<GoormLoader {...loaderProps} />}>
            <TeamManagement />
          </Suspense>
        ),
      },
    ],
  }, // 어드민
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
