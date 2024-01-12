// assets
import { IconNotes } from '@tabler/icons';
import { Translation } from 'react-i18next';
// constant
const icons = { IconNotes };

const note = {
    id: 'note',
    title: '',
    type: 'group',
    children: [
        {
            id: 'note',
            title:<Translation>{(t) => <>{t("menu.sub_menu_notes")}</>}</Translation>,
            type: 'item',
            url: "/notes",
            icon: icons.IconNotes,
            breadcrumbs: true
        },
    ]
};

export default note;