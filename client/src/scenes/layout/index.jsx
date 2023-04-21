import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
// import { useGetUserQuery } from "state/api";

export default function Layout() {
  const isNoneMobile = useMediaQuery("(min-width:600px)");
  const [isSideBarOpen, setisSideBarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  console.log("data:", data);

  return (
    <Box display={isNoneMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        user={data || {}}
        isNoneMobile={isNoneMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setisSideBarOpen={setisSideBarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSideBarOpen={isSideBarOpen}
          setisSideBarOpen={setisSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}
