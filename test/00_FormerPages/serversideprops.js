import Image from "next/image";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export default function Home({ initialData }) {
    console.log(initialData)
    const [searchTerm, setSearchTerm] = useState('');
    const [allData, setAllData] = useState(initialData);
    const [filenames, setFilenames] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            document.activeElement.blur();
            console.log('入力された値:', event.target.value);
            // ここで検索処理やデータのフィルタリングを行う
        }
    };

    useEffect(() => {
        console.log("allDataが更新されました：", allData);
        setFilenames(allData.map(item => item.filename));
        setFilteredData(allData.filter(item => item.filename.includes(searchTerm)));
    }, [allData]);

    return (
        <main className={`flex min-h-screen flex-col justify-between p-24 ${inter.className}`}>
            <a className={`flex justify-center mb-3 text-2xl font-semibold`} href=" ">
                PDFViwer
            </a>
            <div style={{ textAlign: 'right' }}>
                <input
                    type="text"
                    value={searchTerm}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filter..."
                    className={`mb-3 px-3 py-2 bg-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
            </div>
            <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-center">
                {allData.map((x, i) => {
                    let Icon;
                    if (x.fileformat === 'PDF') {
                        Icon = 'PDFicon.png';
                    } else if (x.fileformat === 'PPTX') {
                        Icon = 'PPTXicon.png';
                    } else if (x.fileformat === 'DOCX') {
                        Icon = 'DOCXicon.png';
                    } else {
                        Icon = 'OTHERSicon.png';
                    }
                    return (
                        <a
                            key={i}
                            className="group rounded-lg border border-transparent px-5 py-4 transition-colors 
                            hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={x.url}
                        >
                            <div className={`relative flex justify-center`}>
                                <img
                                    style={x.src ? {} : { filter: "invert(50%)" }}
                                    src={x.src && x.src !== "none" ? x.src : 'PDFicon.png'}
                                    width={200}
                                    height={190}
                                />
                                <img
                                    src={Icon}
                                    style={{
                                        position: "absolute",
                                        bottom: "5px",
                                        left: "calc(50% + 80px)",
                                        transform: "translateX(-50%)",
                                        width: "30px",
                                        height: "30px"
                                    }}
                                    alt="Icon"
                                />
                            </div>
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                {x.category}{" "}
                            </h2>
                            <h2 className={`mb-3 text-2xl font-semibold`}>
                                {x.filename}{" "}
                            </h2>
                            <div className={`m-0 max-w-[30ch] text-sm opacity-50 mx-auto`}>
                                {x.outline}
                            </div>
                            <div className={`m-0 max-w-[30ch] text-sm opacity-50 mx-auto`}>
                                {x.Date}
                            </div>
                            <div className={`m-0 max-w-[30ch] text-sm opacity-50 mx-auto`}>
                                {x.format}{","}{x.fileformat}
                            </div>
                        </a>
                    );
                })}
            </div>
        </main>
    );
}

export async function getServerSideProps() {
    const APP_ID = "203e9cf7-d9c0-49a5-a1ca-6849094bb282";
    const ACCESS_KEY = "V2-AZWbc-ELpfC-x6lCG-LB1y0-96p3q-la2gT-cYKyO-BMvPv";
    const TABLE_NAME = "Table 1";
    const url = `https://www.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action?applicationAccessKey=${ACCESS_KEY}`;

    const payload = {
        Action: "Find",
        Properties: {
            Locale: "ja-JP",
            Selector: "FILTER('Table 1',TRUE)"
        }
    };

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { props: { initialData: data } };
    } catch (error) {
        console.error("Error: " + error.message);
        return { props: { initialData: [] } };
    }
}
