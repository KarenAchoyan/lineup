import {
    AppstoreAddOutlined,
    FileImageOutlined,
    VideoCameraOutlined,
    BookOutlined,
    ReadOutlined,
    ContactsOutlined,
    TeamOutlined,
} from "@ant-design/icons";

export const menuItems = [
    {
        key: "news",
        icon: <ReadOutlined />,
        label: "News",
        children: [
            { key: "news-add", label: "Add", path: "/admin/news/add" },
            { key: "news-all", label: "All", path: "/admin/news/all" },
        ],
    },
    {
        key: "slide",
        icon: <AppstoreAddOutlined />,
        label: "Slide",
        children: [
            { key: "slide-add", label: "Add", path: "/admin/slide/add" },
            { key: "slide-all", label: "All", path: "/admin/slide/all" },
        ],
    },
    {
        key: "gallery",
        icon: <FileImageOutlined />,
        label: "Gallery",
        children: [
            { key: "gallery-add", label: "Add", path: "/admin/gallery/add" },
            { key: "gallery-all", label: "All", path: "/admin/gallery/all" },
        ],
    },
    {
        key: "events",
        icon: <BookOutlined />,
        label: "Events",
        children: [
            { key: "events-add", label: "Add", path: "/admin/event/add" },
            { key: "events-all", label: "All", path: "/admin/event/all" },
        ],
    },
    { key: "contact", icon: <ContactsOutlined />, label: "Contact", path: "/admin/contact" },
    {
        key: "stuff",
        icon: <TeamOutlined />,
        label: "Stuff",
        children: [
            { key: "stuff-add", label: "Add", path: "/admin/stuff/add" },
            { key: "stuff-all", label: "All", path: "/admin/stuff/all" },
        ],
    },
    {
        key: "videos",
        icon: <VideoCameraOutlined />,
        label: "Videos",
        children: [
            { key: "videos-add", label: "Add", path: "/admin/videos/add" },
            { key: "videos-all", label: "All", path: "/admin/videos/all" },
        ],
    },
    {
        key: "lessons",
        icon: <ReadOutlined />,
        label: "Lessons",
        children: [
            { key: "lessons-add", label: "Add", path: "/admin/lessons/add" },
            { key: "lessons-all", label: "All", path: "/admin/lessons/all" },
        ],
    },
];

export const getYouTubeId = (url) => {
    if (typeof url !== "string") return null; // Ensure url is a string
    const regExp = /(?:v=|\/embed\/|\.be\/|\/v\/|\/vi\/|\/e\/|watch\?v=|&v=)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};


export function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}


export function setLanguage(language) {
    document.cookie = `language=${language}; path=/; max-age=31536000`; // 1 year
}