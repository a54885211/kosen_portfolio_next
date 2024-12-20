export async function getServerSideProps(){

    const fs = require("fs");
    const pdList = fs.readdirSync("./public/files");
    console.log("11111111111111111");

    return {
        props:{
            pdfList:pdList
        },
    };
}



export default function Home({pdfList}){
    return(
        <ul>
            {pdfList.map((pdf)=>{
                return(
                    <li key={pdf}>
                        <a href={`/files/${pdf}`}>{pdf}</a>
                    </li>
                );
            })}
        </ul>
    ); 
}