// assets
import { IconBookmark } from '@tabler/icons';
import { Translation } from 'react-i18next';
// constant
const icons = { IconBookmark };

const favorites = {
    id: 'favorites',
    title: '',
    type: 'group',
    children: [
        {
            id: 'favorites',
            title: <Translation>{(t) => <>{t("menu.menu_favorite")}</>}</Translation>,
            type: 'item',
            url: '/favorites',
            icon: icons.IconBookmark,
            breadcrumbs: true
        },
    ]
};

export default favorites;
