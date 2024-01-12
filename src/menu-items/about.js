
import { Translation } from 'react-i18next';
import { GiHummingbird } from "react-icons/gi";
// constant
const icons = { GiHummingbird };

const about = {
    id: 'about',
    title: '',
    type: 'group',
    children: [
        {
            id: 'about',
            title: <Translation>{(t) => <>{t("menu.menu_board")}</>}</Translation>,
            type: 'item',
            url: '/about',
            icon: icons.GiHummingbird,
            breadcrumbs: true
        },
    ]
};

export default about;
