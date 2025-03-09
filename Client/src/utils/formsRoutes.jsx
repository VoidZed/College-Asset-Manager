import ProtectedRoute from "../components/protectedRoute"
import Aamod from '../components/forms/aamod.jsx';
import Hackathon from '../components/forms/hackathon.jsx';
import Workshop from '../components/forms/workshop.jsx'
import IndustrialVisit from '../components/forms/industrialVisit.jsx';
import BootCamp from '../components/forms/bootcamp.jsx';
import Patent from '../components/forms/patent.jsx';
import Convocation from '../components/forms/convocation.jsx';
import AlumniMeet from '../components/forms/alumini.jsx';
import DayCelebration from '../components/forms/dayCelebration.jsx';
import Scholarship from '../components/forms/scholorship.jsx';
import ResearchPaper from '../components/forms/researchPaper.jsx';
import TyroOathCeremony from '../components/forms/tyroOathCeremony.jsx';
import Zest from '../components/forms/zest.jsx';
import Techvyom from '../components/forms/techvyom.jsx';

export const routes = [

    {
        path: '/:activity_name/add/aamod',
        element: (
            <ProtectedRoute>
                <Aamod />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/hackathon',
        element: (
            <ProtectedRoute>
                <Hackathon />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/workshop',
        element: (
            <ProtectedRoute>
                <Workshop />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/industrial_visit',
        element: (
            <ProtectedRoute>
                <IndustrialVisit />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/bootcamp',
        element: (
            <ProtectedRoute>
                <BootCamp />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/patent',
        element: (
            <ProtectedRoute>
                <Patent />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/convocation',
        element: (
            <ProtectedRoute>
                <Convocation />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/alumini_meet',
        element: (
            <ProtectedRoute>
                <AlumniMeet />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/day_celebration',
        element: (
            <ProtectedRoute>
                <DayCelebration />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/scholarship',
        element: (
            <ProtectedRoute>
                <Scholarship />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/research_paper',
        element: (
            <ProtectedRoute>
                <ResearchPaper />
            </ProtectedRoute>
        )
    }
    ,
    {
        path: '/:activity_name/add/oath_ceremony',
        element: (
            <ProtectedRoute>
                <TyroOathCeremony />
            </ProtectedRoute>
        )
    }
    , {
        path: '/:activity_name/add/zest',
        element: (
            <ProtectedRoute>
                <Zest />
            </ProtectedRoute>
        )
    }

    , {
        path: '/:activity_name/add/techvyom',
        element: (
            <ProtectedRoute>
                <Techvyom />
            </ProtectedRoute>
        )
    }]


