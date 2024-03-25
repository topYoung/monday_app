// let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMzNTg4OTE2MCwiYWFpIjoxMSwidWlkIjo1NzQ0NDIwOSwiaWFkIjoiMjAyNC0wMy0yMVQwMjo0MDoyNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIyNjMxODUsInJnbiI6InVzZTEifQ.TWvpOEhzwOTH5TeoaFeIbkUJAMSIWBytryEIH4cUrEw'

// let query = 'query { boards(ids: 6292532342 limit: 10) { columns{id title} items_page{ items{ name column_values{ id text value }}}}}';


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

// 設定GraphQL查詢
// 這裡的查詢假設你想要抓取所有項目，並根據某個欄位（例如"Status"）來過濾項目
const query = `
query {
 boards(ids: 6292532342) {
    items {
      id
      name
      column_values {
        id
        value
        column {
          id
          title
        }
      }
    }
 }
}`;

// 發送API請求
fetch(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ query })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
})
.then(data => {
    // 從數據中抓取所有項目
    const items = data.data.boards[0].items;
    // 根據某個欄位（例如"Status"）來過濾項目
    const filteredItems = items.filter(item => {
        const statusColumn = item.column_values.find(cv => cv.column.title === 'Status');
        return statusColumn && statusColumn.value === 'In Progress';
    });
    // 打印出過濾後的項目
    filteredItems.forEach(item => {
        console.log(`項目ID: ${item.id}, 項目名稱: ${item.name}`);
    });
})
.catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
});


// monday.api(query).then(res => {
//     console.log("query_res=", res);
//     /* { data: { users: [{id: 12312, name: "Bart Simpson"}, {id: 423423, name: "Homer Simpson"}] } } */
//     let items = res.data.boards.items
//     console.log('items=',items)

//     // let id = res.data.boards[0].items_page.items[1].id
//     // let json = res.data.boards[0].items_page.items[1].column_values[0].value
//     let text = res.data.boards[0].items_page.items[2].column_values[0].text
//     // json = json.json()
//     console.log('id=', id)
//     console.log('json=', json)
//     console.log('text=', text)
//     let imgList = text.split(',')
//     console.log('imgList.len=', imgList.length)
//     console.log('imgList=', imgList)
//     if (imgList.length > 0) {
//         for (let i = 0; i < imgList.length; i++) {
//             let div = document.createElement('div')
//             div.id = "img" + i
//             div.className = 'item'
//             let img = document.createElement('img')
//             img.src = imgList[i]
//             img.className = 'image'
//             img.onload = function() {
//                 div.appendChild(img)

//             }

//             content.appendChild(div)
//         }
//     }
// });

// fetch ("https://api.monday.com/v2", {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization' : token
//    },
//    body: JSON.stringify({
//      'query' : query
//    })
//   })
//    .then(res => res.json())
//    .then(res => {
//       console.log('res==',res)
//       let id = res.data.boards[0].items_page.items[1].id
//       let json = res.data.boards[0].items_page.items[1].column_values[0].value
//       let text = res.data.boards[0].items_page.items[1].column_values[0].text
//       // json = json.json()
//       console.log('id=',id)
//       console.log('json=',json)
//       console.log('text=',text)
//       let imgList = text.split(',')
//       console.log('imgList.len=',imgList.length)
//       console.log('imgList=',imgList)
//       if(imgList.length > 0){
//         for(let i=0;i<imgList.length;i++){
//           let div = document.createElement('div')
//           div.id = "img" + i
//           div.className = 'item'
//           let img = document.createElement('img')
//           img.src = imgList[i]
//           img.className = 'image'
//           img.onload = function() {
//                  div.appendChild(img)   

//           }

//           content.appendChild(div)
//         }
//       }
//     });

// fetch ("https://api.monday.com/v2", {
//   method: 'post',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization' : token,
//     'API-Version' : '2023-04'
//    },
//    body: JSON.stringify({
//      'query' : 'query{boards (limit:4) {id name} }'
//    })
//   });
//   .then(res => res.json())
//   .then(result => {
//     console.log('res==',result)
//   });