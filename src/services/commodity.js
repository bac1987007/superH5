import Domain from '../config/Domain'
import Utils from '../utils/Util'

// 查询商品列表
export async function queryList(params) {
  const url = `${Domain.ADR}/v1/item?perPageNum=${params.perPageNum}&currentPageIndex=${params.currentPageIndex}`;
  return Utils.ajaxGet(url, params);
}
// 创建新商品信息，返回主键
export async function newComKey(params) {
  const url = `${Domain.ADR}/v1/item`;
  return Utils.ajaxPost(url, params);
}
// 根据主键查询商品信息
export async function queryCom(params) {
  const url = `${Domain.ADR}/v1/item/${params.recId}`;
  return Utils.ajaxGet(url, params);
}
//更新商品信息
export async function updateComInfo(params) {
  const url = `${Domain.ADR}/v1/item/${params.recId}`;
  let json={};
  json.recId=params.recId;
  return Utils.ajaxPut(url,json);
}
// 批量创建商品规格
export async function newSpecialBatch(params) {
  const url = `${Domain.ADR}/v1/itemSpecial/batch`;
  return Utils.ajaxPost(url, params);
}
// 根据主键修改规格
export async function updateSpecial(params) {
  const url = `${Domain.ADR}/v1/itemSpecial/batch`;
  return Utils.ajaxPut(url, params.json);
}
// 根据主键查找规格
export async function querySpecial(params) {
  const url = `${Domain.ADR}/v1/show/itemSpecial/group?itemId=${params.recId}`;
  return Utils.ajaxGet(url, params);
}
// 根据主键查找规格
export async function querySpecial11(params) {
  const url = `${Domain.ADR}/v1/itemSpecial?itemId=${params.recId}`;
  return Utils.ajaxGet(url, params);
}
// 查询品牌/状态等，逗号隔开
export async function queryBrand(params) {
  const url = `${Domain.ADR}/v1/baseSystemParameter/type/BRAND`;
  return Utils.ajaxGet(url, params);
}
// 查询价格
export async function queryPrice(params) {
  const url = `${Domain.ADR}/v1/itemSkuPrice/special?itemId=${params.recId}&specialValue1=${params.specialValue1}&specialValue2=${params.specialValue2}`;
  return Utils.ajaxGet(url, params);
}

export async function addCar(params) {
  const url = `${Domain.ADR}/v1/shoppingCart/items`;
  return Utils.ajaxPost(url, params);
}
