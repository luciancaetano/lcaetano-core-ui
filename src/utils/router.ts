import get from 'lodash/get';
import isArray from 'lodash/isArray';
import forEach from 'lodash/forEach';
import toString from 'lodash/toString';
import { matchPath, RouteProps } from 'react-router';
import { IAppRouteParams } from '../types';

/**
 * Create an route template string
 */
const createRouteTemplate = (tpl: string) => (params: { [key: string]: string | number | null | undefined }) => {
  // eslint-disable-next-line
  const result = tpl.replace(/\:[0-9a-zA-Z_]+/g, (key) => toString(get(params, key.substring(1, key.length), 'unknown')));
  return result;
};

export function createRouterHelpers<T>(appRoutes: T) {
  return {
  /**
   * Get app route with params
   */
    getAppRoute(name: keyof typeof appRoutes, params?: IAppRouteParams) {
      const route = get(appRoutes, name, null) || '/404';
      return createRouteTemplate(route)(params || {});
    },

    /**
     * Check if route matches
     */
    matchRoute(names: keyof typeof appRoutes | keyof typeof appRoutes[], path: string, props: RouteProps = {}) {
      const namesArray = isArray(names) ? names : [names];
      let matches = 0;
      forEach(namesArray, (name: any) => {
        const routePath = get(appRoutes, name, null) || '/404';

        const mached = matchPath({
          path: routePath,
          end: true,
          ...props,
        }, path);

        if (mached) {
          matches++;
        }
      });

      return matches > 0;
    },
  };
}
