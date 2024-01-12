import { lazy } from 'react';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from './../ui-component/Loadable';
// import { Navigate } from 'react-router-dom';

// routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Search = Loadable(lazy(() => import('views/search')));
const SearchList = Loadable(lazy(() => import('views/search/List')));
const SearchView = Loadable(lazy(() => import('views/search/view')));
const SearchFile = Loadable(lazy(() => import('views/search/File')));
const GoogleFrom = Loadable(lazy(() => import('views/search/GoogleFormClone')));
// const SearchResult    =  Loadable(lazy(() => import('views/search/SearchResult')));
const Balance = Loadable(lazy(() => import('views/balance')));


const Favorites = Loadable(lazy(() => import('views/favorites')));
const AddFile = Loadable(lazy(() => import('views/files/addFile')));
const WordFile = Loadable(lazy(() => import('views/files/wordFile')));
const Presentations = Loadable(lazy(() => import('views/files/presentations')));
const Statistics = Loadable(lazy(() => import('views/files/statistics')));
const Bought = Loadable(lazy(() => import('views/files/bought')));
const Notes = Loadable(lazy(() => import('views/notes')));
const NotesView = Loadable(lazy(() => import('views/notes/View')));
const NotesCreate = Loadable(lazy(() => import('views/notes/Create')));

const About = Loadable(lazy(() => import('views/about')));
const Chat = Loadable(lazy(() => import('views/chat')));
const ArchiveChats = Loadable(lazy(() => import('views/chat/ArchivedChats')));


const Logout = Loadable(lazy(() => import('views/logout')));


const MainRoutes = (isLoggedIn) => ({
    path: '/',
    // element: isLoggedIn ? <MainLayout /> :  <Navigate to="/login" />,
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Search />
        },
        {
            path: 'search',
            element: <Search />
        },
        {
            path: 'search/:language/:filter/:text',
            element: <SearchList />,

        },
        {
            path: 'search/details/:gId',
            element: <SearchView />
        },
        {
            path: 'search/file/:id',    
            element: <SearchFile />
        },
         
        {
            path: 'balance/list/:id',
            element: <Balance />
        },
      
        {
            path: 'favorites',
            element: <Favorites />
        },
       
        {
            path: 'files/add-file',
            element: <AddFile />
        },
        {
            path: 'files/word-file',
            element: <WordFile />
        },
        {
            path: 'files/presentations',
            element: <Presentations />
        },
        {
            path: 'files/statistics',
            element: <Statistics />
        },
        {
            path: 'files/bought',
            element: <Bought />
        },
        {
            path: 'notes',
            element: <Notes />
        },
        {
            path: 'notes/create',
            element: <NotesCreate />
        },
        {
            path: 'notes/:id',
            element: <NotesView />
        },
        {
            path: 'about',
            element: <About />
        },
        {
            path: '/chat',
            element: <Chat />
    
        },
        {
            path: '/chat/archive_chat',
            element: <ArchiveChats />

        },
        {
            path: '/search/googleForm',
            element: <GoogleFrom />

        },
        {
            path: 'logout',
            element: <Logout />
        },
      
    ]
});

export default MainRoutes;
