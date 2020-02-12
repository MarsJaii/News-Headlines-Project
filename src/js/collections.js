import'../scss/collections.scss';

import Header from '../components/header/index';
import NoContentTip from '../components/no_content_tip/index';
import NewsItem from '../components/news_item/index';

import tools from '../utils/tools';

const header = new Header(),
      noContentTip = new NoContentTip(),
      newsItem = new NewsItem();

const App = ($) => {  //箭头函数 dallor符
    const $app = $('#app'),
          $list = $app.children('.list'),
          collections = JSON.parse(localStorage.getItem('collections'));
    
    const init = () =>{
        render().then(bindEvent);
    }
    const render = () =>{
        return new Promise((reslove, reject) =>{
            _renderHeader();
            if(!collections || Object.keys(collections).length === 0){
                _renderNoContentTip('目前没有收藏');
            }else{
                _renderlist(collections);
            }
            reslove();
        });
    }


    const bindEvent = () =>{
        $list.on('click', '.news-item', toDetailPage);
    }

    const _renderHeader = () =>{
        $app.append(header.tpl({
                title: '我的收藏',
                showLeftIcon: true,
                showRightIcon: false       
            }));
    }

    const _renderNoContentTip = (text) =>{
        $app.append(noContentTip.tpl(text));
    }     

    const _renderlist = (data) =>{
        $list.append(newsItem.tpl(_arrangeDatas(data)));
        tools.thumbShow($('.news-thumb'));
    }

    function toDetailPage(){
        const $this = $(this),
              url = $this.attr('data-url'),
              uniquekey = $this.attr('data-uniquekey');
        
        localStorage.setItem('target', JSON.stringify(collections[uniquekey]));
        window.location.href = `detail.html?news_url=${url}&uniquekey=${uniquekey}`;
    }

    function _arrangeDatas(data){
        let _arr = [];
        for (let key in data){
            _arr.push(data[key]);
        }
        return _arr;
    }  

    init();
}

App(Zepto); //局部变量Zepto