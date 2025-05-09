import "./globals.css";
import App from "@/components/layouts/app";
import {AppProvider} from "@/providers/AppProvider";
import {getDictionary} from "@/app/[lang]/dictionaries";


export const metadata = {
    title: "Lineup cultural & entertainment center",
    description: "",
};


async function getLessons() {
    const res = await fetch('https://lineup.dahk.am/api/lessons');
    const data = await res.json();
    return data;
}

export default async function RootLayout({children, params}) {
    const lessons = await getLessons();
    const {lang} = await params
    const dict = await getDictionary(lang)

    return (
        <html lang={lang}>
        <body>
        <AppProvider>
            <App lang={(await params)?.lang} dict={dict} params={params} lessons={lessons}>
                {children}
            </App>
        </AppProvider>
        </body>
        </html>
    );
}
