import { withProviders } from '@app/providers';
import { createRootElement } from '@shared/lib';
import { App } from './app';
import './index.css';

const rootElement = createRootElement();
rootElement.render(withProviders(App));
