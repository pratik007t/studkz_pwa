import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

// project imports
import NavItem from "../NavItem";

// assets
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IconChevronDown, IconChevronUp } from "@tabler/icons";

// ==============================|| SIDEBAR MENU LIST COLLAPSE ITEMS ||============================== //

const NavCollapse = ({ menu, level }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClick = () => {
    setOpen(!open);
    setSelected(!selected ? menu.id : null);
  };

  // menu collapse & item
  const menus = menu.children?.map((item) => {
    switch (item.type) {
      case "collapse":
        return <NavCollapse key={item.id} menu={item} level={level + 1} />;
      case "item":
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  const Icon = menu.icon;
  const menuIcon = menu.icon ? (
    <Icon
      strokeWidth={1.5}
      //  size="1.3rem"
      size="20.8px"
      style={{ color: "#FFF", marginTop: "auto", marginBottom: "auto" }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: selected === menu.id ? 1 : 6,
        height: selected === menu.id ? 1 : 6,
      }}
      fontSize={level > 0 ? "inherit" : "medium"}
    />
  );

  return (
    <>
      <ListItemButton
        sx={{
          borderRadius: `${customization.borderRadius}px`,
          mb: 0.5,
          alignItems: "flex-start",
          backgroundColor: level > 1 ? "transparent !important" : "inherit",
          py: level > 1 ? 1 : 1.25,

          pl: `${level * 24}px`,
        }}
        selected={selected === menu.id}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{ color: "#FFF", my: "auto", minWidth: !menu.icon ? 18 : 36 }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={selected === menu.id ? "h5" : "body1"}
              color="inherit"
              sx={{ color: "#FFF", my: "auto" }}
            >
              {menu.title}
            </Typography>
          }
          secondary={
            menu.caption && (
              <Typography
                variant="caption"
                sx={{ ...theme.typography.subMenuCaption }}
                display="block"
                gutterBottom
              >
                {menu.caption}
              </Typography>
            )
          }
        />
        {open ? (
          <IconChevronUp
            stroke={1.5}
            // size="1rem"
            size="16px"
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />
        ) : (
          <IconChevronDown
            stroke={1.5}
            // size="1rem"
            size="16px"
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            position: "relative",
            "&:after": {
              content: "''",
              position: "absolute",
              left: "20px",
              top: -10,
              height: "100%",
              width: "1px",
              opacity: 1,
              background: theme.palette.primary.light,
            },
          }}
        >
          <ListItemText style={{ margin: "-9px", marginTop: "10px" }}>
            {menus}
          </ListItemText>
        </List>
      </Collapse>
    </>
  );
};

NavCollapse.propTypes = {
  menu: PropTypes.object,
  level: PropTypes.number,
};

export default NavCollapse;
