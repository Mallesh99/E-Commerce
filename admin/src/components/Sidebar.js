import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

import log from "../images/power-off.png";

const Sidebar = () => {
  async function logout() {
    window.localStorage.removeItem("admin");
    window.location.reload(false);
  }
  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <div style={{ display: "flex" }}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: "inherit" }}
            >
              Admin
            </a>
            <img
              style={{ marginLeft: "100px" }}
              backgroundColor="#333"
              className="icon1"
              src={log}
              alt="logouticon"
              onClick={logout}
            />
          </div>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/users" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="users">Users</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/orders" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Orders</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/products" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Products</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/coupons" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Coupons</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Analytics
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              to="/hero404"
              target="_blank"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                404 page
              </CDBSidebarMenuItem>
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            For E-commerce-website
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
