// let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjMzNTg4OTE2MCwiYWFpIjoxMSwidWlkIjo1NzQ0NDIwOSwiaWFkIjoiMjAyNC0wMy0yMVQwMjo0MDoyNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIyNjMxODUsInJnbiI6InVzZTEifQ.TWvpOEhzwOTH5TeoaFeIbkUJAMSIWBytryEIH4cUrEw'

// let query = 'query { boards(ids: 6292532342 limit: 10) { columns{id title} items_page{ items{ name column_values{ id text value }}}}}';
window.jsPDF = window.jspdf.jsPDF

const getResult = function(a1, a2) {
    let i = a1.length;
    console.log("i=", i)
    console.log("a2.length=", a2.length)
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
let boardId

// 設定API請求的URL
const url = 'https://api.monday.com/v2';

// 設定API請求的headers
const headers = {
    'Authorization': apiKey,
    'Content-Type': 'application/json'
};
let oldBoardId = localStorage.getItem("boardid")
// console.log('oldBoardId=',oldBoardId)
// console.log(oldBoardId == null)

let filterID = []
let itemList = []
let allData
let columnNum = 2
let oldColumn = 'none'
async function fetchItems() {
    const query = `
 query {
    boards(ids:["${boardId}"]) {
    columns{
      id
      title
    }
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
    console.log("alldata=", response.data)
    allData = response.data
    createCheckbox()

    return response.data.boards[0].items_page.items;
}

async function filterItems() {
    // 抓取項目
    itemList = await fetchItems();
    console.log("itemList===", itemList)
    createImage()
    // 過濾項目

}

let allCheckbox = []

function createCheckbox() {
    const tmp = allData.boards[0].columns
    console.log('tmp==', tmp)
    console.log('len==', tmp.length)
    const len = tmp.length
    let allDiv = document.createElement('div')
    allDiv.className = "item_column"
    // let n = 0
    let allInput = document.createElement("INPUT");
    allInput.setAttribute("type", "checkbox");
    allInput.id = "checkbox_all"
    allInput.className = 'checkbox_css'
    let allLabel = document.createElement("Label");
    allLabel.setAttribute("for", "checkbox_all");
    allLabel.innerHTML = "全部欄位";
    allDiv.appendChild(allInput)
    allDiv.appendChild(allLabel)
    all_item.appendChild(allDiv)



    for (let i = 0; i < len; i++) {
        const id = tmp[i].id
        // if(id !="name" && id !="subitems"){

        let div = document.createElement('div')
        div.className = "item_column"
        let x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
        x.id = "checkbox_" + i
        x.className = 'checkbox_css'
        allCheckbox.push(x)
        let newlabel = document.createElement("Label");
        newlabel.setAttribute("for", "checkbox_" + i);
        newlabel.innerHTML = tmp[i].title;
        div.appendChild(x)
        div.appendChild(newlabel)
        all_item.appendChild(div)


        // n++
        // }
    }

    allInput.addEventListener('change', function() {
        if (this.checked) {
            console.log("this=", this)
            // console.log('allitem is checked.');
            // 在這裡添加你需要執行的代碼
            for (let j = 0; j < allCheckbox.length; j++) {
                allCheckbox[j].checked = true
            }
        } else {
            console.log('allitem is unchecked.');
            for (let j = 0; j < allCheckbox.length; j++) {
                allCheckbox[j].checked = false
            }
            // 在這裡添加你需要執行的代碼
        }
    });




}

print_title_input.addEventListener('input', () => {
    // console.log(print_title_input.value); // 在輸入框中輸入文字時，即時輸出該文字
    title.innerHTML = print_title_input.value
});

print_title_input2.addEventListener('input', () => {
    // console.log(print_title_input.value); // 在輸入框中輸入文字時，即時輸出該文字
    subTitle.innerHTML = print_title_input2.value
});
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
    // console.log("data=", res.data);
    const equal = getResult(res.data, filterID)
    // console.log('equal==', equal)
    // if (equal == false) {
    filterID = res.data
    console.log("newFilterId=", filterID)

    // }

    // [12345, 12346, 12347]
});

monday.get("filter")
    .then(res => console.log("get_filter=", res))



// monday.listen("settings", res => {
//     console.log("settings=", res.data);
//     // {"fieldName": "fieldValue", "fieldName2": "fieldValue2"...}
// });
let allImg = []

function createImage() {
    const len = filterID.length

    for (let i = 0; i < len; i++) {
        const one = getOne(filterID[i])
        console.log("one==", one)
        if (one.length > 0) {
            for (let j = 0; j < one.length; j++) {
                allImg.push(one[j])
            }
        }
    }
    console.log('allImg=', allImg)
    for (let k = 0; k < allImg.length; k++) {
        let div = document.createElement('div')
        let div2 = document.createElement('div')
        let div3 = document.createElement('div')
        let img = document.createElement('img')
        // img.crossOrigin = "anonymous";
        div.id = "img_div_" + k
        img.id = "img_" + k
        div2.id = "img_div2_" + k

        if (columnNum == 1) {
            div.className = 'item_img1'
        }
        if (columnNum == 2) {
            div.className = 'item_img2'
        }
        if (columnNum == 3) {
            div.className = 'item_img3'
        }
        if (columnNum == 4) {
            div.className = 'item_img4'
        }
        div2.className = 'image_box'
        div3.className = 'image_box_right'
        img.src = allImg[k]
        // img.src = "a1.jpeg"
        img.className = "image"

        div.appendChild(div2)
        div.appendChild(div3)
        div2.appendChild(img)
        content.appendChild(div)
        img.onload = function() {
            const w = img.offsetWidth
            const h = img.offsetHeight
            const w1 = div2.offsetWidth
            const h1 = div2.offsetHeight
            const rate = h / w
            const rate1 = h1 / w1
            if (rate > rate1) {
                img.style.height = "100%"
            } else {
                img.style.width = "100%"
                // const dh = h1 - 
            }
            // console.log("w=",w)
            // console.log("w1=",w1)
            // console.log("h=",h)
            // console.log("h1=",h1)
        }
    }
}

function getOne(index) {
    const len = itemList.length
    one = []
    let tmp = ''
    for (let i = 0; i < len; i++) {
        console.log('index=', Number(index))
        console.log('id==', Number(itemList[i].id))
        if (Number(index) == Number(itemList[i].id)) {
            tmp = itemList[i].column_values
            break;
        }
    }

    console.log("column_values=", tmp)
    for (let j = 0; j < tmp.length; j++) {
        if (tmp[j].id == "files") {
            const file = tmp[j].text
            console.log('file==', file)
            let imgList = file.split(',')
            if (imgList.length > 0) {
                for (let i = 0; i < imgList.length; i++) {
                    const img = imgList[i].split('.')
                    console.log("img=", img)
                    if (img.length > 0) {
                        if (img[img.length - 1] == 'jpg' || img[img.length - 1] == 'png' || img[img.length - 1] == 'jpeg') {
                            one.push(imgList[i])
                        }
                    }
                }
            }
            break
        }
    }
    return one
}

let oldNum = 2
document.addEventListener('DOMContentLoaded', function() {
    let infoIcon = document.querySelector('.gg-info');
    let tooltip = document.getElementById('customTooltip');
    oldColumn = column_num2
    column_num2.style.backgroundColor = 'lightblue'
    infoIcon.addEventListener('mouseover', function(e) {
        tooltip.style.display = 'block';
        // tooltip.style.left = e.pageX + 'px';
        // tooltip.style.top = e.pageY - 30 + 'px'; // 調整工具提示的位置
        // tooltip.textContent = infoIcon.getAttribute('title');
    });

    infoIcon.addEventListener('mouseout', function() {
        tooltip.style.display = 'none';
    });

    column_num1.onclick = function() {

        if (columnNum != 1) {
            oldNum = columnNum

            columnNum = 1
            resetColumn()
            column_num1.style.backgroundColor = 'lightblue'
            oldColumn = column_num1

        } else {
            column_num1.style.backgroundColor = ''
            columnNum = 0
            oldColumn = 'none'
        }

    }

    column_num2.onclick = function() {

        if (columnNum != 2) {
            oldNum = columnNum

            columnNum = 2
            resetColumn()
            column_num2.style.backgroundColor = 'lightblue'
            oldColumn = column_num2
        } else {
            column_num2.style.backgroundColor = ''
            columnNum = 0
            oldColumn = 'none'
        }

    }
    column_num3.onclick = function() {

        if (columnNum != 3) {
            oldNum = columnNum

            columnNum = 3
            resetColumn()

            column_num3.style.backgroundColor = 'lightblue'
            oldColumn = column_num3
        } else {
            column_num3.style.backgroundColor = ''
            columnNum = 0
            oldColumn = 'none'
        }

    }
    column_num4.onclick = function() {

        if (columnNum != 4) {
            oldNum = columnNum

            columnNum = 4
            resetColumn()
            column_num4.style.backgroundColor = 'lightblue'
            oldColumn = column_num4
        } else {
            column_num4.style.backgroundColor = ''
            columnNum = 0
            oldColumn = 'none'
        }

    }
    // var checkbox = document.getElementById('all_item_input');

    // checkbox.addEventListener('change', function() {
    //     if (this.checked) {
    //         console.log('allitem is checked.');
    //         // 在這裡添加你需要執行的代碼
    //     } else {
    //         console.log('allitem is unchecked.');
    //         // 在這裡添加你需要執行的代碼
    //     }
    // });


});

function resetColumn() {
    if (oldColumn != 'none') {
        oldColumn.style.backgroundColor = ''

        for (let k = 0; k < allImg.length; k++) {
            let div = document.getElementById("img_div_" + k)
            if (oldNum == 1) {
                div.classList.remove("item_img1")
            }
            if (oldNum == 2) {
                div.classList.remove("item_img2")
            }
            if (oldNum == 3) {
                div.classList.remove("item_img3")
            }
            if (oldNum == 4) {
                div.classList.remove("item_img4")
            }
            if (columnNum == 1) {
                div.className = "item_img1"
                oldNum = 1
            }
            if (columnNum == 2) {
                div.className = "item_img2"
                oldNum = 2
            }
            if (columnNum == 3) {
                div.className = "item_img3"
                oldNum = 3
            }
            if (columnNum == 4) {
                div.className = "item_img4"
                oldNum = 4
            }

        }
        // oldColumn = "none"
        // columnNum = 0
    }
}

// monday.listen("context", res => {
//   console.log('context=',res)
//   boardId = res.data.boardId
//   console.log("boardid111=",res.data.boardId);
//   //使用範例
//     filterItems(); 
//   // do Something
// })

monday.get('context').then(res => {
    console.log('context2=', res)
    boardId = res.data.boardId
    console.log("boardid=", res.data.boardId);
    //使用範例
    filterItems();
});

// async function settingItems(boardId) {
//     const query = `
//  query {
//     boards(ids: 6292532342) {
//       items_page {
//         items {
//           id
//           name
//           column_values {
//             id
//             text
//             value
//           }
//         }
//       }
//     }
//  }
//  `;

//     // 使用monday SDK來執行GraphQL查詢
//     const response = await monday.api(query);

//     // 檢查查詢是否成功
//     if (!response.data) {
//         throw new Error('查詢失敗');
//     }

//     // 返回查詢結果中的項目
//     return response.data.boards[0].items_page.items;
// }

// async function filterItems(boardId, filterField, filterValue) {
//     // 抓取項目
//     const settingList = await settingItems(boardId);
//     console.log("settingList===", settingList)
//     // 過濾項目

// }

// //使用範例
// filterItems(6292532342, 'Status', 'In Progress');


//a4 : 72解析度 595/842

function generatePDF() {
    // const url = "print.html?"+"columnNum=" + columnNum + "&iurl=" + allImg + "&data=aaa" 
    // window.open(url, '_blank');
    // window.location.href = url
    // all.style.height = "auto"
    // var content = $('#content_all').html();
    //     var pageHeight = 842; // A4 紙張的高度，以像素為單位
    //     var contentHeight = $('#content_all').height();
    //     console.log("contentHeight==",contentHeight)
    //     var pages = Math.ceil(contentHeight / pageHeight);

    //     var newWin = window.open('', '_blank');
    //     newWin.document.open();
    //     newWin.document.write('<html><head><title>Print</title>');
    //     newWin.document.write('<link rel="stylesheet" type="text/css" href="style.css">');
    //     newWin.document.write('</head><body>');
    //     for (var i = 0; i < pages; i++) {
    //         var pageContent = content.slice(i * pageHeight, (i + 1) * pageHeight);
    //         newWin.document.write('<div class="print-content">' + pageContent + '</div>');
    //     }

    //     newWin.document.write('</body></html>');
    //     // newWin.document.close();
    //      newWin.print();

     var divToPrint = document.getElementById('content_all');
            var newWin = window.open('', '_blank');
            newWin.document.open();
            newWin.document.write('<html><head><title>Print</title>')
            newWin.document.write('<link rel="stylesheet" type="text/css" href="style.css">');
            newWin.document.write('</head><body onload="window.print()">');
            newWin.document.write('<div class="print-content">' + divToPrint.innerHTML + '</div>');
            newWin.document.write('</body></html>');
            newWin.document.close();


    // all.style.height = "100vh"

    // var divToPrint = document.getElementById('all');
    //         var newWin = window.open('', '_blank');
    //         newWin.document.open();
    //         newWin.document.write('<html><head><title>Print</title></head><body>');
    //         newWin.document.write($('#all').html() );
    //         newWin.document.write('</body></html>');
    //         // newWin.document.close();
    //         newWin.print();
    // $("#all").printElement();


     // const divId = 'all'
  //    var newWin=window.open('','列印視窗');
  // newWin.document.open();
  // newWin.document.write('<html>'+
  //   '<head>'+
  //     '<link rel="stylesheet" href="style.css">'+
  //   '</head>'+
  //   '<body  onload="window.print()">'+
  //     $('#all').html()+
  //   '</body>'+
  // '</html>');
  // newWin.document.close();
  // setTimeout(function(){newWin.close();},10);

    // // 獲取要轉換的 HTML 元素
    // var node = document.getElementById('all');

    // 使用 dom-to-image 库將 HTML 元素轉換為圖像
    // domtoimage.toPng(node)
    //     .then(function(dataUrl) {
    //         // 創建 PDF 實例
    //         var pdf = new jsPDF('p', 'mm', 'a4');

    //         // 添加圖像到 PDF 中
    //         pdf.addImage(dataUrl, 'PNG', 0, 0, 210, 297); // 210x297 是 A4 尺寸

    //         // 保存 PDF
    //         pdf.save('htmltopdf_' + new Date().getTime() + '.pdf');
    //     })
    //     .catch(function(error) {
    //         console.error('圖像轉換錯誤:', error);
    //     });

    // var html_content = $('#all').html();
    // $("#download").contents().find("#wrapper").html(html_content);

    // // 使用html2canvas轉換HTML內容為Canvas
    // html2canvas($('#download').get(0)).then(function(canvas) {
    //     var imgData = canvas.toDataURL('image/png');
    //     console.log('imgData=',imgData)
    //     var pdf = new jsPDF('p','pt','a4');
    //     pdf.internal.scaleFactor = 2;
    //     var imgWidth = 210; // A4 width in mm
    //     var imgHeight = canvas.height * imgWidth / canvas.width;
    //     pdf.addImage(imgData, 'PNG', 15, 15, imgWidth, imgHeight);
    //     pdf.save('htmltopdf_' + new Date().getTime() + '.pdf');
    // });

    //   const divId = "all"
    //   let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

    // mywindow.document.write(`<html><head>`);
    // mywindow.document.write('</head><body >');
    // mywindow.document.write(document.getElementById(divId).innerHTML);
    // mywindow.document.write('</body></html>');

    // mywindow.document.close(); // necessary for IE >= 10
    // mywindow.focus(); // necessary for IE >= 10*/

    // mywindow.print();
    // mywindow.close();

    // trans.style.visibility = 'visible'
    // let doc = new jsPDF()
    // const divId = "all"
    // doc.fromHTML(`<html><head></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
    // doc.save('sample.pdf');
    // trans.style.visibility = 'hidden'
    // var pdf = new jsPDF();

    // var divs = document.querySelectorAll('.image_box');
    // var pdfCounter = 0;


    // // 生成 PDF 函數
    // function generatePdf() {
    //     // 如果還有子 div 沒有處理，則處理下一個子 div
    //     console.log("pdfCounter==",pdfCounter)
    //     console.log('divs.length==',divs.length)
    //     if (pdfCounter < divs.length) {
    //         var div = divs[pdfCounter];

    //         // 獲取子 div 內的圖片 URL
    //         // 獲取子 div 內的圖片
    //         var img = div.querySelector('img');
    //         // img.crossOrigin = "Anonymous";
    //         // 確保圖片存在
    //         if (img) {
    //             // 獲取圖片 URL
    //             var imgUrl = img.src;
    //             console.log("src=", imgUrl)
    //             console.log("endsWith=", imgUrl.toLowerCase().endsWith('.jpg'))
    //             // 檢查圖片格式
    //             if ( imgUrl.toLowerCase().endsWith('.jpeg')) {
    //                 // 圖片是 JPEG 格式，直接添加到 PDF 中
    //                 pdf.addImage(imgUrl, 'JPEG', 10, 10 + pdfCounter * 150, 180, 150); // 調整位置和大小
    //                 pdfCounter++;
    //                 generatePdf();
    //             } else if (imgUrl.toLowerCase().endsWith('.jpg')) {
    //                 // 圖片是 PNG 格式，使用 html2canvas 將圖片轉換為 JPEG 格式
    //                 html2canvas(img).then(function(canvas) {
    //                     var imgUrlData = canvas.toDataURL('image/jpeg');

    //                     // 添加圖片到 PDF 中
    //                     pdf.addImage(imgUrlData, 'JPEG', 10, 10 + pdfCounter * 150, 180, 150); // 調整位置和大小
    //                     pdfCounter++;
    //                     generatePdf();
    //                 });
    //             } else if (imgUrl.toLowerCase().endsWith('.png')) {
    //                 // 圖片是 PNG 格式，使用 html2canvas 將圖片轉換為 JPEG 格式
    //                 html2canvas(img).then(function(canvas) {
    //                     var imgUrlData = canvas.toDataURL('image/jpeg');

    //                     // 添加圖片到 PDF 中
    //                     pdf.addImage(imgUrlData, 'JPEG', 10, 10 + pdfCounter * 150, 180, 150); // 調整位置和大小
    //                     pdfCounter++;
    //                     generatePdf();
    //                 });
    //             } else {
    //                 // 其他格式的圖片，忽略並處理下一張圖片
    //                 pdfCounter++;
    //                 generatePdf();
    //             }
    //         }
    //     } else {
    //         // 如果所有圖片都添加完成，則將 PDF 下載到本地
    //         trans.style.visibility = 'hidden'
    //         pdf.save('example.pdf');
    //     }
    // }

    // // 開始生成 PDF
    // generatePdf();

    // async function generatePDF() {
    //     var doc = new jsPDF();
    //     var imgWidth = 210; // A4 width in mm
    //     var pageHeight = 295; // A4 height in mm
    //     var position = 0;

    //     var imageContainers = document.querySelectorAll('.image_box');
    //     for (let container of imageContainers) {
    //         await html2canvas(container).then(function(canvas) {
    //             var imgData = canvas.toDataURL('image/png');
    //             var imgHeight = canvas.height * imgWidth / canvas.width;
    //             doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //             position += imgHeight;

    //             if (position > pageHeight) {
    //                 doc.addPage();
    //                 position = 0;
    //             }
    //         });
    //     }
    //     trans.style.visibility = 'hidden'
    //     doc.save('sample.pdf');
    // }


    // const element = document.getElementById('all')

    // html2canvas(element).then(function(canvas) {
    //     var imgData = canvas.toDataURL('image/png');
    //     var doc = new jsPDF('p', 'mm', 'a4'); // 使用A4紙張大小
    //     var imgWidth = 210; // A4 width in mm
    //     var pageHeight = 295; // A4 height in mm
    //     var imgHeight = canvas.height * imgWidth / canvas.width;
    //     var heightLeft = imgHeight;
    //     var position = 0;

    //     // 添加第一頁
    //     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //     heightLeft -= pageHeight;

    //     // 如果內容超過一頁，則添加更多頁面
    //     while (heightLeft >= 0) {
    //         position = heightLeft - imgHeight;
    //         doc.addPage();
    //         doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    //         heightLeft -= pageHeight;
    //     }
    //     doc.save('sample.pdf');
    //     trans.style.visibility = 'hidden'
    // });

}