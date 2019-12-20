// 将对象第一级属性全部重置为空字符串
// obj - 待处理对象     exceptKeyAry - 排除的键值数组    val - 重置的值
function clearObj(obj, exceptKeyAry = [], val = "") {
  for (const key in obj) {
    if (exceptKeyAry.includes(key)) continue;
    obj[key] = val;
  }
}

export default {
  clearObj
};
