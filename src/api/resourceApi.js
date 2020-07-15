import ajax from './index'

// 1. 获取所属分类
export const  getResourceCategory = ()=>ajax('/web/resource/r_category');

// 2. 获取所属班级
export const  getResourceClasses = ()=>ajax('/web/resource/r_classes');

// 3. 获取所属区域
export const  getResourceArea = ()=>ajax('/web/resource/r_area');

// 4. 获取所属格式
export const  getResourceFormat = ()=>ajax('/web/resource/r_format');

// 5. 获取所属分类
export const  getResourceMeta = ()=>ajax('/web/resource/r_meta');

// 6. 获取列表资源
export const  getResourceList = (page_num, page_size, resource_category_id, resource_classes_id, resource_area_id, resource_meta_id, resource_format_id)=>ajax('/web/resource/list',{page_num, page_size, resource_category_id, resource_classes_id, resource_area_id, resource_meta_id, resource_format_id},'post');

// 7. 获取下载资源列表
export const  getResourceDownloadList = (tag)=>ajax('/web/resource/file', {tag});

//8.文章浏览次数
export const  updateResourceViewsCount = (resource_id)=>ajax('/web/resource/views', {resource_id});
