// let canPrint = false

// print_btn.onclick = function() {
checkLoad()
//     if(canPrint == true){

//     }
// }
function checkLoad() {
    let i = 0
    const imgID = document.querySelectorAll('img');
    imgID.forEach((item, index) => {
        // let tmp = []
        const img = new Image();
        img.src = item.src;
        const id = item.id
        console.log('id=', id)
        const num = id.split('_')[1]
        console.log('num=', num)
        const div2 = document.getElementById('img_div2_' + num)
        const w1 = div2.offsetWidth
        splitconst h1 = div2.offsetHeight
        img.addEventListener("load", () => {
            const w = item.offsetWidth
            const h = item.offsetHeight
            
            const rate = h / w
            const rate1 = h1 / w1
            console.log('rate=', rate)
            console.log('rate1=', rate1)

            if (rate > rate1) {
                item.style.width = "auto"
                item.style.height = "96%"

            } else {
                item.style.height = "auto"
                item.style.width = "96%"
                // const dh = h1 - 
            }
            i += 1; // 讀取完畢就 + 1
            // console.log("i==", i);
            // console.log("id==", item.id);
            // console.log(item.naturalWidth, item.naturalHeight);


            if (imgID.length === i) { // 當圖片全部讀取完畢就顯示載入完成，這邊可以搭配 Loading 狀態切換畫面

                console.log('圖片全部載入完成');
                //       console.log("orgSize==",orgSize);
                // checkSize()
                // canPrint = true
                window.print()
            }
        });
    })
}