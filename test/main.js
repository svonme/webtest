import createPhantomPool from 'phantom-pool';

// 连接池
const pool = createPhantomPool({
    max: 10, // 最多 10 个
    min: 2,  // 最少 2  个
    idleTimeoutMillis: 30000, // 空闲时间
});


function main(url){
    console.log(url);
    //入口地址
    pool.use( instance => {
        return new Promise(async function(resolve){
            const page = await instance.createPage();
            page.on('onConsoleMessage', function(msg, lineNum, sourceId){
                console.log("message : ");
                console.log(msg);
            });
            await page.open(url);
            await page.includeJs("http://cdn.svon.org/js/promise.min.js");
            await page.includeJs("http://cdn.svon.org/libs/jquery.min.js");
            let body = await page.evaluate(function() {
                return $("body");
            });
            console.log(body);
                
        });
    }).catch(async function(e){
        console.log(e);
        //关闭测试环境
        await pool.drain();
        await pool.clear();
    });
}

main('http://www.arbor.space/');



 
