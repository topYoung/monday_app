// let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMzNTg4OTE2MCwiYWFpIjoxMSwidWlkIjo1NzQ0NDIwOSwiaWFkIjoiMjAyNC0wMy0yMVQwMjo0MDoyNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIyNjMxODUsInJnbiI6InVzZTEifQ.TWvpOEhzwOTH5TeoaFeIbkUJAMSIWBytryEIH4cUrEw'

// let query = 'query { boards(ids: 6292532342 limit: 10) { columns{id title} items_page{ items{ name column_values{ id text value }}}}}';

const getResult = function(a1, a2) {
    var i = a1.length;
    if (i != a2.length) return false;

    while (i--) {
        if (a1[i] !== a2[i]) return false;
    }
    return true;
};

const monday = window.mondaySdk();
// let boardId = '';
// let userId = '';

// 你的API Key
const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMzNTg4OTE2MCwiYWFpIjoxMSwidWlkIjo1NzQ0NDIwOSwiaWFkIjoiMjAyNC0wMy0yMVQwMjo0MDoyNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIyNjMxODUsInJnbiI6InVzZTEifQ.TWvpOEhzwOTH5TeoaFeIbkUJAMSIWBytryEIH4cUrEw';

// 你想要抓取的board ID
const boardId = '6292532342';

// 設定API請求的URL
const url = 'https://api.monday.com/v2';

// 設定API請求的headers
const headers = {
    'Authorization': apiKey,
    'Content-Type': 'application/json'
};

let filterID = []
let itemList = []

async function fetchItems(boardId) {
    const query = `
 query {
    boards(ids: 6292532342) {
      items_page {
        items {
          id
          name
          column_values {
            id
            text
            value
          }
        }
      }
    }
 }
 `;

    // 使用monday SDK來執行GraphQL查詢
    const response = await monday.api(query);

    // 檢查查詢是否成功
    if (!response.data) {
        throw new Error('查詢失敗');
    }

    // 返回查詢結果中的項目
    return response.data.boards[0].items_page.items;
}

async function filterItems(boardId, filterField, filterValue) {
    // 抓取項目
    itemList = await fetchItems(boardId);
    console.log("itemList===", itemList)
    // 過濾項目

}

//使用範例
filterItems(6292532342, 'Status', 'In Progress');


// monday.listen(['filter'], (res) => {
//     console.log("filter listen", res.data);
// });

// const callback = res => console.log("filter_res=",res);
monday.listen('filter', (res) => {
    console.log("filter_res=", res)

});

//@ts-ignore
// monday.get("filter").then(res => console.log("filter get", res));



monday.listen("itemIds", (res) => {
    console.log("data=", res.data);
    const equal = getResult(res.data, filterID)
    console.log('equal==', equal)
    if (equal == false) {
        filterID = res.data
        console.log("newFilterId=", filterID)
    }

    // [12345, 12346, 12347]
});

monday.get("filter")
    .then(res => console.log("get_filter=", res))



monday.listen("settings", res => {
    console.log("settings=", res.data);
    // {"fieldName": "fieldValue", "fieldName2": "fieldValue2"...}
});



async function settingItems(boardId) {
    const query = `
 query {
    boards(ids: 6292532342) {
      items_page {
        items {
          id
          name
          column_values {
            id
            text
            value
          }
        }
      }
    }
 }
 `;

    // 使用monday SDK來執行GraphQL查詢
    const response = await monday.api(query);

    // 檢查查詢是否成功
    if (!response.data) {
        throw new Error('查詢失敗');
    }

    // 返回查詢結果中的項目
    return response.data.boards[0].items_page.items;
}

async function filterItems(boardId, filterField, filterValue) {
    // 抓取項目
    const settingList = await fetchItems(boardId);
    console.log("settingList===", settingList)
    // 過濾項目

}

//使用範例
settingItems(6292532342, 'Status', 'In Progress');


//a4 : 72解析度 595/842

function generatePDF() {
    loader.style.visibility = 'visible'
    let doc = new jsPDF();
    html2canvas(element).then(function(canvas) {
        var imgData = canvas.toDataURL('image/png');
        var doc = new jsPDF('p', 'mm', 'a4'); // 使用A4紙張大小
        var imgWidth = 210; // A4 width in mm
        var pageHeight = 295; // A4 height in mm
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
        var position = 0;

        // 添加第一頁
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // 如果內容超過一頁，則添加更多頁面
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        doc.save('sample.pdf');
    });

}

