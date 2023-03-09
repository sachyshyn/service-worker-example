import compose from 'compose-function';
import { withQuery } from './with-query';

export const withProviders = compose(withQuery);
export { withRouter } from './with-router';
