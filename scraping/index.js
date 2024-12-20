const { JSDOM } = require("jsdom");

// デベロッパーツールからコピーしたHTML
const copiedHTML = `
    <div id="myElement">
        <p>Hello, world!</p>
    </div>
`;

// JSDOMを使ってHTMLを解析
const dom = new JSDOM(copiedHTML);

// HTML要素を取得
const myElement = dom.window.document.querySelector("#myElement");

// HTML要素をHTMLオブジェクトに変換
const htmlObject = {
    tagName: myElement.tagName.toLowerCase(),
    attributes: {},
    children: []
};

// 属性をコピー
Array.from(myElement.attributes).forEach(attr => {
    htmlObject.attributes[attr.name] = attr.value;
});

// 子要素をコピー
Array.from(myElement.children).forEach(child => {
    const childObject = {
        tagName: child.tagName.toLowerCase(),
        attributes: {},
        children: []
    };

    Array.from(child.attributes).forEach(attr => {
        childObject.attributes[attr.name] = attr.value;
    });

    htmlObject.children.push(childObject);
});

console.log(htmlObject);
