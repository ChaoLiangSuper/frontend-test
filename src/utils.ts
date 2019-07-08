import _ from 'lodash';

export const maxCacheablePages = 8;

export const getCacheablePages: (
  currentPage: number,
  totalPage: number
) => number[] = (currentPage, totalPage) => {
  const cacheablePages: number[] = [currentPage];

  _.forEach(Array(maxCacheablePages / 2), (value, index) => {
    cacheablePages.push(
      currentPage - index - 1 < 1 ? 1 : currentPage - index - 1
    );
    cacheablePages.push(
      currentPage + index + 1 > totalPage ? totalPage : currentPage + index + 1
    );
  });

  _.remove(cacheablePages, (page) => page === currentPage);

  return _.uniq(cacheablePages);
};
