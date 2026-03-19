// Mock tasks seeded around a university area (Wuhan, China)
export const MOCK_TASKS = [
  {
    id: 1,
    type: 'basic',
    title: '帮我搬沙发到楼下',
    description: '下周二下午3点，需要把一张双人沙发从4楼搬到1楼，楼道很窄，需要有力气的小哥',
    price: 50,
    priceType: 'fixed',
    time: '下周二 15:00',
    location: '武汉大学 信息学部宿舍',
    lat: 30.5395,
    lng: 114.3696,
    poster: { name: '王同学', avatar: '👨‍🎓', rating: 4.8 },
    createdAt: '2小时前',
    views: 23,
    tags: ['搬运', '体力活'],
    status: 'open',
  },
  {
    id: 2,
    type: 'basic',
    title: '代取快递+帮买奶茶',
    description: '菜鸟驿站取一个快递顺路帮我买一杯喜茶，具体地址私聊',
    price: 15,
    priceType: 'fixed',
    time: '今天 18:00',
    location: '珞珈山宿舍区',
    lat: 30.542,
    lng: 114.365,
    poster: { name: '李同学', avatar: '👩‍🎓', rating: 4.5 },
    createdAt: '30分钟前',
    views: 41,
    tags: ['代取', '跑腿'],
    status: 'open',
  },
  {
    id: 3,
    type: 'skill',
    title: '水管漏水急需维修',
    description: '卫生间水管接头漏水，已经漏了两天了，需要有水电维修经验的师傅，工具自带优先',
    price: null,
    priceType: 'bidding',
    time: '明天上午 9:00-12:00',
    location: '洪山区 光谷广场附近',
    lat: 30.498,
    lng: 114.41,
    poster: { name: '张女士', avatar: '👩', rating: 4.9 },
    createdAt: '1小时前',
    views: 67,
    tags: ['水电维修', '专业技能'],
    status: 'open',
    requiredSkill: '水电维修',
  },
  {
    id: 4,
    type: 'basic',
    title: '排队买限量球鞋',
    description: '周六早上8点Nike官方店开门抢购Air Jordan，需要帮忙排队，具体地点在中山路旗舰店',
    price: 80,
    priceType: 'fixed',
    time: '本周六 07:30',
    location: '武汉中山路 Nike旗舰店',
    lat: 30.578,
    lng: 114.287,
    poster: { name: '鞋控小明', avatar: '👟', rating: 4.7 },
    createdAt: '3小时前',
    views: 158,
    tags: ['排队', '购物'],
    status: 'open',
  },
  {
    id: 5,
    type: 'skill',
    title: '拍摄个人写真/证件照',
    description: '毕业季需要拍一套正式证件照+几张生活照，希望有摄影功底的同学，相机单反优先，在校园里拍',
    price: 200,
    priceType: 'fixed',
    time: '下周末任意时间',
    location: '武汉大学 樱花大道',
    lat: 30.536,
    lng: 114.364,
    poster: { name: '毕业生小红', avatar: '🎓', rating: 5.0 },
    createdAt: '5小时前',
    views: 92,
    tags: ['摄影', '专业技能'],
    status: 'open',
    requiredSkill: '摄影',
  },
  {
    id: 6,
    type: 'basic',
    title: '帮忙整理搬家打包',
    description: '下个月搬家，需要2-3人帮忙打包衣物、书籍，不需要搬运，主要是分类整理装箱',
    price: 120,
    priceType: 'fixed',
    time: '下下周日 全天',
    location: '武昌区 街道口',
    lat: 30.524,
    lng: 114.354,
    poster: { name: '老王', avatar: '🏠', rating: 4.3 },
    createdAt: '昨天',
    views: 35,
    tags: ['搬家', '整理'],
    status: 'open',
  },
  {
    id: 7,
    type: 'skill',
    title: '家教辅导初中数学',
    description: '孩子初二数学很差，需要一对一辅导，每周两次每次2小时，长期合作，双休日下午',
    price: 150,
    priceType: 'fixed',
    time: '每周六日 14:00-16:00',
    location: '汉口 江汉路附近',
    lat: 30.585,
    lng: 114.299,
    poster: { name: '陈妈妈', avatar: '👩‍👦', rating: 4.6 },
    createdAt: '2天前',
    views: 203,
    tags: ['家教', '数学', '专业技能'],
    status: 'open',
    requiredSkill: '家教',
  },
  {
    id: 8,
    type: 'basic',
    title: '代买热干面+豆皮早餐',
    description: '宿舍楼下美食街的蔡林记，帮我打包热干面一份豆皮一份，加辣，中等辣',
    price: 8,
    priceType: 'fixed',
    time: '明天早上 8:30',
    location: '武大正门 蔡林记',
    lat: 30.534,
    lng: 114.355,
    poster: { name: '懒癌患者', avatar: '😴', rating: 4.1 },
    createdAt: '刚刚',
    views: 12,
    tags: ['代买', '早餐'],
    status: 'open',
  },
];

