import { lazy, Suspense } from 'react';
import ProtectedRoute from "../components/protectedRoute";
import { CircularProgress, Box } from '@mui/material';

// Lazy loaded form components
const Aamod = lazy(() => import('../components/forms/aamod.jsx'));
const Hackathon = lazy(() => import('../components/forms/hackathon.jsx'));
const Workshop = lazy(() => import('../components/forms/workshop.jsx'));
const IndustrialVisit = lazy(() => import('../components/forms/industrialVisit.jsx'));
const BootCamp = lazy(() => import('../components/forms/bootcamp.jsx'));
const Patent = lazy(() => import('../components/forms/patent.jsx'));
const Convocation = lazy(() => import('../components/forms/convocation.jsx'));
const AlumniMeet = lazy(() => import('../components/forms/alumini.jsx'));
const DayCelebration = lazy(() => import('../components/forms/dayCelebration.jsx'));
const Scholarship = lazy(() => import('../components/forms/scholorship.jsx'));
const ResearchPaper = lazy(() => import('../components/forms/researchPaper.jsx'));
const TyroOathCeremony = lazy(() => import('../components/forms/tyroOathCeremony.jsx'));
const Zest = lazy(() => import('../components/forms/zest.jsx'));
const Techvyom = lazy(() => import('../components/forms/techvyom.jsx'));
const Conference = lazy(() => import('../components/forms/conference.jsx'));
const Seminar = lazy(() => import('../components/forms/seminar.jsx'));
const Mou = lazy(() => import('../components/forms/mou.jsx'));
const Exam = lazy(() => import("../components/forms/exam.jsx"))

// Loading fallback component
const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
    </Box>
);

export const routes = [
    {
        path: '/:activity_name/add/aamod',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Aamod />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/hackathon',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Hackathon />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/workshop',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Workshop />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/industrial_visit',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <IndustrialVisit />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/bootcamp',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <BootCamp />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/patent',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Patent />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/convocation',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Convocation />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/alumini_meet',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <AlumniMeet />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/day_celebration',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <DayCelebration />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/scholarship',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Scholarship />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/research_paper',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <ResearchPaper />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/oath_ceremony',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <TyroOathCeremony />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/zest',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Zest />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/techvyom',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Techvyom />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/conference',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Conference />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/seminar',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Seminar />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/mou',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Mou />
                </Suspense>
            </ProtectedRoute>
        )
    },
    {
        path: '/:activity_name/add/important_exam',
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingFallback />}>
                    <Exam />
                </Suspense>
            </ProtectedRoute>
        )
    }
]