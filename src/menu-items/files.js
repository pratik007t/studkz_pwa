// assets
import { IconFileHorizontal, IconCloudUpload, IconBrandWordpress, IconPresentation, IconSettingsAutomation, IconPresentationAnalytics, IconFileDownload,IconNotes} from '@tabler/icons';
import { Translation } from 'react-i18next';
// constant
const icons = { IconFileHorizontal, IconCloudUpload, IconBrandWordpress, IconSettingsAutomation, IconPresentation, IconPresentationAnalytics, IconFileDownload,IconNotes };

// ==============================|| Settings MENU ITEMS ||============================== //

const files = {
  id: "file",
  title: "",
  type: "group",
  children: [
    {
      id: "fileList",
      title: <Translation>{(t) => <>{t("menu.menu_files")}</>}</Translation>,
      type: "collapse",
      icon: icons.IconFileHorizontal,

      children: [
        {
          id: "add-file",
          title: <Translation>{(t) => <>{t("menu.sub_menu_add")}</>}</Translation>,
          type: "item",
          url: "/files/add-file",
          icon: icons.IconCloudUpload,
          breadcrumbs: true,
        },
        {
          id: "word-file",
          title:<Translation>{(t) => <>{t("menu.sub_word")}</>}</Translation>,
          type: "item",
          url: "/files/word-file",
          icon: icons.IconBrandWordpress,
          breadcrumbs: true,
        },

        {
          id: "presentations",
          title: <Translation>{(t) => <>{t("menu.sub_presentation")}</>}</Translation>,
          type: "item",
          url: "/files/presentations",
          icon: icons.IconPresentationAnalytics,
          breadcrumbs: true,
        },
        {
          id: "statistics",
          title:<Translation>{(t) => <>{t("menu.sub_statistics")}</>}</Translation>,
          type: "item",
          url: "/files/statistics",
          icon: icons.IconPresentation,
          breadcrumbs: true,
        },
        {
          id: "bought",
          title:<Translation>{(t) => <>{t("menu.sub_menu_bought")}</>}</Translation>,
          type: "item",
          url: "/files/bought",
          icon: icons.IconFileDownload,
          breadcrumbs: true,
        },
        // {
        //   id: "notes",
        //   title:<Translation>{(t) => <>{t("menu.sub_menu_notes")}</>}</Translation>,
        //   type: "item",
        //   url: "/files/notes",
        //   icon: icons.IconNotes,
        //   breadcrumbs: true,
        // },
      ],
    },
  ],
};

export default files;
