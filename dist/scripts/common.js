document.documentElement.style.fontSize = document.documentElement.clientWidth / 37.5 + 'px';
// 16px = 1rem 字体适配平板、PC clientWidth大于一定 要恢复16px 或用media查询

window.addEventListener('load', function(){
    FastClick.attach(document.body); //FastClick 消除300ms延迟
}, false)

document.documentElement.addEventListener('touchmove', function(){
    if(event.touches.length > 1){
        event.preventDefault(); // 阻止多点触控报错
    }
}, false);