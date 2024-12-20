import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const TABLE_NAME = "Table1"
    const APP_ID = "d203e2ee-9b4f-4e8b-94ef-b402a82371cb"
    const ACCESS_KEY = "V2-HLy3J-aLJaD-H3mRI-aFGvN-xBk24-mlXD7-6dEpi-lvzjz"
    const url = `https://www.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action?applicationAccessKey=${ACCESS_KEY}`
  
    const payload = {
      "Action":"Find",
      "Properties":{
        "Locale":"ja-JP",
        "Selector": "FILTER(FileName, true)"
      }
    }
  
    // const options = {
    //   "method":"post",
    //   "contentType":"application/json",
    //   "payload":JSON.stringify(payload)
    // }
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload),
    });
    console.log(response);
  const result = await response.text();
   console.log(result);

    // setData(result);
  };

  return (
    <div>
      <button onClick={fetchData}>Fetch Data</button>
      {data && <div>{JSON.stringify(data)}</div>}
    </div>
  );
}

