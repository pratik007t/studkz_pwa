// assets
import { IconDashboard, IconSearch } from '@tabler/icons';
import { Translation } from 'react-i18next';
// constant

const icons = { IconDashboard, IconSearch };

const search = {
    id: 'search',
    title: '',
    type: 'group',
    children: [
        {
            id: 'search',
            title: <Translation>{(t) => <>{t("menu.menu_search")}</>}</Translation>,
            type: 'item',
            url: '/search',
            icon: icons.IconSearch,
            breadcrumbs: true
        },
    ]
};

export default search;
