import { lazy } from 'react';
import Loadable from './../ui-component/Loadable';
import ChatLayout from './../layout/ChatLayout';


const Conversation = Loadable(lazy(() => import('views/chat/Conversation')));



const ChatRoutes = (isLoggedIn) => ({
    path: '/',
    element: <ChatLayout/>,
    children: [
       
        {
            path: '/chat/conversation/:id',
            element: <Conversation />
            // element: <Chat />

        },
        
       
    ]
});

export default ChatRoutes;
