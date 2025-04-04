import Image from "next/image";
import Banner from "@/components/banner/banner";
import UserCarousel from "@/components/activeUsers/activeUsers";
import News from "@/components/news/news";
import Achievements from "@/components/achievements/achievements";
import CalendarEvent from "@/components/event/event";
import {getDictionary} from "@/app/[lang]/dictionaries";
import {MainProvider} from "@/providers/HomeProvider";

async function getActiveUsers() {
    const res = await fetch('https://lineup.dahk.am/api/actives');
    const data = await res.json();
    return data;
}

async function getGallery() {
    const res = await fetch('https://lineup.dahk.am/api/galleries');
    const data = await res.json();
    return data;
}

async function getEvents() {
    const res = await fetch('https://lineup.dahk.am/api/events', { cache: "no-store" })
    return res.json()
}

async function getNews() {
    const res = await fetch('https://lineup.dahk.am/api/news/last', { cache: "no-store" })
    return res.json()
}
export default async function Home({params}) {
    const {lang} = await params
    const dict = await getDictionary(lang) // en

    const activeUsers = await getActiveUsers();
    const galleries = await getGallery();
    const events = await getEvents();
    const news = await getNews();

    return (
        <>
            <MainProvider value={{lang, users:activeUsers, galleries, events, dict, news}}>
                <Banner/>
                <News title={dict?.news}/>
                <UserCarousel/>
                <Achievements all={true}/>
                <div id='events'>
                    <CalendarEvent/>
                </div>
            </MainProvider>
        </>
    );
}
