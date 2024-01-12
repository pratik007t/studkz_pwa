// assets
import { Translation } from 'react-i18next';
import { CiCoinInsert } from "react-icons/ci";
// constant
const icons = { CiCoinInsert };

const balance = {
    id: 'balance',
    title: '',
    type: 'group',
    children: [
        {
            id: 'balance',
            title:<Translation>{(t) => <>{t("menu.menu_balance")}</>}</Translation>,
            type: 'item',
            url: '/balance/list/0',
            icon: icons.CiCoinInsert,
            breadcrumbs: true
        },
    
    ]
};

export default balance;
