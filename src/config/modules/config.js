function getTenant(pathname) {
  if (!pathname) { return false; }
  return pathname.split('/')[1];
}
export default {
  tenant: getTenant(location.pathname) || 'de2dd59d73eb1862f93584c07d384292', // 暂存
  // tenant: 'aaaaaaaa1',
  workstation: 'warehouse',
  service: 'theeye',
  sphere: {
    range: [-10, 10], // 球面
    step: 0.25
  },
  cylinder: {
    range: [-4, 4], // 柱面
    step: 0.25
  }
};
