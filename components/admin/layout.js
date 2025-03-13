"use client";

import React, { useState } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link"; // Import Link for routing
import { menuItems } from "@/utils/utils"; // Assuming menuItems are defined in utils

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const handleMenuClick = (key) => {
        // You can add logic for handling menu clicks here if necessary
    };

    // Convert the menuItems structure to match the 'items' prop format
    const menuItemsForMenu = menuItems.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        children: item.children
            ? item.children.map((child) => ({
                key: child.key,
                label: <Link href={child.path}>{child.label}</Link>,
            }))
            : [],
    }));

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                <div className="text-white text-center py-4 text-xl font-bold">Admin Panel</div>
                <Menu
                    theme="dark"
                    mode="vertical"
                    defaultSelectedKeys={["1"]}
                    onClick={({ key }) => handleMenuClick(key)}
                    items={menuItemsForMenu} // Pass the transformed menu items to 'items'
                />
            </Sider>
            <Layout>
                <Header className="bg-white shadow-md p-4 text-lg font-semibold">
                    Admin Dashboard
                </Header>
                <Content style={{ margin: "16px", padding: "16px", background: "#fff" }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
