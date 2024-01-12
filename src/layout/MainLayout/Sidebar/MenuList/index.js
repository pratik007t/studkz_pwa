import React, { useEffect } from "react";
import { Typography, Box, Divider, Grid } from "@mui/material";
import NavGroup from "./NavGroup";
import menuItem from "menu-items";
import LogoSection from "./../../../MainLayout/LogoSection";
import { toast } from "react-toastify";
import { BsFire } from "react-icons/bs";

const MenuList = () => {
  const openAppStore = () => {
    const userAgent = navigator.userAgent;
    let appStoreLink;

    if (/iPad|iPhone|iPod/.test(userAgent)) {
      appStoreLink = "https://apps.apple.com/kz/app/stud-kz/id1602187453";
    } else if (/Android/.test(userAgent)) {
      appStoreLink =
        "https://play.google.com/store/apps/details?id=uz.smd.referatskz";
    } else {
      toast.error("unknown device/browser detected");
      return;
    }

    window.open(appStoreLink, "_blank");
  };

  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case "group":
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <div style={{ height: "100vh" }}>
      <Box
        component="span"
        sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
      >
        <LogoSection />
      </Box>
      <Divider />
      {navItems}
      <Typography
        sx={{
          display: {
            xs: "flex", // Show on mobile devices
            md: "none", // Hide on browsers
          },
          margin: "24px",
          cursor: "pointer",
        }}
        onClick={openAppStore}
      >
        <BsFire style={{ fontSize: "20px", marginRight: "10px" }} />
        Stud App
      </Typography>
    </div>
  );
};

export default MenuList;
