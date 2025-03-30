import React from 'react';
import Item from "@/components/about/item";

const teamMembers = [
    { name: "William Anderson", role: "Founding Director", phone: "+37498000000", image: "/girl.jpeg" },
    { name: "Emma Roberts", role: "Project Manager", phone: "+37498000111", image: "/girl.jpeg" },
    { name: "John Doe", role: "Lead Developer", phone: "+37498000222", image: "/girl.jpeg" },
    { name: "Sophia Miller", role: "UI/UX Designer", phone: "+37498000333", image: "/girl.jpeg" },
    { name: "Michael Brown", role: "Marketing Lead", phone: "+37498000444", image: "/girl.jpeg" },
    { name: "Emily Davis", role: "HR Manager", phone: "+37498000555", image: "/girl.jpeg" },
];

const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {teamMembers.map((member, index) => (
                    <Item key={index} {...member} />
                ))}
            </div>
        </div>
    );
};

export default About;
