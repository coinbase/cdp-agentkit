import { createClient, } from './createClient.js';
import { testActions } from './decorators/test.js';
export function createTestClient(parameters) {
    const { key = 'test', name = 'Test Client', mode } = parameters;
    const client = createClient({
        ...parameters,
        key,
        name,
        type: 'testClient',
    });
    return client.extend((config) => ({
        mode,
        ...testActions({ mode })(config),
    }));
}
//# sourceMappingURL=createTestClient.js.map