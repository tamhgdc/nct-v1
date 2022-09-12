export const handleNavSearch = (defineLang, query, searchHistory) => {
  if (query && defineLang) {
    document.title = `${query} | ${defineLang('Tìm kiếm', 'Search')}`
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  }
}