export const SKILL_TAGS = [
  { id: 'repair', label: '水电维修', icon: '🔧', level: 'skill' },
  { id: 'photo', label: '摄影', icon: '📷', level: 'skill' },
  { id: 'tutor', label: '家教', icon: '📚', level: 'skill' },
  { id: 'design', label: '设计', icon: '🎨', level: 'skill' },
  { id: 'cook', label: '烹饪', icon: '👨‍🍳', level: 'skill' },
  { id: 'drive', label: '代驾', icon: '🚗', level: 'skill' },
  { id: 'fitness', label: '健身教练', icon: '💪', level: 'skill' },
  { id: 'music', label: '乐器教学', icon: '🎸', level: 'skill' },
];

export const CENTER = [30.5395, 114.3696]; // Wuhan University

// Simulate AI intent parsing
export function parseTaskIntent(text) {
  const result = {
    title: '',
    time: '',
    location: '',
    price: null,
    priceType: 'bidding',
    tags: [],
    type: 'basic',
  };

  // Extract price
  const priceMatch = text.match(/(\d+)\s*[元块]/);
  if (priceMatch) {
    result.price = parseInt(priceMatch[1]);
    result.priceType = 'fixed';
  }

  // Extract time keywords
  const timeKeywords = {
    '今天': '今天', '明天': '明天', '后天': '后天',
    '下周': '下周', '本周': '本周', '这周': '本周',
    '周一': '周一', '周二': '周二', '周三': '周三',
    '周四': '周四', '周五': '周五', '周六': '周六', '周日': '周日',
    '下午': '下午', '上午': '上午', '早上': '早上', '晚上': '晚上',
  };
  const timeFound = [];
  Object.keys(timeKeywords).forEach(k => {
    if (text.includes(k)) timeFound.push(timeKeywords[k]);
  });
  const timeMatch = text.match(/\d+[点时:：]\d*/);
  if (timeMatch) timeFound.push(timeMatch[0]);
  result.time = timeFound.slice(0, 2).join(' ') || '时间待定';

  // Detect task type and tags
  const skillKeywords = ['维修', '修理', '设计', '摄影', '家教', '辅导', '教学', '代驾', '翻译', '编程', '写作'];
  const basicKeywords = ['代取', '代买', '排队', '搬', '打扫', '整理', '跑腿', '快递'];

  skillKeywords.forEach(k => {
    if (text.includes(k)) { result.type = 'skill'; result.tags.push(k); }
  });
  basicKeywords.forEach(k => {
    if (text.includes(k)) { result.tags.push(k); }
  });

  // Generate title from first sentence or truncate
  result.title = text.replace(/[，,。.！!？?]/g, ' ').trim().substring(0, 20) || text.substring(0, 20);

  return result;
}
