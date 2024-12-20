import Image from "next/image";
import { useEffect , useState } from "react"
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [allData,setAllData] = useState([]);
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            document.activeElement.blur();
            console.log('入力された値:', event.target.value);
            // ここで検索処理やデータのフィルタリングを行う
        }
    };
    const [filenames, setFilenames] = useState([]);
    // console.log(filenames);
    const [filteredData, setFilteredData] = useState([]);
    // console.log(filteredData);

    useEffect (()=>{
        (async()=>{
        
            const APP_ID = "203e9cf7-d9c0-49a5-a1ca-6849094bb282"
            const ACCESS_KEY = "V2-AZWbc-ELpfC-x6lCG-LB1y0-96p3q-la2gT-cYKyO-BMvPv"
            const TABLE_NAME = "Table 1"
            const url = `https://www.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action?applicationAccessKey=${ACCESS_KEY}`;
        
        
        
            //get data
            async function getData() {
        
                const payload = {
                    Action: "Find",
                    Properties: {
                        Locale: "ja-JP",
                        Selector: "FILTER('Table 1',TRUE)"
                        // Selector: "FILTER('Table 1',[Key] = '5')"
                        // Selector: "FILTER('Table 1',[Title] = 'Item 5')"
                        //Selector: "FILTER('Table 1',[Date] = '2024/09/09')"
                    }
                }
        
                const options = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(payload)
                };
        
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    // return await response.text();
                    return await response.json();
                } catch (error) {
                    console.error("Error: " + error.message);
                    return error.message
                }
        
            }
        
            const res = await getData()
            console.log("res",res);
            setAllData(res);


            
        
            // console.log(allData);
        })()

    },[])

    // allData が更新された時にログを出力
    useEffect(() => {
        console.log("allDataが更新されました：", allData);
        console.log("allData is an array:", Array.isArray(allData));  // 配列かどうかを確認
        console.log("Type of allData:", typeof allData);              // allData自体の型 (通常は 'object')
        console.log("Type of first element:", typeof allData[0]);     // 配列の最初の要素の型
        console.log("allData:", allData);  
        
        setFilenames(allData.map(item => item.filename));
        console.log(filenames);
        setFilteredData(allData.filter(item => item.filename.includes(searchTerm)));
        console.log(filteredData);

    }, [allData]);
   

    


    return (
        <main
            className={`flex min-h-screen flex-col justify-between p-24 ${inter.className}`}
        >
            <a className={`flex justify-center mb-3 text-2xl font-semibold`}
                href=" "
                >
                PDFViwer
            </a>
                
            <div style={{ textAlign: 'right' }}>   
            <input
                type="text"
                value={searchTerm}
                onKeyDown={handleKeyDown} // イベントハンドラの修正
                onChange={(e) => setSearchTerm(e.target.value)} // 入力値の更新
                placeholder="Filter..."
                className={`mb-3 px-3 py-2 bg-black rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
            </div> 
            {/* <img src='PDFicon.png' width='200'  height='190'></img> */}
            <div className=" mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-center">

            {
            // filteredData.map((x,i) => {
            //allData.length
            allData.map((x,i) => {
                let Icon;
                if(x.fileformat==='PDF'){
                    Icon = 'PDFicon.png';
                }else if(x.fileformat==='PPTX'){
                    Icon = 'PPTXicon.png';
                }else if(x.fileformat==='DOCX'){
                    Icon = 'DOCXicon.png';
                }else{
                    Icon = 'OTHERSicon.png';
                }
                return <a
                        key={i}
                        className="group rounded-lg border border-transparent px-5 py-4 transition-colors 
                        hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={x.url}>
                            <div className={`relative flex justify-center`}>
                            <img
                                style={x.src ? {} : { filter: "invert(50%)"}}
                                src={x.src && x.src !== "none" ? x.src : 'PDFicon.png'} 
                                width={200}
                                height={190}
                            />
                            {/* PDFアイコンの位置を絶対位置で右下に設定 */}
                            <img
                                src= {Icon}  // PDFアイコンの画像パス
                                style={{
                                    position: "absolute",
                                    bottom: "5px",  // 画像の中に収まるように調整
                                    left: "calc(50% + 80px)",  // 親の中央から右に100px移動
                                    transform: "translateX(-50%)",  // 中央にずらす                                    
                                    width: "30px",  // アイコンサイズを調整
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
                })
            }
            </div>
        </main>
  );
}