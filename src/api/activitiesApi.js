import ajax from './index'

//1. 获取活动地点
export const  getActivitiesAddress = ()=>ajax('/web/activities/activities_address');
//2. 获取招生对象
export const  getActivitiesObject = ()=>ajax('/web/activities/activities_object');
//3. 获取营期
export const  getActivitiesBus = ()=>ajax('/web/activities/activities_bus');

//3. 获取相关数据
export const  getActivitiesList = (page_num, page_size, activities_address_id, activities_object_id, activities_bus_day_id)=>ajax('/web/activities/list',{page_num, page_size, activities_address_id, activities_object_id, activities_bus_day_id},'post');

//4. 进入单个detail获取数据
export const  getActivitiesDetail = (id)=>ajax('/web/activities/detail',{id});

//4. 收藏与取消收藏
export const  userFavActivities = (user_id, activities_id)=>ajax('/web/user/fav_activities',{user_id, activities_id},'post');
