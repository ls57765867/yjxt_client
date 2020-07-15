import ajax from './index'

// 1. 获取适用人群
export const  getLivePerson = ()=>ajax('/web/live/live_person');

// 2. 获取内容主题
export const  getLiveTheme = ()=>ajax('/web/live/live_theme');

// 3. 获取直播列表
export const  getLiveList = (page_num, page_size, live_person_id, live_theme_id)=>ajax('/web/live/live_list',{page_num, page_size, live_person_id, live_theme_id},'post');