// assets
import { IconLogout } from '@tabler/icons';
import { Translation } from 'react-i18next';
// constant
const icons = { IconLogout };

const logout = {
    id: 'logout',
    title: '',
    type: 'group',
    children: [
        {
            id: 'logout',
            title: <Translation>{(t) => <>{t("menu.menu_exit")}</>}</Translation>,
            type: 'item',
            url: '/logout',
            icon: icons.IconLogout,
            breadcrumbs: true
        },
    ]
};

export default logout;
